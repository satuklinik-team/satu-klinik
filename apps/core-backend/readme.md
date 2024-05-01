# Initial setup project

1. Install docker
2. Go to `apps/core-backend` directory
3. Run `docker-compose -f docker-compose-dev.yaml -p satuklinik up -d`
4. Run `npx prisma migrate dev`

# Run Project

There is 2 way to run the backend

The first way is through root repo and run: `yarn core:dev`
The second way is through project directory and run: `yarn start:dev`

# Commit message rule

`action(app_dir/feature): simple self explain message`

Example: You are done creating clinic feature, your message should look like this: `feat(apps/core-backend/clinic): init clinic endpoints`

- `chore` -> nambah logic / ngubah logic yang gak terlalu ngaruh banyak ke feature
- `feat` -> penambahan feature baru
- `fix` -> fixing bug
- `refactor` -> refactor logic

# Branch name

Example: You are refactoring clinics endpoint, your branch should look like this: `refactor/create-clinics-improve-logic`

# Pull Request

From feature branch, you should open PR into `development`, after that your code will be reviewed and then you don't need to worry about further steps

- Title: refactor: create clinics improve logic
- Description:
  ...

silly note:

 - `chore` -> `:cactus:`
 - `feat` -> `:cake:`
 - `fix` -> `:wrench:`