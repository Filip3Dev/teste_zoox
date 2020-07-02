const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Node.js REST APIs Document',
        description: 'Documentação da api',
        termsOfService: '',
        contact: {
            name: 'Filipe Machado',
            email: 'filipwx7@gmail.com',
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    host: "localhost:9000",
    basePath: "/",
    paths: {
        "/cidade": {
            "get": {
                "tags": [ "Cidade" ],
                "summary": "Find cidade by ID",
                "description": "Returns a single cidade",
                "operationId": "getCidadeById",
                "produces": [
                    "application/json",
                    "application/xml"
                ],
                "parameters": [
                    {
                        "name": "cidadeId",
                        "in": "path",
                        "description": "ID of cidade to return",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "successful operation",
                        "schema": {
                            "$ref": "#/definitions/Cidade"
                        }
                    },
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Cidade not found"
                    }
                },
                "security": [
                    {
                        "api_key": [

                        ]
                    }
                ]
            },
            "post": {
                "tags": ["Cidade"],
                "summary": "Updates a cidade in the store with form data",
                "description": "",
                "operationId": "updateCidadeWithForm",
                "consumes": [
                    "application/json",
                    "application/xml"
                ],
                "produces": [
                    "application/json",
                    "application/xml"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Created cidade object",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Cidade"
                        }
                    }
                ],
                "responses": {
                    "default": {
                        "description": "successful operation"
                    }
                }
            },
            "delete": {
                "tags": ["Cidade"],
                "summary": "Deletes a cidade",
                "description": "",
                "operationId": "deleteCidade",
                "produces": [
                    "application/json",
                    "application/xml"
                ],
                "parameters": [
                    {
                        "name": "api_key",
                        "in": "header",
                        "required": false,
                        "type": "string"
                    },
                    {
                        "name": "cidadeId",
                        "in": "path",
                        "description": "Cidade id to delete",
                        "required": true,
                        "type": "integer",
                        "format": "int64"
                    }
                ],
                "responses": {
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Cidade not found"
                    }
                },
                "security": [
                    {
                        "cidadestore_auth": [
                            "write:cidades",
                            "read:cidades"
                        ]
                    }
                ]
            },
            "put": {
                "tags": ["Cidade"],
                "summary": "Update an existing cidade",
                "description": "",
                "operationId": "updateCidade",
                "consumes": [
                    "application/json",
                    "application/xml"
                ],
                "produces": [
                    "application/json",
                    "application/xml"
                ],
                "parameters": [
                    {
                        "in": "body",
                        "name": "body",
                        "description": "Cidade object that needs to be added to the store",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/Cidade"
                        }
                    }
                ],
                "responses": {
                    "400": {
                        "description": "Invalid ID supplied"
                    },
                    "404": {
                        "description": "Cidade not found"
                    },
                    "405": {
                        "description": "Validation exception"
                    }
                },
                "security": [
                    {
                        "cidadestore_auth": [
                            "write:cidades",
                            "read:cidades"
                        ]
                    }
                ]
            }
        },
    },
    definitions: {
        "Cidade": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "nome": {
                    "type": "string"
                },
                "estadoId": {
                    "type": "string",
                    "format": "binary",
                    "description": "Estado ID"
                }
            },
            "xml": {
                "name": "Cidade"
            }
        }
    },
}

module.exports = swaggerDocument;