import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

interface ContactFormData {
  besoin: string;
  objectif: string;
  societe: string;
  nom: string;
  email: string;
}

const besoinLabels: Record<string, string> = {
  'audit-performance': 'Audit & performance',
  'optimisation-refonte': 'Optimisation & refonte',
  'from-scratch-mvp': 'From scratch & MVP',
  'autre': 'Autre',
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: ContactFormData = await request.json();

    const { besoin, objectif, societe, nom, email } = data;

    // Validation
    if (!besoin || !objectif || !nom || !email) {
      return new Response(
        JSON.stringify({ error: 'Champs requis manquants' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Email invalide' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

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
