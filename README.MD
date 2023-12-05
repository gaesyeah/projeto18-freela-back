# MiauAuAu (Back-End)

## Como funciona?

Este projeto é uma API REST para atender a MiauAuAu, aplicação onde tutores de diversos animais(pets ou não) podem cadastra-los para oferecer seus serviços de modelo(sim! seu animalzinho agora pode ser um astro!) para que qualquer pessoa possa contata-la e contratar seu serviço.

## Deploy:

**https://freeladb.onrender.com**

**OBS:** Atualmente o deploy do banco está suspenso

## Como rodar localmente?

- Ter o Node e Postgres instalados
- Renomear o arquivo .env.example para .env (ou criar um)
- Rodar os comandos: **npm run start-db** && **npm run dev**

## Rotas:

**`user`**:

- POST `/user/sign-up`: **cria um usuário**

```json
body = {
  "name": string,
  "email": string,
  "imageUrl": string,
  "cellphone": string,
  "cpf": string,
  "password": string,
  "confirmPassword": string
}
```

- POST `/user/sign-on`: **loga com o usuário**

```json
body = {
  "email": string,
  "password": number
}
```

- POST `/user/sign-out`: **desloga o usuário**

  (_necessita de Bearer token_)

**`breed`**:

- POST `/breed`: **insere uma raça**

```json
body = {
  "name": string,
  "imageUrl": string
}
```

- GET `/breed`: **busca todas as raças**

**`catalogue`**:

- POST `/catalogue`: **insere um pet modelo**

  (_necessita de Bearer token_)

```json
body = {
  "title": string,
  "description": string,
  "avaliable": boolean,
  "breedId": number,
  "mainPhotoPositionFromPhotosArray": number,
  "photos": [
    {
      "url": string
    }
  ]
}
```

- PATCH `/catalogue/vacation/:id`: **altera o estado de ferias do modelo**

  (_necessita de Bearer token_)

- GET `/catalogue/mine`: **busca todos os modelos do usuário, separados por raça**

  (_necessita de Bearer token_)

- GET `/catalogue/breed/:breedId`: **retorna todos os modelos de acordo com a raça**

- GET `/catalogue/unique/:id`: **retorna um único modelo e os dados de contato de seu tutor**

Cada uma das rotas contemplam as convenções de respostas para APIs REST.

## Tecnologias utilizadas:

Para este projeto, as principais utilizadas foram:

- Javascript
- Node
- Express
- Postgres
