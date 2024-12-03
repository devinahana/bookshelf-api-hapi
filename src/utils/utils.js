function getLocalDateISO(date) {
  if (!(date instanceof Date)) {
    throw new Error('The provided argument is not a valid Date object');
  }
  const currentLocalDate = date.toLocaleString('sv-SE').split(' ');
  return `${currentLocalDate[0]}T${currentLocalDate[1]}`;
}

export { getLocalDateISO };