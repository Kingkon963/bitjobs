function addHTTPS(url: string) {
  // check if url is already https
  if (url.startsWith('https')) {
    return url;
  }
  // check if url has no protocol
  if (!url.startsWith('http')) {
    return `https://${url}`;
  }
  return url.replace(/^http:/, 'https:');
}

export default addHTTPS;