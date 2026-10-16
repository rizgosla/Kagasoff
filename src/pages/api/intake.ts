/** Consultation intake delivery.
 *
 * The form POSTs JSON here and this hands it to Resend, which emails it to the
 * firm. Returns a small JSON result that the form turns into its confirmation
 * or error state — the browser never sees the API key or the destination.
 *
 * This is the only route on the site that runs on demand; everything else is
 * prerendered at build time.
 */
export const prerender = false;

import type { APIRoute } from 'astro';

/** Cloudflare exposes secrets and bindings on locals.runtime.env. import.meta.env
 *  is the fallback for a plain `astro dev` started without the platform proxy. */
function readEnv(locals: App.Locals, key: string): string {
  const fromRuntime = (locals as Record<string, any>)?.runtime?.env?.[key];
  return String(fromRuntime ?? (import.meta.env as Record<string, any>)[key] ?? '').trim();
}

const text = (value: unknown, max: number): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const escapeHtml = (value: string): string =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

/** The form only ever POSTs. Anything else is a 405 rather than a 404, so the
 *  route reads as "exists, wrong method" to anyone poking at it. */
export const ALL: APIRoute = () => new Response(null, { status: 405, headers: { allow: 'POST' } });

export const POST: APIRoute = async ({ request, locals }) => {
  const apiKey = readEnv(locals, 'RESEND_API_KEY');
  const to = readEnv(locals, 'INTAKE_TO');
  const from = readEnv(locals, 'INTAKE_FROM');

  // A misconfigured environment is our problem, not the visitor's — log loudly
  // and tell them to call, rather than pretending the message got through.
  if (!apiKey || !to || !from) {
    console.error('[intake] missing env: RESEND_API_KEY, INTAKE_TO and INTAKE_FROM must all be set');
    return json({ ok: false, error: 'server' }, 500);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'badrequest' }, 400);
  }

  // Honeypot. A real person never sees this field, so anything in it is a bot.
  // Answer 200 so the bot has no signal that it was dropped.
  if (text(payload.company, 200)) return json({ ok: true }, 200);

  const name = text(payload.name, 120);
  const phone = text(payload.phone, 40);
  const email = text(payload.email, 200);
  const area = text(payload.area, 80);
  const message = text(payload.message, 5000);

  // Mirrors the form's own required fields.
  if (!name || !phone || !message) return json({ ok: false, error: 'missing' }, 400);

  const rows: [string, string][] = [
    ['Name', name],
    ['Phone', phone],
    ['Email', email || '—'],
    ['Matter type', area || '—'],
  ];

  const html = `<div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:15px;line-height:1.6;color:#16243d">
  <h2 style="font-size:18px;margin:0 0 16px">New consultation request</h2>
  <table cellpadding="0" cellspacing="0" style="margin:0 0 20px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:4px 20px 4px 0;color:#6b7280">${k}</td><td style="padding:4px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
      )
      .join('')}
  </table>
  <div style="color:#6b7280;margin:0 0 6px">Message</div>
  <div style="white-space:pre-wrap;border-left:3px solid #9c7a3c;padding-left:14px">${escapeHtml(message)}</div>
  <p style="color:#6b7280;font-size:13px;margin-top:24px">Sent from the kagasofflaw.com consultation form.</p>
</div>`;

  const plain = [
    'New consultation request',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    message,
    '',
    'Sent from the kagasofflaw.com consultation form.',
  ].join('\n');

  let res: Response;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `New consultation request — ${name}`,
        html,
        text: plain,
        // Hitting reply in the mail client goes straight back to the client,
        // when they left an address.
        ...(email ? { reply_to: email } : {}),
      }),
    });
  } catch (err) {
    console.error('[intake] network error reaching Resend:', err);
    return json({ ok: false, error: 'send' }, 502);
  }

  if (!res.ok) {
    console.error('[intake] Resend returned', res.status, await res.text().catch(() => ''));
    return json({ ok: false, error: 'send' }, 502);
  }

  return json({ ok: true }, 200);
};
