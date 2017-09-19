export default {
  get(key) {
    let value = localStorage.getItem(key);

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

    localStorage.setItem(key, value);
  },

  remove(key) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};
