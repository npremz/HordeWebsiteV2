import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

export const prerender = false;

const besoinValues = [
  'audit-offert',
  'creation-ecommerce',
  'creation-landing-page',
  'creation-mvp-saas',
  'optimisation-site-web',
  'refonte-site-web',
  'autre',
] as const;

const contactSchema = z.object({
  besoin: z.enum(besoinValues).optional(),
  objectif: z.string().min(1).max(2000),
  nom: z.string().min(1).max(100),
  email: z.string().email().max(254),
  societe: z.string().max(200).optional().default(''),
  source: z.object({
    type: z.enum(['contact-page', 'service-page']),
    pagePath: z.string().max(500).optional(),
    serviceSlug: z.string().max(200).optional(),
  }).optional(),
});

const besoinLabels: Record<string, string> = {
  'audit-offert': 'Audit site web (offert)',
  'creation-ecommerce': 'Création site e-commerce',
  'creation-landing-page': 'Landing page sur mesure',
  'creation-mvp-saas': 'Création SaaS MVP',
  'optimisation-site-web': 'Optimisation site web',
  'refonte-site-web': 'Refonte de site web',
  'autre': 'Autres',
};

const getEnv = (key: string) => import.meta.env[key] || process.env[key] || '';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const POST: APIRoute = async ({ request }) => {
  try {
    const resendApiKey = getEnv('RESEND_API_KEY');

    if (!resendApiKey) {
      console.error('Contact API error: RESEND_API_KEY is missing');
      return new Response(
        JSON.stringify({ error: 'Configuration email manquante' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const rawData = await request.json();

    const result = contactSchema.safeParse(rawData);

    if (!result.success) {
      return new Response(
        JSON.stringify({ error: 'Données invalides', details: result.error.flatten() }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { besoin, objectif, societe, nom, email, source } = result.data;

    const besoinLabel = besoin ? besoinLabels[besoin] || besoin : null;
    const sourceLabel = source?.type === 'service-page'
      ? `Page service${source.serviceSlug ? ` (${source.serviceSlug})` : ''}`
      : source?.type === 'contact-page'
        ? 'Page contact'
        : 'Formulaire non specifie';
    const subjectLabel = besoinLabel || sourceLabel;
    const from = getEnv('CONTACT_EMAIL_FROM') || 'Horde Website <noreply@hordeagence.com>';
    const to = (getEnv('CONTACT_EMAIL_TO') || 'hello@hordeagence.com')
      .split(',')
      .map((recipient: string) => recipient.trim())
      .filter(Boolean);

    if (to.length === 0) {
      console.error('Contact API error: CONTACT_EMAIL_TO is empty');
      return new Response(
        JSON.stringify({ error: 'Configuration email invalide' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailText = [
      'Nouvelle demande de contact',
      besoinLabel ? `Besoin : ${besoinLabel}` : null,
      `Source : ${sourceLabel}`,
      source?.pagePath ? `Page : ${source.pagePath}` : null,
      `Objectif : ${objectif}`,
      `Nom : ${nom}`,
      `Email : ${email}`,
      societe ? `Société : ${societe}` : null,
    ].filter(Boolean).join('\n');

    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Nouveau contact - ${subjectLabel}`,
      text: emailText,
      html: `
        <h2>Nouvelle demande de contact</h2>
        ${besoinLabel ? `<p><strong>Besoin :</strong> ${escapeHtml(besoinLabel)}</p>` : ''}
        <p><strong>Source :</strong> ${escapeHtml(sourceLabel)}</p>
        ${source?.pagePath ? `<p><strong>Page :</strong> ${escapeHtml(source.pagePath)}</p>` : ''}
        <p><strong>Objectif :</strong> ${escapeHtml(objectif)}</p>
        <p><strong>Nom :</strong> ${escapeHtml(nom)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        ${societe ? `<p><strong>Société :</strong> ${escapeHtml(societe)}</p>` : ''}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(
        JSON.stringify({ error: 'Erreur lors de l\'envoi' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Contact API error:', err);
    return new Response(
      JSON.stringify({ error: 'Erreur serveur' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
