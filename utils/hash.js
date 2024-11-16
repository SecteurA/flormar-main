import { createHash } from 'crypto';

const generateHash = (storekey, data) => {
  // EXCLUDE STOREKEY FROM REQUIRE OPTIONS
  const cmiParams = { ...data };
  delete cmiParams.storekey;

  // sort the required options by key alphabetically like natcasesort in php
  const sortedKeys = Object.keys(cmiParams).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );
  const sortedCmiParams = {};

  sortedKeys.forEach((key) => {
    sortedCmiParams[key] = cmiParams[key];
  });

  let hashval = '';
  for (const key in sortedCmiParams) {
    if (key != 'HASH' && key != 'encoding') {
      hashval += sortedCmiParams[key] + '|';
    }
  }

  hashval += storekey;

  const hash = createHash('sha512').update(hashval).digest('hex');
  // convert it to base64
  const calculatedHash = Buffer.from(hash, 'hex').toString('base64');

  return calculatedHash;
};

export { generateHash };
