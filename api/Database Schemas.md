# Database Schemas

## Users

| **column name** | **data type** | **details**               | **references** |
| --------------- | ------------- | ------------------------- | -------------- |
| id              | integer       | not null, primary key     |                |
| username        | string        | not null, indexed, unique |                |
| email           | string        | not null, indexed, unique |                |
| password_digest | string        | not null                  |                |
| session_token   | string        | not null, indexed, unique |                |
| created_at      | datetime      | not null                  |                |
| updated_at      | datetime      | not null                  |                |
| posts[]         | int[]         |                           | posts          |
| berries[]       | int[]         |                           | berries        |

## Posts

| **column name** | **data type** | **details**                    | **references** |
| --------------- | ------------- | ------------------------------ | -------------- |
| id              | integer       | not null, primary key          |                |
| title           | string        | not null                       |                |
| body            | string        | not null                       |                |
| author_id       | integer       | not null, indexed, foreign key | users          |
| created_at      | datetime      | not null                       |                |
| updated_at      | datetime      | not null                       |                |
| category_id     | Integer       | not null, indexed, foreign key | categories     |
| tags[]          | int[]         |                                | tags           |
| reviews[]       | int[]         |                                | reviews        |

## Berries

| **column name** | **data type** | **details**                    | **references** |
| --------------- | ------------- | ------------------------------ | -------------- |
| id              | integer       | not null, primary key          |                |
| user_id         | integer       | not null, indexed, foreign key | users          |
| post_id         | integer       | not null, indexed, foreign key | posts          |
| created_at      | datetime      | not null                       |                |
| updated_at      | datetime      | not null                       |                |

## Tags

| **column name** | **data type** | **details**                    | **references** |
| --------------- | ------------- | ------------------------------ | -------------- |
| id              | integer       | not null, primary key          |                |
| post_id         | integer       | not null, indexed, foreign key | posts          |
| created_at      | datetime      | not null                       |                |
| updated_at      | datetime      | not null                       |                |

## Reviews

| **column name** | **data type** | **details**                    | **references** |
| --------------- | ------------- | ------------------------------ | -------------- |
| id              | integer       | not null, primary key          |                |
| user_id         | integer       | not null, indexed, foreign key | users          |
| post_id         | integer       | not null, indexed, foreign key | posts          |
| content         | string        | not null                       |                |
| created_at      | datetime      | not null                       |                |
| updated_at      | datetime      | not null                       |                |

## Categories

| **column name** | **data type** | **details**           | **references** |
| --------------- | ------------- | --------------------- | -------------- |
| id              | integer       | not null, primary key |                |
| category_name   | string        | not null              |                |
| posts[]         | int[]         | not null, foreign key | posts          |