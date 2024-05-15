import parse from './lib/parse.js';
import audit from './lib/audit.js';
import groups from './lib/groups.js';

const hyphenate = val => {
  const data = parse(val);
  if (!data) return null;
  return data.isIsbn13 ? data.isbn13h : data.isbn10h;
};

const asIsbn13 = (val, hyphen) => {
  const data = parse(val);
  if (!data) return null;
  return hyphen ? data.isbn13h : data.isbn13;
};

const asIsbn10 = (val, hyphen) => {
  const data = parse(val);
  if (!data) return null;
  if (!data.isbn10) return null;
  return hyphen ? data.isbn10h : data.isbn10;
};

const ISBN = {
  parse,
  audit,
  hyphenate,
  asIsbn13,
  asIsbn10,
  groups,
};

export default ISBN;
