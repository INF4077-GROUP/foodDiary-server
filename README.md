# FoodDiary

foodDiary is an application to collect and predict food for its users

## Start application

### step 1: Clone the project

```
get clone https://github.com/INF4077-GROUP/foodDiary-server.git
```

### step 2: Download, install and run neo4j desktop locally

You can download [Here](https://neo4j.com/download/?ref=get-started-dropdown-cta)

### step 3: Create a DBMS on neo4j

create a DBMS with the name `foodDiary-dbms` and start it

### step 4: Setup the .env file

create a `.env` file in a root of the project with the the given credentials

```
DATABASE_SCHEME=YOUR_SCHEME
DATABASE_HOST=localhost
DATABASE_PORT=YOUR_PORT
DATABASE_USERNAME=YOUR_USER_NAME
DATABASE_PASSWORD=YOUR_DBMS_PASSWORD
```

### step 5: Start the application

Once the database is launched, you can start the application with the following command.

```
npm run start:dev
```

or

```
yarn run start:dev
```

That's all ✨✨
