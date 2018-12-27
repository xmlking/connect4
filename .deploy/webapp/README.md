# WebApp

Dockerize Angular WebApp

> use [nginxconfig](https://nginxconfig.io/) to generate `nginx.conf`

### Deploy

#### Build Nginx

> Build and publish custom nginx image for OpenShift (One time only)

```bash
docker build -t openshift-nginx -f .deploy/webapp/nginx.dockerfile .
docker tag openshift-nginx xmlking/openshift-nginx:1.14-alpine
docker push xmlking/openshift-nginx

# also tag as `latest` and push
docker tag xmlking/openshift-nginx:1.14-alpine xmlking/openshift-nginx:latest
docker push xmlking/openshift-nginx:latest
```

#### Build App

> Build connect4 docker image

```bash
# build app docker image
docker build --tag=connect4 -f .deploy/webapp/prod.dockerfile .
```

#### Docker Push

> Push connect4 docker image

```bash
# login to hub.docker.com to push docker image
docker login

# tag
docker tag connect4 xmlking/connect4:1.0.0-SNAPSHOT
docker tag xmlking/connect4:1.0.0-SNAPSHOT  xmlking/connect4:latest

# push
docker push xmlking/connect4:1.0.0-SNAPSHOT
docker push xmlking/connect4:latest
```

### Run

Run docker locally for testing.

```bash
docker run -it  -p 4200:8080 -v .deploy/webapp/nginx.conf:/etc/nginx/conf.d/nginx.conf cockpit
```

The app will be available at http://localhost:4200

You can tweak the nginx config `nginx.conf` for your specific needs.

### SSH

```bash
# SSH to the running container (CONTAINER ID from `docker ps` command)
docker exec -it <CONTAINER ID> sh
# if you started via docker-compose
docker-compose exec web sh
```
