/**
 * Arthur — branchement sur un formulaire.
 *
 * Écoute les événements natifs (focus, saisie, change, invalid) et déclenche
 * les réactions. Chaque champ peut surcharger le comportement par défaut :
 *
 *   data-arthur-focus="secret"     réaction à la prise de focus
 *   data-arthur-change="like"      réaction au changement de valeur
 *   data-arthur-valid="yes"        réaction quand le champ quitté est valide
 *   data-arthur-invalid="no"       réaction quand le champ quitté est invalide
 *
 * La valeur est un nom de REACTIONS, ou "none" pour ne rien faire.
 */
import { REACTIONS, type ReactionName } from './expressions';
import type { Arthur } from './arthur';

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const isField = (target: EventTarget | null): target is Field =>
  target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement;

const isTextual = (field: Field): boolean =>
  field instanceof HTMLTextAreaElement ||
  (field instanceof HTMLInputElement && !['checkbox', 'radio', 'range', 'submit', 'button', 'file'].includes(field.type));

export function bindArthurToForm(arthur: Arthur, form: HTMLFormElement): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  const run = (field: Field, attribute: string, fallback: ReactionName | null) => {
    const value = field.getAttribute(attribute);
    if (value === 'none') return;
    const name = value && value in REACTIONS ? (value as ReactionName) : fallback;
    if (name) arthur.react(name);
  };

  /** Les yeux suivent la progression du texte dans le champ. */
  const follow = (field: Field) => {
    if (!isTextual(field)) {
      arthur.lookAtElement(field, 0.5);
      return;
    }
    const style = getComputedStyle(field);
    const charWidth = parseFloat(style.fontSize) * 0.52;
    const width = field.getBoundingClientRect().width || 1;
    const lastLine = field.value.split('\n').pop() ?? '';
    const progress = Math.min((lastLine.length * charWidth) / width, 1);
    arthur.lookAtElement(field, 0.05 + progress * 0.9);
  };

  form.addEventListener(
    'focusin',
    (event) => {
      if (!isField(event.target)) return;
      const field = event.target;
      follow(field);
      const isSecret = field instanceof HTMLInputElement && field.type === 'password';
      run(field, 'data-arthur-focus', isSecret ? 'secret' : 'focus');
    },
    { signal },
  );

  form.addEventListener(
    'input',
    (event) => {
      if (!isField(event.target) || !isTextual(event.target)) return;
      follow(event.target);
    },
    { signal },
  );

  form.addEventListener(
    'change',
    (event) => {
      if (!isField(event.target)) return;
      const field = event.target;
      if (isTextual(field)) return;
      run(field, 'data-arthur-change', 'like');
    },
    { signal },
  );

  form.addEventListener(
    'focusout',
    (event) => {
      if (!isField(event.target)) return;
      const field = event.target;
      const next = (event as FocusEvent).relatedTarget;
      if (!(next instanceof Node) || !form.contains(next) || !isField(next)) {
        arthur.releaseLook();
        arthur.react('calm');
      }
      if (!isTextual(field) || field.value.trim() === '') return;
      // validity.valid plutôt que checkValidity() : ce dernier émettrait un événement « invalid ».
      if (field.validity.valid) run(field, 'data-arthur-valid', field.type === 'email' ? 'yes' : null);
      else run(field, 'data-arthur-invalid', 'no');
    },
    { signal },
  );

  // "invalid" ne remonte pas : écoute en capture. Une seule réaction par tentative d'envoi.
  let invalidTick = 0;
  form.addEventListener(
    'invalid',
    (event) => {
      const now = performance.now();
      if (now - invalidTick < 400) return;
      invalidTick = now;
      if (isField(event.target)) arthur.lookAtElement(event.target, 0.3);
      arthur.react('oops');
    },
    { signal, capture: true },
  );

  return () => controller.abort();
}
