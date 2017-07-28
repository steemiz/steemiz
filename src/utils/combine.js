export default (config, state, action) => config.reduce(
  (reduction, value) => value(reduction, action),
  state
);
