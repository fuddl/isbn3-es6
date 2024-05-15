import getGroup from './get_group.js';

const findValidCodes = isbn13 => {
  const groupData = getGroup(isbn13);

  if (!groupData) return null;

  const { group, ranges, restAfterGroup } = groupData;

  for (let range of ranges) {
    const [min, max] = range;
    const publisher = restAfterGroup.substr(0, min.length);
    // Comparing strings is appropriate here as range boundaries are of the same length
    // and we're testing a publisher code of that same length.
    if (min <= publisher && max >= publisher) {
      const restAfterPublisher = restAfterGroup.substr(publisher.length);
      return {
        group,
        publisher,
        article: restAfterPublisher.slice(0, -1),
        check: restAfterPublisher.slice(-1),
      };
    }
  }

  return null;
};

const parseIsbn = isbn => {
  if (isbn.length === 10) isbn = '978' + isbn;
  if (isbn.length === 13) return findValidCodes(isbn);
  return null;
};

export default parseIsbn;
