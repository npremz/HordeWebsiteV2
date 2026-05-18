export type CtaButtonVariant = 'dark' | 'light';

export function getCtaButtonClasses(
  variant: CtaButtonVariant = 'dark',
  fullWidth = false,
  className?: string,
) {
  const isDark = variant === 'dark';
  const base = 'group relative overflow-hidden text-[1.375rem] leading-none py-3.5 px-5 flex justify-center border transition-colors duration-300 ease-in-out cursor-pointer';
  const width = fullWidth ? 'w-full' : 'w-full md:w-fit';
  const colors = isDark
    ? 'border-lines-dark bg-black text-white'
    : 'border-bg-light bg-bg-light text-black';
  const wipe = isDark
    ? 'absolute inset-0 bg-bg translate-x-[calc(-100%-1px)] group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'
    : 'absolute inset-0 bg-black translate-x-[calc(-100%-1px)] group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]';
  const textHover = isDark
    ? 'relative z-10 text-white group-hover:text-black transition-colors duration-300'
    : 'relative z-10 text-black group-hover:text-bg-light transition-colors duration-300';
  const classes = [base, width, colors, className].filter(Boolean).join(' ');

  return {
    classes,
    wipe,
    textHover,
  };
}
