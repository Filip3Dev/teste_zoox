import CrudRequest from '../../plugins/CrudRequest';
import http from '../../plugins/snippet';

class EstadoRequest extends CrudRequest {
  static baseUrl() {
    return '/api/estado';
  }
  static listaEstados(data){
    return http.get(`/api/estado?textSearch=${data}`);
  }
}

export default EstadoRequest;
