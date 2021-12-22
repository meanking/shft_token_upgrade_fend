# Token upgrade Front-End

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

This repo is an interface for shyft staking contract.

## Features
- Check current reward balance
- Check deposit amount
- Deposit/Harvest/Withdraw actions

## Technical instructions
- [Typescript](https://www.typescriptlang.org/docs/)
- [SASS](https://sass-lang.com/documentation)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [@web3-react/core](https://www.npmjs.com/package/@web3-react/core)
- [ethersproject](https://github.com/ethers-io/ethers.js/)
- [Context API](https://reactjs.org/docs/context.html)
- [Tslint](https://palantir.github.io/tslint/rules/completed-docs/)

## Required global installation
- Project requires [Node.js](https://nodejs.org/) v12+ to run.
- Project requires using [yarn](https://yarnpkg.com/lang/en/docs/install/) for the package version management.

## Installation

Install the dependencies and devDependencies and start the server.

```sh
yarn install
```

## Environment setting

To properly run the project, we should figure out env files

```sh
REACT_APP_RPC_URL_BSCMAIN=https://bsc-dataseed.binance.org/ 
REACT_APP_RPC_URL_RINKEBY=https://mainnet.infura.io/v3/6e67197573904e1486999a75454b69da
REACT_APP_RPC_URL_HOMESTEAD=https://mainnet.infura.io/v3/74934b1a6e0046c1b48f42c4ca6a9c58
REACT_APP_SHYFT_LP=0xba28c4d95d1050d29ad11fbbbd1ee1f66939d431
REACT_APP_SHYFT_TOKEN_V1=0xcba3eae7f55d0f423af43cc85e67ab0fbf87b61c
REACT_APP_SHYFT_TOKEN_V2=0xb17c88bda07d28b3838e0c1de6a30eafbcf52d85
REACT_APP_SHYFT_CONTRACT=0x89Ea73272c1c88041D08C222Fac2961836aB3dDc
```

In development environment, in order to prevent the failing with eslint errors, we should set like this.

```sh
ESLINT_NO_DEV_ERRORS=true
```

## Running the project on Development mode

Please run the following command to run the project on console.

```sh
yarn start
```

## Running the project on Production mode

Please run the following command to run the project on console.

```sh
yarn build
```
