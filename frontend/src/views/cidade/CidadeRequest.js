import CrudRequest from '../../plugins/CrudRequest';

class CidadeRequest extends CrudRequest {
  static baseUrl() {
    return '/api/cidade';
  }
}

export default CidadeRequest;
