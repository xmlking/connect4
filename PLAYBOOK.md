# DIY Playbook

Do-it-yourself step-by-step instructions to create this project structure from scratch.

### Prerequisites

> you need following tools. versions listed here are minimal versions tested.

| Software             | Version | Optional |
| -------------------- | ------- | -------- |
| Node                 | v11.4.0 |          |
| NPM                  | v6.5.0  |          |
| Angular CLI          | v7.1.3  |          |
| @nrwl/schematics     | v7.1.1  |          |
| @nestjs/cli          | v5.7.1  |          |
| typescript           | v4.1.0  |          |



### Scaffold Project

```bash
# generate workspace
create-nx-workspace  connect4 --prefix=xmlking --npm-scope=xmlking --package-manager=npm

# generate webapp app
ng g app webapp --style=scss --prefix=xmlking --unit-test-runner=jest --e2e-test-runner=cypress --tags=app-module -- --experimental-ivy

# generate api app with nestjs
ng g node-app api --framework=express --unit-test-runner=jest --tags=api-module
```

#### Dependencies

> adding 3rd party modules/libs

```bash
npm install -g typescript

# Add nestjs
npm i  @nestjs/{common,core,microservices,swagger,websockets,typeorm,passport}
npm i helmet
npm i nest-router
npm i class-validator
npm i class-transformer
npm i passport passport-http-bearer

npm i -D jest ts-jest @types/jest supertest @types/supertest
npm i -D @types/socket.io
npm i -D @types/helmet
npm i -D @nestjs/testing
npm i -D @nestjs/schematics



# Add NGXS
npm i @ngxs/{store,router-plugin,storage-plugin,devtools-plugin}
npm i -D @ngxs/schematics

# Add Socket.io
npm i socket.io-client
npm i -D @types/socket.io-client
npm i @ngx-starter-kit/socketio-plugin

npm i date-fns@next
```

> check versions

```bash
ng --version
nest info
```

#### Generate Artifacts

> webapp
```bash
# material module 
ng g lib material --spec=false --tags=shared-module --unit-test-runner=jest -d
# core module 
ng g lib core --tags=core-module --unit-test-runner=jest -d
ng g @ngxs/schematics:store --name=store/user --spec=false --sourceRoot=libs/core/src/lib -d
ng g service  services/user  --flat false --project=core -d

# models module 
ng g lib models --module false --tags=utils --unit-test-runner=jest -d
ng g interface MatchSettings  --project=models --type=model -d
ng g interface Match  --project=models --type=model -d
ng g class Board  --project=models --type=model -d
ng g interface Player  --project=models --type=model -d
ng g interface Players  --project=models --type=model -d
ng g enum PlayerRole --project=models --type=enum -d
ng g enum PlayerValue --project=models --type=enum -d
ng g enum MatchStatus --project=models --type=enum -d
ng g interface CreateMatchDto  --project=models --type=model -d
ng g interface User  --project=models --type=model -d

# game module 
ng g lib game --tags=layout,child-module  --unit-test-runner=jest --prefix=ngx  -d
ng g component containers/gameLayout  --project=game -d
ng g component components/PlayerNameDialog --project=game --entry-component -d
ng g component containers/game --project=game -d
ng g component components/PlayersHud --project=game -d
ng g component components/ActionHud --project=game -d
ng g component components/Board --project=game -d
ng g component containers/start --project=game -d
ng g component components/CreateMatch --project=game -d
ng g component components/JoinMatch --project=game -d

ng g service  services/game --project=game -d
ng g module services/gameService --project=game --flat  -d
# ng g @ngxs/schematics:store --name=connect --spec --project=game -d
ng g @ngxs/schematics:store --name=store/game --spec=false --sourceRoot=libs/game/src/lib -d
```

> api
```bash
# scaffold auth module
nest g module app/auth  --dry-run
nest g controller auth app/auth --flat --dry-run
nest g service auth app/auth --flat --dry-run
nest g class user.entity app/auth --no-spec --dry-run
nest g class auth.exception app/auth --no-spec --dry-run

# scaffold game module
nest g module app/game  --dry-run
nest g controller match app/game  --dry-run
nest g service match app/game --dry-run
nest g class match/match.entity app/game --no-spec --dry-run
```


### Run
```bash
docker-compose up postgres
ng serve api
ng serve webapp
```
