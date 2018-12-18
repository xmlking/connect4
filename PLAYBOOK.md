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

# Add nestjs
npm i  @nestjs/{common,core,microservices,swagger,websockets,typeorm}
npm i helmet
npm i class-validator
npm i class-transformer

npm i -D jest ts-jest @types/jest supertest @types/supertest
npm i -D @types/socket.io
npm i -D @types/helmet
npm i -D @nestjs/testing
npm i -D @nestjs/schematics



# Add NGXS
npm i @ngxs/{store,storage-plugin,devtools-plugin}

# Add Socket.io
npm i socket.io-client
npm i -D @types/socket.io-client
```

> check versions

```bash
# check of nest installed
nest info
```
