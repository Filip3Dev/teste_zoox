let should = require("should");
let request = require("request");
let chai = require("chai");
let expect = chai.expect;
let urlBase = "http://localhost:9000";
const axios = require('axios').default;


// Criamos nosso primeiro caso de teste e fornecemos uma descricao utilizando describe
describe("Teste API cidade",function(){
    it("GET ALL - Deve retornar a lista de cidade",function(done){
    request.get({ url : urlBase + "/cidade" },
            function(error, response, body){
            let _body = {};
            try{
                _body = JSON.parse(body);
            }
            catch(e){
                _body = {};
            }

            expect(response.statusCode).to.equal(200);
            expect(_body.data).to.be.an('array');

            done();
            }
        );
    });
    it('GET ONE - Deve receber uma cidade', async() => {
        
        let resp = await axios.get(urlBase + '/cidade');
        resp = resp.data.data[0];

        let resp2 = await axios.get(`${urlBase}/cidade/${resp._id}`);

        expect(resp2.status).to.equal(200);
        expect(resp2.data).to.be.an('object');

        return 0;
    });
    it('POST - Deve criar uma cidade', async() => {
        
        let resp = await axios.get(urlBase + '/estado');
        resp = resp.data.data[0];
        const payload = { nome: "Teste1", estadoID: resp._id }
        let resp2 = await axios.post(`${urlBase}/cidade/`, payload);
        expect(resp2.status).to.equal(201);
        expect(resp2.data).to.be.an('object');

        return 0;
    });

    it('PUT - Deve editar uma cidade', async() => {
        
        let resp = await axios.get(`${urlBase}/cidade/?textSearch=Teste1`);
        resp = resp.data.data[0];

        const payload = { nome: resp.nome, estadoID: resp.estadoId }
        let resp2 = await axios.put(`${urlBase}/cidade/${resp._id}`, payload);
        
        expect(resp2.status).to.equal(200);
        expect(resp2.data).to.be.an('object');

        return 0;
    });

    it('DELETE - Deve apagar uma cidade', async() => {
        
        let resp = await axios.get(`${urlBase}/cidade/?textSearch=Teste1`);
        resp = resp.data.data[0];

        let resp2 = await axios.delete(`${urlBase}/cidade/${resp._id}`);
        
        expect(resp2.status).to.equal(200);
        expect(resp2.data).to.be.an('object');

        return 0;
    });

});