import update from 'immutability-helper';

update.extend('$auto', function(value, object) {
  return object ?
    update(object, value):
    update({}, value);
});

update.extend('$autoArray', function(value, object) {
  return object ?
    update(object, value):
    update([], value);
});
