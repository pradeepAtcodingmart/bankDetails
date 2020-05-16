module.exports = {
  dev: {
    log: (type, msg, ...restProp) => {
      console.error(type, msg, restProp);
    }
  },
  prod: {
    log: (...restProp) => {}
  }
};
