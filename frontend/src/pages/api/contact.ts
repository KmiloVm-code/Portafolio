import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

type ContactPayload = {
	name: string;
	email: string;
	message: string;
};

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 5000;

function escapeHtml(input: string) {
	return input
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function isValidEmail(email: string) {
	// Validación pragmática (no intenta cubrir todo RFC5322)
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
	let payload: ContactPayload;

	try {
		payload = (await request.json()) as ContactPayload;
	} catch {
		return new Response(JSON.stringify({ error: 'JSON inválido.' }), {
			status: 400,
			headers: { 'content-type': 'application/json; charset=utf-8' }
		});
	}

	const name = (payload?.name ?? '').trim();
	const email = (payload?.email ?? '').trim();
	const message = (payload?.message ?? '').trim();

	if (!name || !email || !message) {
		return new Response(JSON.stringify({ error: 'Campos requeridos incompletos.' }), {
			status: 400,
			headers: { 'content-type': 'application/json; charset=utf-8' }
		});
	}

	if (
		name.length > MAX_NAME_LENGTH ||
		email.length > MAX_EMAIL_LENGTH ||
		message.length > MAX_MESSAGE_LENGTH
	) {
		return new Response(JSON.stringify({ error: 'El mensaje excede los límites permitidos.' }), {
			status: 400,
			headers: { 'content-type': 'application/json; charset=utf-8' }
		});
	}

	if (!isValidEmail(email)) {
		return new Response(JSON.stringify({ error: 'Correo inválido.' }), {
			status: 400,
			headers: { 'content-type': 'application/json; charset=utf-8' }
		});
	}

	const resendApiKey = import.meta.env.RESEND_API_KEY;
	const to = import.meta.env.CONTACT_TO;
	const from = import.meta.env.CONTACT_FROM;

	if (!resendApiKey || !to || !from) {
		return new Response(
			JSON.stringify({
				error:
					'Faltan variables de entorno: RESEND_API_KEY, CONTACT_TO, CONTACT_FROM.'
			}),
			{ status: 500, headers: { 'content-type': 'application/json; charset=utf-8' } }
		);
	}

	const resend = new Resend(resendApiKey);

	const safeName = escapeHtml(name);
	const safeEmail = escapeHtml(email);
	const safeMessage = escapeHtml(message).replaceAll('\n', '<br/>');

	const subject = `Nuevo mensaje de contacto — ${name}`;
	const html = `
		<h2>Nuevo mensaje desde el portafolio</h2>
		<p><strong>Nombre:</strong> ${safeName}</p>
		<p><strong>Correo:</strong> ${safeEmail}</p>
		<hr />
		<p>${safeMessage}</p>
	`;

	try {
		const { data, error } = await resend.emails.send({
			from,
			to,
			replyTo: email,
			subject,
			html
		});

		if (error) {
			return new Response(JSON.stringify({ error: error.message ?? 'Error al enviar.' }), {
				status: 502,
				headers: { 'content-type': 'application/json; charset=utf-8' }
			});
		}

		return new Response(JSON.stringify({ ok: true, id: data?.id }), {
			status: 200,
			headers: { 'content-type': 'application/json; charset=utf-8' }
		});
	} catch {
		return new Response(JSON.stringify({ error: 'Error inesperado al enviar.' }), {
			status: 500,
			headers: { 'content-type': 'application/json; charset=utf-8' }
		});
	}
};
