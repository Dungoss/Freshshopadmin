 function configLocalStorage() {
  Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = function (key) {
    var value = this.getItem(key) || "{}";
    if (value === "undefined" || value === "null") {
      value = "{}";
    }

    return (value && JSON.parse(value)) || {};
  };
}
export default configLocalStorage;