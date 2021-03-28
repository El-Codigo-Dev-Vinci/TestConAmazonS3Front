import { DateTime } from 'luxon';

export const dateFormatter = (fecha) => {
  return DateTime.fromISO(fecha).setLocale('es').toFormat("yyyy-MM-dd'T'HH:mm");
};
