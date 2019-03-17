class FilterRequest {
  constructor(request) {
    this.request = request;
  }
  bodyOnly(fields) {
    const obj = {};
    for (let key in fields) {
      if (typeof this.request.body[fields[key]] == "undefined") continue;
      obj[fields[key]] = this.request.body[fields[key]];
    }
    return obj;
  }
}
module.exports = FilterRequest;
