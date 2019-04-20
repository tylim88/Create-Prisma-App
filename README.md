# Create Prisma App

✨ Setup environments sophisticated [Prisma](https://github.com/prisma/prisma) back end in just one command!

## Important

⚠️ [Breaking change](https://github.com/prisma/prisma/issues/3359#issuecomment-465934053) in `Prisma v1.28` and this template `v1.5.0 +` is intended to accommodate the change

## Installation

```bash
npm i -g create-prisma-app
create-prisma-app MyPrismaApp
```

OR

```bash
npx create-prisma-app MyPrismaApp
```

🐝 If your docker unable to run this package then you may need Docker `v18.06 +`.

## Quick Start

### Dev Environment Quick Start

start:

```bash
npm run dev-setup
```

☀️ It is ok to always use `dev-setup` to start dev

shut down:

```bash
npm run dev-down
```

then `Ctrl + C` to terminate Node in terminal

### Test Environment Quick Start

start:

```bash
npm run test-setup # for 1st time only (run this again for different docker file setting)
npm run test-up #⚡ for 2nd time and above(do not run test-up soon after test-setup, it is unnecessary)
```

shut down:

```bash
npm run test-down
```

🚩 `test-start`, `test-deploy` and `test-schema` automatically run in container and doesn't work outside the of the container(remember unlike dev environment, test and prod Node is running in container)

### Prod Environment Quick Start

Prod is very similar to test, so the instructions also similar:

start:

```bash
npm run prod-setup # 1st time only (run this again for different docker file setting)
npm run prod-up # ⚡️ for 2nd time and above(do not run prod-up soon after prod-setup, it is unnecessary)
```

shut down:

```bash
npm run prod-down
```

🚩 `prod start`, `prod-deploy` and `prod-schema` automatically run in container and doesn't work outside the of the container(remember unlike dev environment, test and prod Node is running in container)

### Jest Environment Quick Start

1. in `./.config/jest.env`, change the value of `PRISMA_ENDPOINT` to match dev or test.

🐠 Jest run on Prisma endpoint not Node endpoint

⚠️ **important: do not run jest on production because jest delete database in the beginning of run, that is why there is no `jest-prod` config file!**

### Configuration

Most configurations are exposed already exposed in `./.config` folder, read comments in `dev.env` to have better understanding what each variable does.

### Scripts

The scripts may look overwhelming, but it is actually repetitive in pattern, what the scripts do are also very straight forward, they are like the scripts that you frequently use, just more organized and accessible.

## Troubleshooting

### Unexpected End of JSON Input During Installation

👿 npm cache [corrupted](https://stackoverflow.com/questions/47675478/npm-install-errorunexpected-end-of-json-input-while-parsing-near-nt-webpack)  
😇 run `npm cache clean --force` to fix it

### "Project default\$default Not Found"

👿 mostly when running test or prod, this is due to Node server is ready before Prisma server and fail to deploy schema, this happen if your server is sleeping and prisma need time to establish connection.  
😇 the solution is easy, increase delay of `wait-prisma` scripts in `package.json`.  
👷 will add checking mechanism in future.

### "Internal Server Error"

👿 mostly when running test or prod, could be many reason, most possible reason is Node unable to connect with Prima due to .env variables misconfiguration.  
😇 if your config is correct but has this error, wait a while and keep trying; if not check your .env variables configuration.

### Graphql Playground Shows Blank Page After dev or test Setup

👿 Node fail or haven't establish the connection with Prisma server  
😇 the solution is easy, just wait and refresh the page **or** increase delay of `wait-prisma` npm scripts in `package.json`.

### Port is Already Allocated Error

👿 it is most likely you have another program like postgres installed and running with 5433 port.  
😇 change `PSQL_PORT` variable in `./.config/xxx.env`, xxx is dev or test or prod.

## Architecture

This package is aim to get you up and running in different environments, in general there are 4 types of environments:

1. dev(dev.env)
   Ideally dev is an environment that allow us to code and experimenting our thing even without internet. It is an environment that we can carry on planning and creating without relying third party service such as server on AWS, instead we should have a server that we can toy with anytime in our computer.

2. prod(prod.env)
   Prod is the environment where we want to treat our data, data model and configuration delicately. Imagine if we accidentally deploy our dev data and configuration into prod, that would be hell unleashed.For some cases we can mix up test and dev environments and that is tolerable, but production environment must has it own space.

3. test(test.env)
   Ideally the test environment should be as similar as prod environment as possible so that we can expect the same behavior when we deploy it, do not confuse this with jest.

4. jest(jest.env)
   Do not confuse this with test, jest has its own environment variables that points to test environment from outside world, in short jest are interaction from real world upon this dev, test and ci environment.

To summarize it:

| Environment | Prisma                                 | Node                                   | Postgres           | Justification                                                 |
| ----------- | -------------------------------------- | -------------------------------------- | ------------------ | ------------------------------------------------------------- |
| dev         | dockerized locally                     | local                                  | dockerized locally | for fast development                                          |
| prod        | dockerized in prod server 1            | dockerized in prod server 1            | prod server 2      | for easy deployment in production                             |
| test        | dockerized locally or in test server 1 | dockerized locally or in test server 1 | test server 2      | to mimic production environment with free to torture database |
| jest        | none                                   | none                                   | none               | to interact with dev/test/ci environment                      |

✈️ **You can always change the architecure, simply modify the `docker(compose)` files and change the variables in `./.config` accordingly**

Docker refuses to add a key that allows user chooses to run a service or not even though it is a highly requested [feature]('https://github.com/docker/compose/issues/1896').

The implication is we are unable to share the same `docker-compose` file for all modes, especially dev mode because dev mode run Node outside docker.

I have no choice but to create a separated docker yml file for dev. Yes we can use `--scale service=0` command, but that doesn't stop docker wasting time building the service and building Node every time user run dev mode.

## Prerequisite

Knowledge:

1. [Graphql](https://graphql.org/)
2. [Prisma](https://github.com/prisma/prisma)

Tools:

1. [Docker](https://www.docker.com/)
2. [Kitematic](https://kitematic.com/)(optional): Docker GUI 🚲
3. [DBeaver](https://github.com/dbeaver/dbeaver)(optional): SQL database GUI 🚲

🚲 With or without Kitematic and DBeaver, we still able to get the app running, but I recommend them because they are very useful especially DBeaver.

## Extra Benefits

1. commit hooked prettier styling
2. Babel env preset, write ES6️⃣ right away!
3. basic data model
4. basic schema
5. basic api call
6. basic Jest test
7. basic CircleCI configuration file
8. basic JWT authentication
9. modularity, replace any dependency you want.

## Documentation

The scripts is extended to 5 parts:

- basic
- jest
- prod
- test
- dev

1. prod, test and dev are derived from basic script.
2. The scripts are mostly structured in the same way: prod and test scripts have 99% of similarity.
3. The 1% is test-setup will open server endpoint in browser when it is ready.
4. test will fails to open the browser in Ubuntu but it does no harm while prod-setup will not.
5. dev has slightly more scripts and much loosely structured so that you can develope with more flexible scripts.
6. jest only has 2 scripts.

Please study `./config/dev.env` for better understanding on how each environment variable works.

Here is doc for scripts:

| script         | command                                                                                                                                                                            | description                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 📋 basic       |                                                                                                                                                                                    | basic                                                                                                               |
| start          | npm run build && Node dist/index.js                                                                                                                                                | build the code and start Node                                                                                       |
| build          | babel src --out-dir dist --copy-files                                                                                                                                              | build the code with babel                                                                                           |
| dbuild         | docker-compose build                                                                                                                                                               | build the containers                                                                                                |
| rebuild        | docker-compose build --no-cache                                                                                                                                                    | build the containers with no cache                                                                                  |
| up             | docker-compose up -d                                                                                                                                                               | orchestrate containers                                                                                              |
| tail           | docker-compose up                                                                                                                                                                  | orchestrate containers with tail logs                                                                               |
| deploy         | Prisma deploy                                                                                                                                                                      | deploy Prisma data model to database                                                                                |
| schema         | Prisma generate                                                                                                                                                                    | generate schema from Prisma for Node                                                                                |
| token          | Prisma token                                                                                                                                                                       | generate Prisma authentication token                                                                                |
| volume         | cross-env-shell \"docker volume create \$DOCKER_VOLUME\"                                                                                                                           | create docker volume                                                                                                |
| down           | docker-compose down --remove-orphans                                                                                                                                               | shut down containers                                                                                                |
| playground     | cross-env-shell \"./Node_modules/.bin/opn \$Node_ENDPOINT\"                                                                                                                        | open Node endpoint in browser (will fails in Ubuntu but do no harm)                                                 |
| wait-Prisma    | cross-env-shell \"sleep 20\"                                                                                                                                                       | delay for 20 seconds                                                                                                |
| jest           |                                                                                                                                                                                    | jest                                                                                                                |
| jest-dev       | env-cmd ./.config/jest_dev.env jest --watch --runInBand                                                                                                                            | build, watch for the change and run the jest in sequence with dev config                                            |
| jest-test      | env-cmd ./.config/jest_test.env jest --runInBand                                                                                                                                   | build and run the jest in sequence with test config                                                                 |
| jest-ci        | env-cmd ./.config/jest_ci.env jest --runInBand                                                                                                                                     | build and run the jest in sequence                                                                                  |
| 📋 prod        |                                                                                                                                                                                    | prod                                                                                                                |
| prod-setup     | npm run prod-schema && npm run prod-volume && npm run prod-build && npm run prod-up && Node ./terminalString/mprod.js                                                              | generate schema, create docker volume, build and orchestrate containers                                             |
| prod-start 🚩  | npm run wait-Prisma && npm run prod-deploy && env-cmd ./.config/prod.env npm run start                                                                                             | deploy and generate schema, start Node                                                                              |
| prod-deploy 🚩 | env-cmd ./.config/prod.env npm run deploy && npm run prod-schema                                                                                                                   | deploy and generate schema                                                                                          |
| prod-schema 🚩 | env-cmd ./.config/prod.env npm run schema                                                                                                                                          | generate Prisma schema                                                                                              |
| prod-token     | env-cmd ./.config/prod.env npm run token                                                                                                                                           | generate Prisma token                                                                                               |
| prod-volume    | env-cmd ./.config/prod.env npm run volume                                                                                                                                          | create docker volume                                                                                                |
| prod-build     | env-cmd ./.config/prod.env npm run dbuild                                                                                                                                          | build containers                                                                                                    |
| prod-rebuild   | env-cmd ./.config/prod.env npm run rebuild                                                                                                                                         | build containers with no cache                                                                                      |
| prod-up        | env-cmd ./.config/prod.env npm run up                                                                                                                                              | orchestrate containers                                                                                              |
| prod-tail      | env-cmd ./.config/prod.env npm run tail                                                                                                                                            | orchestrate containers with tail logs                                                                               |
| prod-down      | env-cmd ./.config/prod.env npm run down                                                                                                                                            | shut down containers                                                                                                |
| 📋 test        |                                                                                                                                                                                    | test                                                                                                                |
| test-setup     | npm run test-schema && npm run test-volume && npm run test-build && npm run test-up && Node ./terminalString/mtest.js && npm run wait-Prisma && env-cmd ./.config/test.env npm run | generate schema, create docker volume, build, orchestrate containers and open Node endpoint in browser(if possible) |
| test-start 🚩  | npm run wait-Prisma && npm run test-deploy && env-cmd ./.config/test.env npm run start                                                                                             | deploy and generate schema, start Node                                                                              |
| test-deploy 🚩 | env-cmd ./.config/test.env npm run deploy && npm run test-schema                                                                                                                   | deploy and generate schema                                                                                          |
| test-schema 🚩 | env-cmd ./.config/test.env npm run schema                                                                                                                                          | generate Prisma schema                                                                                              |
| test-token     | env-cmd ./.config/test.env npm run token                                                                                                                                           | generate Prisma token                                                                                               |
| test-volume    | env-cmd ./.config/test.env npm run volume                                                                                                                                          | create docker volume                                                                                                |
| test-build     | env-cmd ./.config/test.env npm run dbuild                                                                                                                                          | build containers                                                                                                    |
| test-rebuild   | env-cmd ./.config/test.env npm run rebuild                                                                                                                                         | build containers with no cache                                                                                      |
| test-up        | env-cmd ./.config/test.env npm run up                                                                                                                                              | orchestrate containers                                                                                              |
| test-tail      | env-cmd ./.config/test.env npm run tail                                                                                                                                            | orchestrate containers with tail logs                                                                               |
| test-down      | env-cmd ./.config/test.env npm run down                                                                                                                                            | shut down containers                                                                                                |
| 📋 dev         | dev                                                                                                                                                                                | dev                                                                                                                 |
| dev-setup      | npm run dev-volume && npm run dev-build && npm run dev-up && cross-env-shell \"sleep 3\" && npm run dev-deploy && concurrently \"npm run dev-start\" \"npm run dev-browse\"        | create volume, build container, orchestrate containers and open Node endpoint in browser                            |
| dev-ready      | concurrently \"npm run dev-up\" \"npm run dev-start\" \"npm run dev-browse\"                                                                                                       | orchestrate containers, start Node and open browser in parallel                                                     |
| dev-start      | env-cmd ./.config/dev.env npm start                                                                                                                                                | start Node                                                                                                          |
| dev-browse     | cross-env-shell \"sleep 3\" && Node ./terminalString/mdev.js && cross-env-shell \"sleep 5\" && env-cmd ./.config/dev.env npm run playground                                        | open Node endpoint in browser                                                                                       |
| dev-Nodemon    | env-cmd ./.config/dev.env Nodemon src/index.js --ext js,graphql --exec babel-Node                                                                                                  | start Node in Nodemon with babel, watch js and graphql file change                                                  |
| dev-deploy     | env-cmd ./.config/dev.env npm run deploy && npm run dev-schema                                                                                                                     | deploy and generate schema                                                                                          |
| dev-schema     | env-cmd ./.config/dev.env npm run schema                                                                                                                                           | generate Prisma schema                                                                                              |
| dev-token      | env-cmd ./.config/dev.env npm run token                                                                                                                                            | generate Prisma token                                                                                               |
| dev-volume     | env-cmd ./.config/dev.env npm run volume                                                                                                                                           | create docker volume                                                                                                |
| dev-build      | env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml build                                                                                                         | build containers                                                                                                    |
| dev-rebuild    | env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml build --no-cache                                                                                              | build containers with no cache                                                                                      |
| dev-up         | env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml up -d                                                                                                         | orchestrate containers                                                                                              |
| dev-tail       | env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml up                                                                                                            | orchestrate containers with tail logs                                                                               |
| dev-down       | env-cmd ./.config/dev.env npm run down                                                                                                                                             | shut down containers                                                                                                |

🚩 Automatically run in container and doesn't work outside the of the container(remember unlike dev environment, Test and Prod Node are running in container)

## Tip & Star

😄 Consider star or tipping me if you found this template helpful, and wish to see more rapid development.

BTC: `1KbpCqzZ6FSfoi1R9obGEVXRHpbJMQQCda`  
ETH: `0x4DfD790D98F8f3E013E70da51E70B60b953c7e61`  
LTC: `LXVYLpe9zQ48aGCuBqjLW8xxaBfVBauXST`  
XRP: `rnftUYRq91TBL6ceK5y3UnFiYBLQMFkZn6`  
ADA: `Ae2tdPwUPEYxapgJjg9qpg1RhyfBq5vx6ZdWXafNqZihg4rCD7baXhMf7CH`  
BNB: `0x4DfD790D98F8f3E013E70da51E70B60b953c7e61`  
[PayPal](https://www.paypal.me/tylim88)

## Acknowledgement

This project is inspired by the authors of existing related project

- [graphql-boilerplate](https://github.com/andrewjmead/graphql-boilerplate)

- [create-next-app](https://github.com/segmentio/create-next-app)

## MISC

🌟 this project generator was bootstrapped with [create-npm-create](https://www.npmjs.com/package/create-npm-create) packageception
