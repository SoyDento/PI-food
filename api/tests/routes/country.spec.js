/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

const agent = session(app);
const recipe = {
  title: 'Milanesa a la napolitana',
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));

  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
    );
    it('should get 200', () =>
      agent.get('/characters')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body.length).to.eql(10) // testeamos la respuesta con el body
        })
    );
    it('should get 200', () =>
      agent.get('/characters/2521a12e-f1c2-4b0d-9697-fca6f89de52a')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql({
              "id": "2521a12e-f1c2-4b0d-9697-fca6f89de52a",
              "name": "Matías Dentoni",
              "img": "https://cdn.elpopular.mx/notas/secciones/mundo/2019/09/19/a-37-anos-del-emoticon-que-todos-conocemos-la-carita-feliz/f64fdc298163368902edd48455f96007.jpg",
              "nickname": "Matute",
              "birthday": "31-10-1977",
              "status": "Alive",
              "created_DB": true,
              "occupations": [
                {
                  "id": "5f4d4ee7-45ed-4b07-9a5f-f6b765b4be54",
                  "name": "desempleado",
                  "CharacterOccupation": {
                    "createdAt": "2022-07-28T00:22:02.000Z",
                    "updatedAt": "2022-07-28T00:22:02.000Z",
                    "characterId": "2521a12e-f1c2-4b0d-9697-fca6f89de52a",
                    "occupationId": "5f4d4ee7-45ed-4b07-9a5f-f6b765b4be54"
                  }
                },
                {
                  "id": "6d317822-d457-458f-a553-7db90a7c0fdc",
                  "name": "escritor",
                  "CharacterOccupation": {
                    "createdAt": "2022-07-28T00:22:02.010Z",
                    "updatedAt": "2022-07-28T00:22:02.010Z",
                    "characterId": "2521a12e-f1c2-4b0d-9697-fca6f89de52a",
                    "occupationId": "6d317822-d457-458f-a553-7db90a7c0fdc"
                  }
                }
              ]
            }) // testeamos la respuesta con el body
        })
    );
    it('you should get {} when you passed wrong id', () =>
      agent.get('/characters/6d317822-d457-458f-a553-7db90a7c0fdc')
        .expect(function (res) {
          expect(res.body).to.eql({}) // testeamos la respuesta con el body
        })
    );
    it('should get status 200 and an array of characters that match the dataquery', () =>
      agent.get('/characters?data=h')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body.length).to.eql(2) // testeamos la respuesta con el body
        })
    );

  });

  describe('POST /characters', () => {
    it('should get status 200 and add a character', () =>
      agent.post('/characters')
        .send({
                name: "Panam",
                nickname: "wooww",
                birthday: "10-01-1947",
                img: "https://media.glamour.es/photos/616f95a2bcde302b0cd8282c/master/w_1600%2Cc_limit/618905.jpg",
                status: "Alive",
                occupations: ["press editor","programmer"]
            })
        .expect(200)
    );
  });

  describe('PUT /attribute', () => {
    it('should get status 200 and modify the attribute', () =>
      agent.put('/name?idChar=05f4d0ab-62b8-4097-aeaa-7796c69f26ef&value=Rolo')
        .expect(200)
        .expect('Content-Type', /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql({
                id: "05f4d0ab-62b8-4097-aeaa-7796c69f26ef",
                name: "Rolo",
                img: "https://media.glamour.es/photos/616f95a2bcde302b0cd8282c/master/w_1600%2Cc_limit/618905.jpg",
                nickname: "Roloman",
                birthday: "20-11-1997",
                status: "Alive",
                created_DB: true
              }) // testeamos la respuesta con el body
        })
    );
  });


});
