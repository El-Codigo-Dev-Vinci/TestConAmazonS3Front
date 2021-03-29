import removeDiacritics from 'diacritics';
import { includes } from 'ramda';

export function validateSearch(textToSearch, text) {
  return includes(
    toLowerWithoutDiacritics(textToSearch),
    toLowerWithoutDiacritics(text)
  );
}

function toLowerWithoutDiacritics(string) {
  return removeDiacritics.remove(string.toLowerCase());
}
