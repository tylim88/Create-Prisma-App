# README

_credit for Udemy instructor Andrew Mead, this boilerplate is modified version of Andrew's boilerplate._

## Intro

Why spending time perfecting this boilerplate, isn't it just a boilerplate?

To understand this let us look at the environments we working in, in general there are 3 types of environments:

1. dev  
   Ideally dev is an environment that allow us to code and experimenting our thing even without internet. It is an environment that we can carry on planning and creating without relying third party service such as server on AWS, instead we should have a server that we can toy with anytime in our computer.

2. prod  
   Prod is the environment where we want to treat our data, data model and configuration delicately. Imagine if we accidentally deploy our dev data and configuration into prod, that would be hell unleashed.For some cases we can mix up test and dev environments and that is tolerable, but production environment MUST has it own space, this is not an option.

3. test  
   Ideally the test environment should be as similar as prod environment as possible so that we can expect the same behavior when we deploy it. We might need to mock some module if the test is too slow.

As we can see we have 3 environments and setting up all the environments can be very time consuming even for experienced member who just join the team, let alone the beginner. To run the environments, we need to install all kind of software and configure all of them, imagine all kinds of thing we need to do just to get the code run.

If the environments are too complicated to setup, it take away our attention from REAL engineering problem, I remember in my first job, we spent 80% of the time just to pick up the tool (if you are curious, it was Siemens software and Siemens is infamous for not so user friendly software).

Hence this motivates me to create and maintain well structured boilerplate, so that any newcomer that join the project can work on the code with minimum configuration. When we creating a boilerplate, alway put the team in mind, even if we are working alone, we also should do this because boilerplate that is convenient for a team definitely convenient for one man army too.

The objective of this boilerplate is you should able to run it with just installing docker and use npm script to run command.

Prerequisite knowledge:

1. Graphql
2. Prisma library

What you need to have:

1. Docker
2. Kitematic(optional): Docker GUI\*
3. TeamSQL(optional): SQL database GUI\*
4. A PSQL database hosted online\*\*

\*With or without Kitematic and TeamSQL, we still able to get the app running, but I strongly recommend them because they are powerful utility
\*\*a demo database is ready for you, due to technical complication, I was unable to docker-compose PSQL and Prisma in Ubuntu(it can be done in Window and Mac). Hence to satisfy all three platforms, I decided to exclude PSQL from docker and it is actually a better decision because having database on the other server add the security.

Here is instruction to get running:

1. to get dev up and run: npm run dev-setup

And BOOM, with just one script, our dev environment graphql playground is up and running, waiting for us to explore!

We can also npm run test-setup to launch test-environment, it is a docker composed of even the node server.

we need to create the test.env and prod.env ourself, because everyone has different prod and test, both env file is very similar to dev.env, please refer to ./config/dev.env for guidelines

Did I mention this boilerplate also comes with:

1. commit hooked prettier styling
2. Babel env preset
3. basic data model
4. basic schema
5. basic api call
6. basic test (include subscription test)
7. basic CircleCI configuration file
8. basic JWT authentication

- npm run setup is for first time setup only, please explore other scripts to run the command you need(see documentation).
- if you are facing port is already allocated error, it is most likely you have postgres installed and running with 5433 port, change PSQL_PORT in ./config/dev.env
- to shut down container: npm run docker-down.

## Doc

The scripts is extended to 4 parts:

- basic
- prod
- test
- dev

prod,test and dev is script is derived from basic script, so that we can standardize how the script run. The scripts are mostly structured in the same: prod and test scripts have 99% of similarity, the 1% is test-setup will open server endpoint in browser when it is ready (it will fails to open the browser in Ubuntu but it does no harm) while prod-setup will not; dev has slightly more scripts and much loosely structured so that you can develope with more flexible scripts.

When come to applications, prod and test are exactly the same, they both dockerize the nodejs and prisma, dev on the other hand only prisma in the container(prisma currently can only run in docker container). The reason behind this architecure is simple, we shouldn't be developing in container environment, we should only dockerize when we want to deliver it, plus develope in container environment add difficulty and slow down the development.

Docker refuse to add key that allow user to run a service or not because the developers want to uphold some silly engineering principle even though it is a highly requested feature https://github.com/docker/compose/issues/1896, I have no choice but to create a new yml file for dev, yes we can use --scale service=0 command, but that doesn't stop docker from building the service and building node every time is not ideal for dev.

here is a catch, Do not confuse jest with test, the test here mean production code that is injected with test environment variable(because we dont want to mess up the database!), we only run jest in dev environment. Test environment is for us to test it with real world interaction, not for us to run jest.
and here is another catch, we run jest in dev environment with test environment variable injected, this save us problem running jest in test environment.

    "separator-0": "-----------------------------------------------------basic-----------------------------------------------------------------------",
    "jest": "jest --watch --runInBand", watch for the change and run the jest in sequence,
    "jest-ci": "jest --runInBand", run the jest in sequence,
    "start": "npm run build && node dist/index.js", build the code and start nodejs,
    "build": "babel src --out-dir dist --copy-files", build the code,
    "dbuild": "docker-compose build", build the containers,
    "rebuild": "docker-compose build --no-cache", build the containers with no cache,
    "up": "docker-compose up -d", orchestrate the container,
    "tail": "docker-compose up", orchestrate the container with tail logs,
    "deploy": "prisma deploy", deploy prisma data model to database,
    "schema": "prisma generate", generate schema from prisma for nodejs,
    "token": "prisma token", generate prisma authentication token,
    "volume": "cross-env-shell \"docker volume create $DOCKER_VOLUME\"", create docker volume(deprecated)
    "down": "docker-compose down", shut down containers
    "playground": "cross-env-shell \"./node_modules/.bin/opn $NODE_ENDPOINT\"", open nodejs endpoint in browser (will fail in Ubuntu but do no harm)
    "wait-prisma": "cross-env-shell \"sleep 12\"", delay for x seconds
    "separator-1": "-----------------------------------------------------prod------------------------------------------------------------------------",
    "prod-setup": "npm run prod-build && npm run prod-up && node ./terminalString/dev.js", build and orchestrate containers
    "prod-start": "npm run wait-prisma && npm run prod-deploy && env-cmd ./.config/prod.env npm run start", deploy and generate schema, start nodejs
    "prod-deploy": "env-cmd ./.config/prod.env npm run deploy && npm run prod-schema", deploy and generate schema
    "prod-schema": "env-cmd ./.config/prod.env prisma generate", generate prisma schema
    "prod-token": "env-cmd ./.config/prod.env npm run token", generate prisma token
    "prod-build": "env-cmd ./.config/prod.env npm run dbuild", build containers
    "prod-rebuild": "env-cmd ./.config/prod.env npm run rebuild", build containers with no cache
    "prod-up": "env-cmd ./.config/prod.env npm run up", orchestrate containers
    "prod-tail": "env-cmd ./.config/prod.env npm run tail", orchestrate containers with tail logs
    "prod-down": "env-cmd ./.config/prod.env npm run down", shut down containers
    "separator-2": "---------------------------------------------------test---------------------------------------------------------------------------",
    "test-setup": "npm run test-build && npm run test-up && node ./terminalString/test.js && npm run wait-prisma && env-cmd ./.config/test.env npm run playground", build, orchestrate containers and open nodejs endpoint in browser
    "test-start": "npm run wait-prisma && npm run test-deploy && env-cmd ./.config/test.env npm run start", deploy and generate schema, start nodejs
    "test-deploy": "env-cmd ./.config/test.env npm run deploy && npm run test-schema", deploy and generate schema
    "test-schema": "env-cmd ./.config/test.env prisma generate", generate prisma schema
    "test-token": "env-cmd ./.config/test.env npm run token", generate prisma token
    "test-build": "env-cmd ./.config/test.env npm run dbuild", build containers
    "test-rebuild": "env-cmd ./.config/test.env npm run rebuild", build containers with no cache
    "test-up": "env-cmd ./.config/test.env npm run up", orchestrate containers
    "test-tail": "env-cmd ./.config/test.env npm run tail", orchestrate containers with tail logs
    "test-down": "env-cmd ./.config/test.env npm run down", shut down containers
    "separator-3": "-------------------------------------------------------dev-------------------------------------------------------------------------",
    "dev-setup": "npm run dev-build && npm run dev-up && cross-env-shell \"sleep 3\" && npm run dev-deploy && concurrently \"npm run dev-start\" \"npm run dev-browse\"", build, orchestrate containers and open nodejs endpoint in browser
    "dev-ready": "concurrently \"npm run dev-up\" \"npm run dev-start\" \"npm run dev-browse\"", orchestrate containers, start nodejs and open browser in parallel
    "dev-start": "env-cmd ./.config/dev.env npm start", start nodejs
    "dev-browse": "cross-env-shell \"sleep 3\" && node ./terminalString/dev.js && cross-env-shell \"sleep 5\" && env-cmd ./.config/dev.env npm run playground", open nodejs endpoint in browser
    "dev-jest": "env-cmd ./.config/test.env npm run jest", run jest
    "dev-nodemon": "env-cmd ./.config/dev.env nodemon src/index.js --ext js,graphql --exec babel-node", start nodejs in nodemon with babel, watch js and graphql file change
    "dev-deploy": "env-cmd ./.config/dev.env npm run deploy && npm run dev-schema", deploy and generate schema
    "dev-schema": "env-cmd ./.config/dev.env prisma generate", generate prisma schema
    "dev-token": "env-cmd ./.config/dev.env npm run token", generate prisma token
    "dev-build": "env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml build", build containers
    "dev-rebuild": "env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml build --no-cache", build containers with no cache
    "dev-up": "env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml up -d", orchestrate containers
    "dev-tail": "env-cmd ./.config/dev.env docker-compose -f ./docker-compose-dev.yml up", orchestrate containers with tail logs
    "dev-down": "env-cmd ./.config/dev.env npm run down" shut down containers
