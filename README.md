# GoGoYonder 
## An [EyeCue Lab](https://eyecuelab.com)   Internship Project, March 2022
### A road trip planning application 


#### Created By: 
_**Kim Brannian**_ [LinkedIn](https://www.linkedin.com/in/kim-brannian/)/[GitHub](https://github.com/kimberkay)  
 _**Ella Tanttu**_ [LinkedIn](https://www.linkedin.com/in/ellatanttu/)/[GitHub](https://github.com/ellajtanttu)  
 _**Jeff Lai**_ [LinkedIn](https://www.linkedin.com/in/jefflai94/)/[GitHub](https://github.com/popoyuyu)  
 _**Jacob Wilson**_ [LinkedIn](https://www.linkedin.com/in/jacob-lee-eugene-wilson/)/[GitHub](https://github.com/JLEWilson)  

#### Under Mentorship of:
[EyeCue Lab](https://eyecuelab.com)   
 Aaron Ross, aaron.ross@eyecuelab.com  
 Jeremy Banka, jeremy.banka@eyecuelab.com  
 Elly Maimon, eliran.maimon@eyecuelab.com  

## Technologies Used

- [Fly app deployment](https://fly.io) with [Docker](https://www.docker.com/)
- Production-ready [SQLite Database](https://sqlite.org)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/) and [styled-components](https://styled-components.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)
- Maps and Stops build using [Google-Maps-Platform](https://developers.google.com/maps)

## Description
A remix.run application that assists in the planning and organization of road trips. The user is able to initialize a trip and invite other users to assist in the planning of said trip.
All users are able to view a home page that displays their active trip as well as a new trip creation form, a trips page that displays all pending, created, and accepted trips, a map layout of your active trips stops, and a profile page.
As the owner of the trip you are able to view/edit trip details, delete the trip, add/delete/reorder stops, and add attendees.
As an attendee on a trip you are able to add attendees and stops.
On a trip you are able to add and check off items on a packing list, Add and view expenses related to that trip, and select a random user on the trip for decision making purposes.


## Environments
 - [Staging](https://gogoyonder-staging.fly.dev/)
 - [Production](https://gogoyonder.fly.dev/)

 ## Setup/Installation Requirements

_Steps outlined assume installation of [npm](https://www.npmjs.com/)_

Step 1: Clone the project
 - _You can find the github repository [here](https://github.com/eyecuelab/internship-march-2022/tree/dev)_
- _Click the code button, and copy the https link_
- _In your in git bash or your preferred git terminal navigate to the directory you would like to store the project_
- _Enter: `git clone` followed by the https link_
- _Now that the repository is cloned to your computer, right click on the folder and click open with vs code_
Step 2: Install Dependencies.
* _Now type `npm install` in your terminal to install the packages used in the project_
* _You can now view the project by typing `npm run start` in your terminal_
Step 3: Initialize/Seed database
* _You can initialize the database from our models with the command `npx prisma db push`_
* _If you would like to use our development seed data run the command `npx prisma db seed`_

The database comes seeded with 4 users and accompanying trips:
Usernames: kim@test, jeff@test, ella@test, and jacob@test
Password: testtest for all usernames

## Endpoints
| Rout            | Description |
| :-----------:   | :-----------: |
| /               | Landing Page|
| /join           | Registration form     |
| /login          | Sign in form |        
| /home           | Create trip form with a link to your active trip |
| /trips          | A list view of all owned, accepted and pending trips |
| /trips/{tripId} | Trip Dashboard layout (not natively navigable ) |
| /trips/{tripId}/attendees | Trip attendees and links to features |
| /trips/{tripId}/stops | Editable list of stops |
| /trips/{tripId}/stops/new | Search Google Places Api and add stops |
| /trips/{tripId}/packing-list | Checklist for packing items |
| /trips/{tripId}/packing-list/new | Modal/Form for new packing list items |
| /trips/{tripId}/expenses | List of trip expenses and totals |
| /trips/{tripId}/expenses/new| Modal/Form for new trip expenses |
| /trips/{tripId}/decider | Choose a random user(for decision making) |
| /map            | A map of your current or upcoming trip |  
| /profile        | Profile details and completed trips |  
| /profile/edit   | Edit form for profile details |  


<details>
    <summary>Remix Template README</summary>
## Built on the Remix Indie Stack

![The Remix Indie Stack](https://repository-images.githubusercontent.com/465924157/a241fa49-bd4d-485a-a2a5-5cb8e4ee0abf)

Learn more about [Remix Stacks](https://remix.run/stacks)

```
npx create-remix --template remix-run/indie-stack
```

### What's in the stack

- [Fly app deployment](https://fly.io) with [Docker](https://www.docker.com/)
- Production-ready [SQLite Database](https://sqlite.org)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

Not a fan of bits of the stack? Fork it, change it, and use `npx create-remix --template your/repo`! Make it your own.

### Development

- Initial setup: _If you just generated this project, this step has been done for you._

  ```sh
  npm run setup
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

The database seed script creates a new user with some data you can use to get started:

- Email: `rachel@remix.run`
- Password: `rachelIsCool`

#### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

### Deployment

This Remix Stack comes with two GitHub Actions that handle automatically deploying your app to production and staging environments.

Prior to your first deployment, you'll need to do a few things:

- [Install Fly](https://fly.io/docs/getting-started/installing-flyctl/)

- Sign up and log in to Fly

  ```sh
  fly auth signup
  ```

  > **Note:** If you have more than one Fly account, ensure that you are signed into the same account in the Fly CLI as you are in the browser. In your terminal, run `fly auth whoami` and ensure the email matches the Fly account signed into the browser.

- Create two apps on Fly, one for staging and one for production:

  ```sh
  fly create gogoyonder
  fly create gogoyonder-staging
  ```

  - Initialize Git.

  ```sh
  git init
  ```

- Create a new [GitHub Repository](https://repo.new), and then add it as the remote for your project. **Do not push your app yet!**

  ```sh
  git remote add origin <ORIGIN_URL>
  ```

- Add a `FLY_API_TOKEN` to your GitHub repo. To do this, go to your user settings on Fly and create a new [token](https://web.fly.io/user/personal_access_tokens/new), then add it to [your repo secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) with the name `FLY_API_TOKEN`.

- Add a `SESSION_SECRET` to your fly app secrets, to do this you can run the following commands:

  ```sh
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app gogoyonder
  fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app gogoyonder-staging
  ```

  If you don't have openssl installed, you can also use [1password](https://1password.com/generate-password) to generate a random secret, just replace `$(openssl rand -hex 32)` with the generated secret.

- Create a persistent volume for the sqlite database for both your staging and production environments. Run the following:

  ```sh
  fly volumes create data --size 1 --app gogoyonder
  fly volumes create data --size 1 --app gogoyonder-staging
  ```

Now that every is set up you can commit and push your changes to your repo. Every commit to your `main` branch will trigger a deployment to your production environment, and every commit to your `dev` branch will trigger a deployment to your staging environment.

If you run into any issues deploying to Fly, make sure you've followed all of the steps above and if you have, then post as many details about your deployment (including your app name) to [the Fly support community](https://community.fly.io). They're normally pretty responsive over there and hopefully can help resolve any of your deployment issues and questions.

### GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

### Dependency Management

[Renovate Bot](https://github.com/renovatebot/renovate) helps manage dependency updates through the [Github App](https://github.com/apps/renovate) integration. The bot should automatically generate pull requests for dependency updates. Its configuration is managed via [renovate.json](/renovate.json).

### Testing

#### Cypress

We use Cypress for our End-to-End tests in this project. You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run `npm run test:e2e:dev` which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login()
// you are now logged in as a new user
```

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser()
})
```

That way, we can keep your local db clean and keep your tests isolated from one another.

#### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

#### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

#### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

#### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
</details>