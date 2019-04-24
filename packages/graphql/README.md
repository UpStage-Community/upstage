# Overview

This server was originally based off of [this example code](https://github.com/prisma/prisma-examples/tree/master/typescript/graphql-auth), which has some good examples.

Here are the Prisma docs: https://www.prisma.io/docs

# Get the server running

`yarn install` to install all dependencies.

### Start local server
Get [Docker](https://www.docker.com/products/docker-desktop) and then run
`docker-compose up -d`

Move the managementApiSecret (in docker-compose.yml) to a .env file as:
`PRISMA_MANAGEMENT_API_SECRET=___SECRET___`

In the future, we can split out these secrets for dev, staging and production.

### Deploy to anywhere
Deployment targets are controlled by the `endpoint` field in `prisma.yml`.  For localhost, switch it to `http://localhost:4466`. `prisma deploy` will set it for you if you include `-n` in the deploy command, or you can set it yourself. For remotes, running the below command will allow you to choose a server or set it (once you've run `prisma login` to access your cloud account).

`prisma deploy -n --env-file .env`



## Upgrade Heroku container Prisma version

Currently, Prisma does not offer an easy way to upgrade the Heroku image. Follow these steps to upgrade (also make sure you've already run `heroku container:login`):
https://github.com/prisma/prisma-cloud-feedback/issues/202#issuecomment-414095090

# Playground examples
You can access the client playground by running `yarn start` or `yarn dev` (dev will autoreload on save) and navigating to the localhost they specify.

## Sign Up
```
mutation {
  signup(firstName: "Matt", lastName:"Hamilton", email: "matt@upstagecommunity.com", password: "hahaha") {
    token
  }
}
```
## Log In
```
mutation {
  login(email: "matt@upstagecommunity.com", password: "hahaha") {
    token
  }
}
```

## GET logged in user
```
{
  me {
    id
    firstName
    lastName
    email
  }
}
```
with this under HTTP headers:
```
{
  "Authorization": "Bearer __TOKEN__"
}
```
