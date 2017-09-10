export default src => {
  if (/\.jpg|.jpeg$/i.test(src)) {
    return 'image/jpeg';
  }
  if (/\.png$/i.test(src)) {
    return 'image/png';
  }
  if (/\.gif$/i.test(src)) {
    return 'image/gif';
  }
  return null;
}
