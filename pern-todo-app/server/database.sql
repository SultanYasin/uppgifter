/* !-- skapa pern DB med 2 columner: id, description   */
CREATE DATABASE pern;

CREATE TABLE todo(
  id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);