# README

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

Hence this motivate me to create and maintain well structured boilerplate, so that any newcomer that join the project can work on the code with minimum configuration. When we creating a boilerplate, alway put the team in mind, even if we are working alone, we also should do this because boilerplate that is convenient for a team definitely convenient for one man army too.

The objective of this boilerplate is you should able to run it with just installing docker and use npm script to run command.

Prerequisite:

1. You know Graphql
2. You know Prisma library

What you need to install:

1. Docker
2. Kitematic(optional): Docker GUI
3. TeamSQL(optional): SQL database GUI

With or without Kitematic and TeamSQL, we still able to get the app running, but I strongly recommend them because they are powerful utility

Here is instruction to get running:

1. in the command line: npm run setup-dev-win (mac user can try npm run setup-dev, unfortunately I don't have mac so I cant test it out)

And BOOM, with just one script, our graphql playground is up and running, waiting for us to explore!

Did I mention this boilerplate also comes with:

1. commit hooked prettier styling
2. Babel env preset
3. basic data model
4. basic schema
5. basic api call
6. basic test (include subscription test)
7. basic CircleCI configuration file
8. basic JWT authentication

Note: npm run setup is for first time setup only, please explore other scripts to run the command you need.
Note1: if you are facing port is already allocated error, it is most likely you have postgres installed and running with 5433 port, change PSQL_PORT in ./config/dev.env
Note2: to shut down container: npm run docker-down.

I am researching one command deploy to heroku, stay tuned.

Lastly, credit for Udemy instructor Andrew Mead, this boilerplate is heavily modified version of Andrew's boilerplate.
