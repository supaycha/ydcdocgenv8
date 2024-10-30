import type { Context, Config } from "@netlify/edge-functions";
import { randomBytes } from "node:crypto";

export default async (request: Request, context: Context) => {
	const nonce = randomBytes(16).toString('base64');
	const response = await context.next();
	let responseText = await response.text();

	const targetStr = "<html><head>";
	const replacementStr = `<html><head><meta property="csp-nonce" content="${nonce}" />`;
	if (responseText.includes(targetStr)) {
		responseText = responseText.replace(targetStr, replacementStr);
	};

	response.headers.set('Content-Security-Policy', `default-src 'none'; script-src 'self' 'nonce-${nonce}'; connect-src 'self'; img-src 'self'; style-src 'self' 'nonce-${nonce}'; frame-ancestors 'self'; form-action 'self'; base-uri 'none';`);
	response.headers.set('X-Content-Type-Options', `nosniff`);
	response.headers.set('Referrer-Policy', `no-referrer, strict-origin-when-cross-origin`);

	const response2 = new Response(responseText, response);
	return response2;
};

export const config: Config = {
	path: "/*"
};