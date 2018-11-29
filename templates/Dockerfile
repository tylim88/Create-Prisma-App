FROM node:8.12

WORKDIR /usr/app

COPY . .

RUN npm i && npm install bcrypt
# why we reinstall bcrypt again https://stackoverflow.com/questions/15809611/bcrypt-invalid-elf-header-when-running-node-app
CMD ["/bin/bash"]
# bring up bash shell https://www.ctl.io/developers/blog/post/dockerfile-entrypoint-vs-cmd/