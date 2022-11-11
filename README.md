## Tests

- make sure that you have the `.env.test` file filled properly
- create the testing database container by running: 
```
docker-compose --env-test=.env.test up -d
```
- run the tests: `node ace test`