# [Final] How to Build CI/CD

# 사용 기술

- Written By @minahshin

- Nginx + React 배포 도우미 feat ☆윤성도☆

## Server

- Ubuntu 20.04 LTS

### Database

- MySQL 8.0.29

### Container & Management

- Docker 20.10.12
- Docker-compose 1.25.0
    - openvidu container화 관련
- Dockerhub
    - 테스트 컨테이너 및 Jenkins 구축 전 도커 이미지 저장
- Docker Desktop
    - Local에서 도커 이미지 빌드 필요 시 사용

### SSL

- letsencrypt
    - certbot 0.40.0
    - 주의  : key값 저장 필요, 1도메인에 최대 5개까지만 발급 가능

### Proxy

- Nginx 1.18.0
    - 설정파일은 frontend의 dockerfile 및 <frontend_root>/conf/conf.d 에서 관리

### Deploy

- Jenkins 2.346.2

### WebRTC

- Openvidu 2.22.0

### Architecture

![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled.png)

## Dev env

### Frontend

- React 18.2.0
    - NodeJS 16.16.0
    - React-redux 8.0.2
    - React-router-dom 6.3.0
- VS Code 1.70.0

### Backend

- Spring Boot 2.6.10
    - OpenJDK 11 azul-11, 11.0.16
- IntelliJ 2022.1

### External Libraries

- Frontend
    - openvidu-browser 2.22.0
    - face-api.js 0.22.2
    - teachablemachine/pose 0.8.6

### Git Branch Strategy

- Gitflow와 유사하게 가지만, 한 프로젝트에 frontend, backend가 있는 구조라 아래와 같이 작업
    
    ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%201.png)
    

# 방법

## EC2 설정

1. apt-get 최신화
    
    ```bash
    sudo apt-get update
    ```
    
2. ec2에 docker를 설치한다
    
    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io
    
    # docker.sock 권한 변경
    # docker를 재시작할때마다 아래의 명령어 입력 필요
    chmod 666 /var/run/docker.sock
    
    # docker-compose도 설치해준다(openvidu 컨테이너화에 필요)
    apt install docker-compose
    ```
    
3. ec2에 letsencrypt를 이용하여 ssl 인증서를 받는다
    
    ```bash
    sudo apt-get install letsencrypt
    sudo letsencrypt certonly —standalone -d <DOMAIN>
    ```
    
4. ec2에 Nginx를 설치한다
    
    ```bash
    sudo apt-get install nginx
    ```
    

## Frontend 설정

1. EC2에 프로젝트와 동일한 node.js 버전 및 npm 설치
    
    ```bash
    # nodejs 설치
    sudo apt install nodejs@<YOUR_VERSION>
    
    # npm 설치
    sudo apt install npm
    ```
    
2. 프로젝트 최상단에 Dockerfile 작성
    - Dockerfile
        
        ```docker
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
        
        # nginx 기본 포트인 80번을 사용
        EXPOSE 80
        
        ENTRYPOINT ["nginx", "-g", "daemon off;"]
        ```
        
3. 프로젝트 최상단 하위에 conf/conf.d 폴더 생성 후 default.conf(복사용 nginx conf 파일) 생성 필요
    - **default.conf**(location + file content)
        
        ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%202.png)
        
        ```bash
        server {
                listen 80;
                listen [::]:80;
        
                server_name i7a504.p.ssafy.io;
                rewrite ^(.*) https://i7a504.p.ssafy.io$1 permanent;
        }
        
        server {
                listen 443 ssl;
                listen [::]:443;
        
                server_name i7a504.p.ssafy.io;
        
                ssl_certificate /etc/letsencrypt/live/i7a504.p.ssafy.io/fullchain.pem;
                ssl_certificate_key /etc/letsencrypt/live/i7a504.p.ssafy.io/privkey.pem;
        
                location / {
                        root /usr/share/nginx/html;
                        index index.html index.htm;
                        try_files $uri $uri/ /index.html;
                }
        
                location ~^/(api|oauth2) {
                        proxy_pass http://i7a504.p.ssafy.io:8080;
                }
        }
        
        # server {
        #       if ($host = i7a504.p.ssafy.io) {
        #               return 301 https://$host$request_uri;
        #       }
        #}
        ```
        
- **Nginx로 배포하기 때문에 결국 서버에서 frontend는 80 포트를 사용한다**
- Face-api & Teachable Machine Tensorflow dependency 설정
    1. face-api와 teachable machine은 tensorflow 버전이 상이함
    2. face-api(@0.22.2)는 @tensorflow/tfjs-core@1.7.0 사용, teachable machine(@0.8.6)은 @tensorflow/tfjs@1.3.1 사용
    3. 이 둘의 dependency를 해결하기 위해 @tensorflow/converter@1.3.1 사용
    4. 최초 설치 과정
        1. local 환경에서 사용
        2. 배포 환경에서는 package-lock.json을 git에 push하여 dockerfile에서는 npm install —force만 수행해도 됨
        3. 아래 명령어는 dependency 관련 설정이 있어서 순서대로 사용을 권함
        
        ```bash
        # 기존에 설치한 tensorflow 및 ai 라이브러리들 삭제(설치한 적이 없다면 수행X)
        npm uninstall @teachablemachine/pose @tensorflow/tfjs @tensorflow/tfjs-converter @tensorflow/tfjs-core face-api.js
        
        # tensorflow/tfjs 버전을 teachable machine에 맞게 설치
        npm i @tensorflow/tfjs@1.3.1
        
        # tensorflow/tfjs-converter 버전을 낮은 버전(teachable machine)에 맞춰 설치
        npm i @tensorflow/tfjs-converter@1.3.1
        
        # tensorflow/tfjs-core 버전을 face-api에 맞게 설치 + --legacy-peer-deps 옵션
        npm i @tensorflow/tfjs-core@1.7.0 --legacy-peer-deps
        
        # teachable machine 설치 + --legacy-peer-deps 옵션
        npm i @teachablemachine/pose@0.8.6 --legacy-peer-deps
        
        # face-api 설치 + --legacy-peer-deps 옵션
        npm i face-api.js@0.22.2 --legacy-peer-deps
        ```
        

## Backend 설정

1. 프로젝트 최상단에 Dockerfile 작성
    - Dockerfile
        
        ```docker
        # 사용중인 Java 버전 작성
        FROM openjdk:11
        
        # container 외부로 노출할 port number
        EXPOSE 8080
        
        # ./gradlew clean build 산출물 사용
        ARG JAR_FILE=build/libs/urin-0.0.1-SNAPSHOT.jar
        
        # app.jar로 복사
        COPY ${JAR_FILE} app.jar
        
        # app.jar 실행
        ENTRYPOINT ["java", "-jar", "/app.jar"]
        
        # timezone 설정(컨테이너 내부에 접근하여 별개로 설정하지 않아도 된다)
        ENV TZ=Asia/Seoul
        RUN apt-get install -y tzdata
        ```
        

- 주의 : ssl을 사용하기 위해서 spring까지 keystore을 들고 있는 상태로 배포할 필요 x

- server.port 는 8080(기본값)으로 사용

## DB 설정

1. mysql docker hub에서 latest 버전을 pull 받는다
    
    ```bash
    docker pull mysql
    ```
    
2. pull 받은 이미지로 도커 컨테이너를 돌린다
    
    ```bash
    # 보안을 위해 expose되는 포트를 변경해준다
    docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD> -d -p <exposed_port_num>:3306 mysql:latest
    ```
    
3. springboot-mysql 시간 설정(dataSource)
    
    ```yaml
    # spring boot의 application-xxx.yml에 dataSource.url에 <exposed_port_num>을 포함하여 설정해주면 된다
    # JPA에서 현재 시간을 찍기 위해 timezone을 여기서 설정하면 된다
    url: jdbc:mysql://i7a504.p.ssafy.io:<exposed_port_num>/a504?allowPublicKeyRetrieval=true&characterEncoding=UTF-8&serverTimezone=Asia/Seoul
    ```
    

## Jenkins

1. jenkins의 키를 받고, 업데이트 시켜준 후 jenkins를 설치해준다
    
    ```bash
    wget -q -O - [https://pkg.jenkins.io/debian/jenkins.io.key](https://pkg.jenkins.io/debian/jenkins.io.key) | sudo apt-key add -
    
    sudo sh -c 'echo deb [https://pkg.jenkins.io/debian-stable](https://pkg.jenkins.io/debian-stable) binary/ > \
    	
    			/etc/apt/sources.list.d/jenkins.list
    
    sudo apt-get install jenkins
    
    # 만약 젠킨스 설치중에 jenkins has no installation 오류가 뜬다면
    # a의 키값을 가져오는 주소를 확인한다!!
    ```
    
2. 젠킨스의 포트를 변경한다
    
    ```bash
    sudo vi /usr/lib/systemd/system/jenkins.service
    		
    		# vi 에디터가 열리면, 
    		Environment="JENKINS_PORT=<new_jenkins_port>" # 추가하기 
    
    service jenkins restart
    ```
    
3. Jenkins 전역에 쓰이는 gitlab credential을 설정한다
    1. gitlab id, password로 사용함
4. Jenkins로 들어가서 필요한 플러그인을 설치한다
    1. publish over ssh
    2. nodejs(프론트엔드와 같은 nodejs 버전 사용 필수!)
    3. 그 외 추가적인 것이 필요하다면, 필요한 플러그인 설치

### Frontend - Jenkins

1. frontend config file 설정
    
    ```bash
    # .env 파일같이 git에 올리면 안되는 파일 작성
    cd /var/lib/jenkins/workspace/<jenkins_project_name>/<real_project_name>
    vi .env
    ```
    
2. Jenkins 설정
    1. Freestyle project로 생성
    - 사진
        
        ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%203.png)
        
3. Gitlab setting에 들어가서 webhook을 설정한다.
    - 사진
        
        ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%204.png)
        

### Backend - Jenkins

1. backend config file 설정
    
    ```bash
    cd /var/lib/jenkins/workspace/<jenkins_project_name>/**/src/main/resource
    vi <YOUR_APPLICATION_CONFIG_FILE> # ex) application-server.yml
    ```
    
2. Jenkins 설정
    1. Freestyle project로 생성
    - 사진
        
        ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%205.png)
        
3. Gitlab setting에 들어가서 webhook을 설정한다
    - 사진
        
        ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%206.png)
        
    

### Main branch Deploy - Jenkins

1. Jenkins 설정
    1. Freestyle project로 생성
    - 사진
        
        ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%207.png)
        
2. Gitlab setting에 들어가서 webhook을 설정한다
    - 사진
        
        ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%208.png)
        
    

## Openvidu

### Installation

1. Openvidu 설치를 위한 권장 폴더인 /opt 폴더로 이동하여 openvidu 설치
    
    ```bash
    cd /opt
    sudo curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh> | bash
    cd /openvidu
    ```
    
2. https 설정 및 포트 변경을 위하여 .env 파일 수정
    
    ```bash
    sudo vi .env
    ```
    
    ```xml 
   DOMAIN_OR_PUBLIC_IP=<DOMAIN> # ex) i7a504.p.ssafy.io
    OPENVIDU_SECRET=<SECRET_STRING> # ex) URIN
    
    # 자가서명 인증서도 사용 가능하지만, 오류창이 뜨는 issue가 존재하므로 이미 발급한 letsencrypt 사용
    CERTIFICATE_TYPE=letsencrypt
    LETSENCRYPT_EMAIL=<YOUR_EMAIL> # ex) xxx@naver.com
    
    HTTP_PORT=<HTTP_PORT_NUMBER> # ex) 8442
    HTTPS_PORT=<HTTPS_PORT_NUMBER> # ex) 8443
   
   # OTHER SETTINGS... (DO NOT TOUCH!!)
    ```
    
3. ./openvidu start 후 ctrl+c하여 백그라운드로 실행

### When you meet error..

```bash
# 지정한 포트로 openvidu 열려 있는지 확인
sudo netstat -ntlp
	
# 열려있지 않다면)
	# openvidu를 통해 도커라이징 한 nginx log 확인
	docker exec -it openvidu_nginx_1 bash

		# 인증서 관련 오류일 경우, container bash 내부에 이미 받은 letsencrypt 인증서 여부 확인
		cd /etc/letsencrypt/live/<DOMAIN>

		# 확인 후 컨테이너 나옴
		exit
	
	# openvidu 폴더에 pem key 존재 여부 확인
	cd /opt/openvidu/certificate/live/<DOMAIN>

	# 없는 경우 키 복사(필요할 경우 sudo su를 사용해야함 => 접근권한 X)
	cd /etc/letsencrypt/archive/<DOMAIN>
	cp -r * /opt/openvidu/certificates/live/<DOMAIN>/

	# /etc/letsencrypt/archive와 live 폴더 확인 후 파일을 복사한 위치인
	# /opt/openvidu/certificates/live로 가서 파일 이름을 /etc/letsencrypt/live와 동일하게 변경

# openvidu nginx 재시작
cd /opt/openvidu
docker-compose restart nginx

# openvidu 재시작
cd ./openvidu restart

# ctrl + c 눌러 백그라운드 실행
```

# External Techs

## Social Login (KAKAO)

### 1. KAKAO에 어플리케이션 등록

1. 아래의 URL에서 카카오에 어플리케이션을 등록해주어야 한다.
    
    [https://developers.kakao.com/console/app](https://developers.kakao.com/console/app)
    
2. 앱 설정 → 일반 에서 서비스 이름, 아이콘 등을 등록할 수 있다.
    
    ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%209.png)
    
3. 프론트의 도메인을 등록해주어야 한다.
    
    ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%2010.png)
    
4. Redirect URI를 등록해준다. 이 URL는 카카오 서버에서 ‘인증’ 완료 후에 프론트에 인가 코드를 반환한 직후 프론트에서 백엔드로 인가코드를 전달해주기 위해 리다이렉트 시켜주는 URI이다.
    
    ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%2011.png)
    
5. 카카오 로그인 시 사용자에게 받아올 정보의 범위를 정하는 페이지이다. 대부분의 정보는 사용자의 동의가 있어야 받아올 수 있다.
    
    ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%2012.png)
    
6. Rest API키가 Spring Security 설정의 Client-ID 값이 된다.
    
    ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%2013.png)
    

### 2. application.yml에 OAuth2 설정

![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%2014.png)

- client-id에 카카오 developer 페이지의 REST API키를 적어준다.
- redirect-uri는 카카오 페이지에 등록한 uri를 적어준다.
    
    (oauth2client()를 하면 해당 uri로 컨트롤러를 알아서 만들어준다.)
    
- 구글, 페이스북, Github 등은 Provider를 작성하지 않아도 된다.
- 카카오, 네이버 등 국내 서비스 서버는 Provider 하위에 각각의 URI를 등록 시켜준다.
    - 카카오 인가 코드 요청 URI
    - 카카오 액세스 토큰 요청 URI
    - 카카오 내 정보 요청 URI

# 기타 사항

## CAUTIONS!!

- :8080, :8088 등의 포트로 직접 접근하는 것이 안된다면 인터넷 사용 기록을 지워봅시다.
- 시간 설정은 가급적 컨테이너에 해준다.
    - dockerfile에 지정해주거나, mysql 같은 경우에는 아래의 명령어 입력
    
    ```bash
    sudo rm /etc/localtime
    sudo ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime
    ```
    
- Jenkins에서 아래와 같은 오류가 뜬다면 EC2 내의 jenkins workspace로 가서 ./gradlew clean을 입력합니다
    
    ![Untitled](%5BFinal%5D%20How%20to%20Build%20CI%20CD/Untitled%2015.png)
    

## RETROSPECT

1. 테스트용 컨테이너 만들기
    1. dockerfile은 Dockerfile-prod, Dockerfile-xxx로 생성하여 build 시에 매핑 가능
    2. 그렇다면 nginx 설정은 어떻게?
    3. 현재는 테스트용 컨테이너를 dockerhub를 통해서 push한 후 서버에서 pull 받아서 사용]
        1. dockerfile 설정
            
            ```bash
            # 이미 실행중인 컨테이너가 있을 가능성이 높으므로 컨테이너 밖에 노출될
            # PORT를 변경해주는 것이 좋습니다.
            
            # ... OTHER SETTINGS FOR DOCKERFILE
            
            EXPOSE <TEST_PORT> # ex) 8081
            ```
            
        2. Client-side
            
            ```bash
            # console에서 docker 명령어를 쓰기 위해서는 docker desktop 실행 필수!! 
            # 반드시 dockerhub에 회원가입, 로그인 후 repository 생성
            
            docker login
            	
                Username : <YOUR_DOCKERHUB_ID>
                Password : <YOUR_DOCKERHUB_PASSWORD>
            
            # gradlew가 있는 폴더로 이동
            
            # gradlew 실행
            ./gradlew clean build --stacktrace
            
            # project-0.0.1-SNAPSHOT과 Dockerfile을 이용하여 docker file 이미지화
            docker build -t <YOUR_DOCKERHUB_ID>/<YOUR_DOCKERHUB_REPO_NAME> .
            
            # dockerhub에 push
            docker push <YOUR_DOCKERHUB_ID>/<YOUR_DOCKERHUB_REPO_NAME>
            ```
            
        3. Server-side
            
            ```bash
            # dockerhub로부터 테스트용 컨테이너 받아옴
            docker pull <YOUR_DOCKERHUB_ID>/<YOUR_DOCKERHUB_REPO_NAME>
            
            docker run --name <TEST_CONTAINER_NAME> -d -p <TEST_PORT>:8080 <YOUR_DOCKERHUB_ID>/<YOUR_DOCKERHUB_REPO_NAME>
            ```
2. hotfix/ 로 시작하는 branch 대응
   1. TBD..