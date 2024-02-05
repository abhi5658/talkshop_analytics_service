# talkshop_analytics_service

## APIs
### Post service
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/11273162-39463a32-fff1-4d03-bfba-e82bbc7c4419?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D11273162-39463a32-fff1-4d03-bfba-e82bbc7c4419%26entityType%3Dcollection%26workspaceId%3D23b2cc40-0e40-4074-9f28-d84c3c95dc5b)

1. **_GET_** `/api/v1/posts/:id/analysis` - Retrieves word count of specific post and average word count of all post
1. **_POST_** `/api/v1/posts` - Creates a new post with a caption

## Server Notes

- The server is running with [nodemon](https://nodemon.io/) which will automatically restart for you when you modify and save a file.

- The database provider is SQLite, which will store data in a file local to your repository called `database.sqlite3`. The ORM [Sequelize](http://docs.sequelizejs.com/) is on top of it. You should only have to interact with Sequelize

- The server is running on port 3001.

## Understanding project structure
- `src/routes` contains all the routes or path of the application
- `src/controllers` contains all the controllers attached to paths are places in
- `src/middleware` contains all the middlewares
- `src/services` contains independent functions to perform different actions on DB or get data from DB
- `tests/unit` contains unit tests for all services
- `tests/integration` cantains all the controller level or API integration tests

## Testing the application 🎮
- Run tests ✅
```sh
npm run test
```
- Setup and start the application ▶️
```sh
npm run seed
npm run start
```
- Open Postman
  - Import `postman_collection.json` from this repo to test out the post analytics service
  - Run all the request to test out all applications

## Scalability Considerations:

1. Consider how to handle large amounts of post data and high request volumes.
    - In Post request we can asynchronously create data via event pipeline and create them later

1. Think about how you could parallelize or distribute the analysis computation.
    -  Cron job can be used for generating global analysis like at 5 min interval and update the cache.
    - As data will increase, data processing can be segrated based on ids and processed and merged at the end

## Asumptioms
- Cache is in memory cache which will be moved to Redis
- Rate limiting can be based on user ID and IP both and moving from in-memory to Redis based cache