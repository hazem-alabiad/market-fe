# Market

[![Netlify Status](https://api.netlify.com/api/v1/badges/313d5843-1ce3-4a19-a60d-ef6895bb2ea3/deploy-status)](https://app.netlify.com/sites/market-estore/deploys)

## Description

This is a simple market app that fetches live data with many e-stores features like sorting, filtering, and pagination.

## How to Install and Run the Project

1. Install [NVM](https://github.com/nvm-sh/nvm)
2. Clone the project `https://github.com/hazemalabiad/market-fe.git && cd market-fe`
3. Install node `nvm install && nvm use`
4. Check the running node version against the expected one in `nvmrc` by running `node -v`
5. Install `npm` globally `nvm i -g npm`
6. Install `yarn` by `npm i yarn`
7. Install dependencies by running `yarn install` or simply `yarn`
8. Run the project `yarn dev` ... and happy coding 😀🧑‍💻

### Testing
- The tests are implemented using `react testing library` and run by `vitest`
- Run the test suits `yarn test`
- Check the test coverage `yarn coverage`

## Project structure and design

- The BE server is deployed on https://github.com/hazemalabiad/market-be as a strand-alone app.
- The project follows the `feature` approach for files and folders placing. Also, it follows the nearest place approach (picking the closest logical place to where the feature is being imported).
- `FormatJS` is used to enable internationalized app.
- `redux-toolkit` is used to manage the state.
- `RTK Query` is used to achieve data fetching.
- Opinionated `eslint` rules are used to enhance the quality of the codebase.
- The babel plugin `babel-plugin-styled-components` is utilized to enhance the debugging experience.
