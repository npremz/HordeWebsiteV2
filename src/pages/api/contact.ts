import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

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
  'creation-mvp-saas': 'Creation Sass MVP',
  'optimisation-site-web': 'Optimisation site web',
  'refonte-site-web': 'Refonte de site web',
  'autre': 'Autres',
};

export const POST: APIRoute = async ({ request }) => {
  try {
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

    const { error } = await resend.emails.send({
      from: 'Horde Website <noreply@hordeagence.com>',
      to: ['hello@hordeagence.com'],
      replyTo: email,
      subject: `Nouveau contact - ${subjectLabel}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        ${besoinLabel ? `<p><strong>Besoin :</strong> ${besoinLabel}</p>` : ''}
        <p><strong>Source :</strong> ${sourceLabel}</p>
        ${source?.pagePath ? `<p><strong>Page :</strong> ${source.pagePath}</p>` : ''}
        <p><strong>Objectif :</strong> ${objectif}</p>
        <p><strong>Nom :</strong> ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        ${societe ? `<p><strong>Société :</strong> ${societe}</p>` : ''}
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
