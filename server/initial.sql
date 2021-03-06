CREATE TABLE users(
   id UUID PRIMARY KEY,
   login VARCHAR(128),
   password VARCHAR(128),
   age INT,
   is_deleted BOOLEAN
);

CREATE TABLE groups(
   id UUID PRIMARY KEY,
   name VARCHAR(128),
   permissions VARCHAR(128) ARRAY
);

CREATE TABLE users_groups(
    id UUID,
    user_id UUID REFERENCES users ON DELETE CASCADE,
    group_id UUID REFERENCES groups ON DELETE CASCADE
);

INSERT INTO users (id, login, password, age, is_deleted)
VALUES
    ('5825ca51-28b3-4d59-ad34-204b00612b8a', 'clojure', '(println 1 2 3)', 13, False),
    ('daa6d68f-1e59-4c85-8432-0b22a66c2e2c', 'python', 'print(1, 2, 3)', 30, False),
    ('45aa08ff-e21a-4104-83a0-0c8e382af6a5', 'nodejs', 'console.log(1, 2, 3)', 11, False),
    ('95a7dede-4cf7-4a71-96ef-1ad8b7a59dfe', 'JavaScript', 'console.log(1, 2, 3)', 24, False),
    ('0c06d3e6-fd60-4a5f-8676-0002c20fa398', 'ClojureScript', '(js/console.log 1 2 3)', 13, False);

INSERT INTO groups (id, name, permissions)
VALUES
    ('f58874a3-d3a1-4967-96d3-a9b3fcb5ce21', 'functional', ARRAY ['READ']);
