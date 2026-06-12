export type CtaButtonVariant = 'dark' | 'light';

export function getCtaButtonClasses(
  variant: CtaButtonVariant = 'dark',
  fullWidth = false,
  className?: string,
) {
  const isDark = variant === 'dark';
  const base = 'group relative h-[60px] overflow-hidden text-[20px] leading-none px-5 flex items-center justify-center transition-colors duration-200 ease-out cursor-pointer';
  const width = fullWidth ? 'w-full' : 'w-full md:w-fit';
  const colors = isDark
    ? 'bg-black text-button-white'
    : 'bg-button-white text-black';
  const classes = [base, width, colors, className].filter(Boolean).join(' ');
  const overlay = isDark
    ? 'absolute -inset-px bg-button-white translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out'
    : 'absolute -inset-px bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out';
  const labelTrack = 'relative z-10 block overflow-hidden';
  const labelBase = isDark
    ? 'block text-button-white transition-transform duration-200 ease-out group-hover:-translate-y-full'
    : 'block text-black transition-transform duration-200 ease-out group-hover:-translate-y-full';
  const labelOverlay = isDark
    ? 'absolute inset-0 z-10 flex items-center justify-center overflow-hidden text-black pointer-events-none'
    : 'absolute inset-0 z-10 flex items-center justify-center overflow-hidden text-button-white pointer-events-none';
  const labelOverlayText = 'block translate-y-full transition-transform duration-200 ease-out group-hover:translate-y-0';

  return {
    classes,
    overlay,
    labelTrack,
    labelBase,
    labelOverlay,
    labelOverlayText,
  };
}
