# API

Deploying connect4 API

### Build

```bash
# build app docker image
docker build --tag=connect4-api -f .deploy/api/Dockerfile .
```

### Run

```bash
docker-compose up api
# docker run -it --env TYPEORM_HOST=postgres -p 3000:3000  connect4-api
# to see ditectory content:
docker-compose exec api ./node
docker-compose exec api ./node -e 'console.log(__dirname);'
docker-compose exec api ./node -e 'const fs = require('fs'); fs.readdirSync('.').forEach(file => { console.log(file);})
```

### Test

> The app will be available at http://localhost:3000

```bash
# test
curl -v -X GET \
  http://localhost:3000/api/game \
| jq .
```

### Deploy

#### Docker Push

```bash
# login to hub.docker.com to push docker image
docker login

# tag
docker tag connect4-api xmlking/connect4-api:1.0.0-SNAPSHOT
docker tag xmlking/connect4-api:1.2.0-SNAPSHOT  xmlking/connect4-api:latest

# push
docker push xmlking/connect4-api:1.2.0-SNAPSHOT
docker push xmlking/connect4-api:latest
```
