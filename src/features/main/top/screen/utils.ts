export function mapPeriodToLabel(period: string) {
  switch (period) {
    case 'short_term':
      return '4 weeks';
    case 'medium_term':
      return '6 months';
    case 'long_term':
      return 'all time';
    default:
      throw new Error(`Unknown period: ${period}`);
  }
}

export function mapLabelToPeriod(label: string) {
  switch (label) {
    case '4 weeks':
      return 'short_term';
    case '6 months':
      return 'medium_term';
    case 'all time':
      return 'long_term';
    default:
      throw new Error(`Unknown label: ${label}`);
  }
}
