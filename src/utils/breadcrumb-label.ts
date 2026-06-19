export function getShortBreadcrumbLabel(value: string | null | undefined): string {
  const firstWord = value?.trim().split(/\s+/)[0];
  return firstWord ? `${firstWord}...` : '';
}
