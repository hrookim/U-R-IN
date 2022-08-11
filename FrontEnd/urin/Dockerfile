FROM node:16.16.0

RUN npm install -g serve

RUN mkdir /app

WORKDIR /app

RUN mkdir ./build

COPY ./build ./build

EXPOSE 3000

ENTRYPOINT ["serve", "-s", "build"]
