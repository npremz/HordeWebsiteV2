import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const contactSchema = z.object({
  besoin: z.enum(['audit-performance', 'optimisation-refonte', 'from-scratch-mvp', 'autre']),
  objectif: z.string().min(1).max(2000),
  nom: z.string().min(1).max(100),
  email: z.string().email().max(254),
  societe: z.string().max(200).optional().default(''),
});

const besoinLabels: Record<string, string> = {
  'audit-performance': 'Audit & performance',
  'optimisation-refonte': 'Optimisation & refonte',
  'from-scratch-mvp': 'From scratch & MVP',
  'autre': 'Autre',
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

    const { besoin, objectif, societe, nom, email } = result.data;

    const besoinLabel = besoinLabels[besoin] || besoin;

    const { error } = await resend.emails.send({
      from: 'Horde Website <noreply@hordeagence.com>',
      to: ['hello@hordeagence.com'],
      replyTo: email,
      subject: `Nouveau contact - ${besoinLabel}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        <p><strong>Besoin :</strong> ${besoinLabel}</p>
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
