# MiauAuAu (Back-End)

## Como rodar localmente?

- Ter o Node e Postgres instalados
- Renomear o arquivo .env.example para .env (ou criar um)
- Rodar os comandos: **npm run start-db** && **npm run dev**

## Como funciona?

Este projeto é uma API REST para atender a aplicação da MiauAuAu, aplicação onde tutores de diversos animais possam cadastra-los para oferecer seus serviços de modelo para que qualquer pessoa possa contata-la e contratar seu serviço.

## Rotas:

`user`:

- POST `/user/sign-up`: **cria um usuário**

  **body** = {
  "name": string,
  "email": string,
  "imageUrl": string,
  "cellphone": string,
  "cpf": string,
  "password": string,
  "confirmPassword": string
  }

- POST `/user/sign-on`: **loga com o usuário**

  **body** = {
  "email": string,
  "password": number
  }

- POST `/user/sign-out`: **desloga o usuário**

  **header/auth** = "Bearer token"

`breed`:

- POST `/breed`: **insere uma raça**

  **body** = {
  "name": string,
  "imageUrl": string
  }

- GET `/breed`: **busca todas as raças**

`catalogue`:

- POST `/catalogue`: **insere um pet modelo**

  **body** = {
  "title": string,
  "description": string",
  "avaliable": boolean,
  "breedId": number,
  "arrayPhotoPosition": **"posição no array da foto que o tutor deseja usar como foto principal do seu modelo, caso não exista será a primeira"**
  "photos": [
  {
  "url": string
  }
  ]
  }

  **header/auth** = "Bearer token"

- GET `/catalogue/mine`: **busca todos os modelos do usuário, separados por raça**

  **header/auth** = "Bearer token"

- GET `/catalogue/breed/:breedId`: **retorna todos os modelos de acordo com a raça**

- GET `/catalogue/unique/:id`: **retorna um único modelo e os dados de seu tutor**

- PATCH `/catalogue/vacation/:id`: **altera o estado de ferias do modelo**

  **header/auth** = "Bearer token"

Cada uma das rotas contemplam as convenções de respostas para APIs REST.

## Deploy:

**https://freeladb.onrender.com**

**OBS:** Atualmente o deploy do banco está suspenso

## Tecnologias utilizadas:

Para este projeto, as principais utilizadas foram:

- Javascript
- Node
- Express
- Postgres
