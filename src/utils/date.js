Date.prototype.toCustomISOString = function() {
  const splitDate = this.toISOString().split('.');
  return splitDate[0];
};