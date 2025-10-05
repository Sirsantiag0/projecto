function extractBuffer(value) {
  if (!value) {
    return null;
  }
  if (Buffer.isBuffer(value)) {
    return value;
  }
  if (typeof value === 'string') {
    return Buffer.from(value);
  }
  if (value.data) {
    return Buffer.from(value.data);
  }
  if (Array.isArray(value)) {
    return Buffer.from(value);
  }
  return Buffer.from(value);
}

function buildDataUrl(mimeType, value) {
  const buffer = extractBuffer(value);
  if (!buffer || buffer.length === 0) {
    return null;
  }
  const mime = mimeType && typeof mimeType === 'string' && mimeType.length
    ? mimeType
    : 'application/octet-stream';
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

module.exports = {
  buildDataUrl,
};