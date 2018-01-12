const byAuthor = 'authorName';
const byText = 'text';

export default {
  [byAuthor]: 'Author A-Z',
  [`-${byAuthor}`]: 'Author Z-A',
  [byText]: 'Text A-Z',
  [`-${byText}`]: 'Text Z-A',
};
