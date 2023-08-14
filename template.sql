CREATE TABLE sessions (
	id SERIAL PRIMARY KEY,
	"userId" INT NOT NULL,
	token TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	cellphone CHAR(11) NOT NULL UNIQUE,
	cpf CHAR(11) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE catalogue (
	id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	description TEXT NOT NULL,
	"breedId" INT NOT NULL,
	"userId" INT NOT NULL,
    "mainPhotoId" INT,
	avaliable BOOLEAN NOT NULL DEFAULT true,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE photos (
	id SERIAL PRIMARY KEY,
	"catalogueId" INT NOT NULL,
	url TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE breeds (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL UNIQUE,
	"imageUrl" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE likes (
	id SERIAL PRIMARY KEY,
	"userId" INT NOT NULL,
    "catalogueId" INT NOT NULL,
    UNIQUE("userId", "catalogueId"),
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE comments (
	id SERIAL PRIMARY KEY,
	"userId" INT NOT NULL,
	"catalogueId" INT NOT NULL,
	comment TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE sessions ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES users(id);

ALTER TABLE catalogue ADD CONSTRAINT catalogue_fk0 FOREIGN KEY ("breedId") REFERENCES breeds(id);

ALTER TABLE catalogue ADD CONSTRAINT catalogue_fk1 FOREIGN KEY ("userId") REFERENCES users(id);

ALTER TABLE catalogue ADD CONSTRAINT catalogue_fk3 FOREIGN KEY ("mainPhotoId") REFERENCES photos(id);

ALTER TABLE photos ADD CONSTRAINT photos_fk0 FOREIGN KEY ("catalogueId") REFERENCES catalogue(id);

ALTER TABLE likes ADD CONSTRAINT likes_fk1 FOREIGN KEY ("catalogueId") REFERENCES catalogue(id);

ALTER TABLE comments ADD CONSTRAINT comments_fk1 FOREIGN KEY ("catalogueId") REFERENCES catalogue(id);

ALTER TABLE likes ADD CONSTRAINT likes_fk0 FOREIGN KEY ("userId") REFERENCES users(id);

ALTER TABLE comments ADD CONSTRAINT comments_fk0 FOREIGN KEY ("userId") REFERENCES users(id);







