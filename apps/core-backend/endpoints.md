`BASE_URL=http://localhost:5050`

# Generate OAuth Access_token

POST `{{BASE_URL}}/api/satusehat/oauth/generate`

# Application Auth

Base endpoint: `/api/auth`

## Register

POST `{{BASE_URL}}/api/auth/register`

## Login

POST `{{BASE_URL}}/api/auth/login`

## Logout

POST `{{BASE_URL}}/api/auth/logout`

## Verify Token

GET `{{BASE_URL}}/api/auth/verify`

# Satusehat Organization

## Create

POST `/api/satusehat/organization`
