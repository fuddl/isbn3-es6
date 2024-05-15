import fill from './fill.js';
import splitIsbnParts from './split_isbn_parts.js';

const processIsbn = value => {
  if (value == null) return null;
  value = value.toString();
  const source = value;
  if (!value) return null;

  value = value.replace(/\s/g, '').replace(/-/g, ''); // Dropping all hyphens, as the hyphens might be wrong

  let data = splitIsbnParts(value);

  if (!data) return null;

  data.source = source;
  if (value.length === 13) {
    data.prefix = value.substring(0, 3);
    data.isIsbn13 = true;
    data.isIsbn10 = false;
  } else {
    data.isIsbn10 = true;
    data.isIsbn13 = false;
  }

  data = fill(data);
  if (!data) return null;

  data.isValid = data.check === (data.isIsbn13 ? data.check13 : data.check10);

  if (data.isValid) return data;
  else return null;
};

export default processIsbn;
