import http from '../plugins/snippet.js';

class CrudRequest {
  static baseUrl() {
    throw Error('Method baseUrl not implemented');
  }

  static list(queryParams = {}) {
    return http.get(this.baseUrl(), { params: queryParams });
  }

  static save(payload) {
    return http.post(this.baseUrl(), payload);
  }

  static edit(id, payload) {
    return http.put(`${this.baseUrl()}/${id}`, payload);
  }

  static get(id) {
    return http.get(`${this.baseUrl()}/${id}`);
  }

  static remove(id) {
    return http.delete(`${this.baseUrl()}/${id}`);
  }
}

export default CrudRequest;
