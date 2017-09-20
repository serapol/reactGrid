export default {
  get(key) {
    let value = window.localStorage.getItem(key);

    if (!value) {return null;}

    if (value[0] === "{") {
      try {
        value = JSON.parse(value);
      } catch(error) {
        console.error(error);
      }
    }

    return value;
  },

  set(key, value) {
    if (!key || !value) {return;}

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    window.localStorage.setItem(key, value);
  },

  remove(key) {
    window.localStorage.removeItem(key);
  },

  clear() {
    window.localStorage.clear();
  },
};
