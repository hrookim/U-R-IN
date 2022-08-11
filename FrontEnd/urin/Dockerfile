FROM node:16.16.0 as build-stage

# work directory 설정
WORKDIR /usr/src/app

# pachage.. 로 시작하는 json을 work directory로 가져옴
COPY package*.json ./

# RUN npm install -g npm@8.16.0

# 강제 업뎃
RUN npm install --force

# 젠킨스 워크스페이스로부터 코드를 가져옴
COPY . .

RUN npm run build

# nginx configuration
FROM nginx:stable-alpine as production-stage

RUN rm -rf /etc/nginx/conf.d

COPY conf /etc/nginx

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
