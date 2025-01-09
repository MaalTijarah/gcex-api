export const isValidDate = (str: string) => {
  return !isNaN(Date.parse(str));
};

export const castQueryValuesToArrayConditionally = (obj: any): any => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(castQueryValuesToArrayConditionally);
  }

  Object.keys(obj).forEach((key) => {
    obj[key] = castQueryValuesToArrayConditionally(obj[key]);
    if (typeof obj[key] === 'string') {
      if (obj[key].includes(',')) {
        obj[key] = obj[key].split(',').map((str: string) => str.trim());
      }

      if (isValidDate(obj[key])) {
        obj[key] = new Date(obj[key]);
      }
    }
  });
  return obj;
};
