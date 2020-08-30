## Node version management:

    https://github.com/nodenv/nodenv
    
Node version is stored in `.node-version`

## Setup server

1) `cp env.example .env`
2) paste your own values to .env example
3) execute `initial.sql`  
4) `npm start server`

### How to setup postgres with docker

    docker run --name postgres -e POSTGRES_PASSWORD=password -d -p 5432:5432 postgres
