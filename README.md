# Maze Runner Website

<img width="1120" alt="Screenshot 2023-11-13 at 10 35 42" src="https://github.com/Lennartstachowiak/maze-runner-website/assets/73605417/f925984b-1e8c-42fc-9d12-fd731e699585">

#### Table of Contents

- [Description](#description)
- [Getting Started](#started)
- [Running with Docker (recommended)](#docker)
  - [Prerequisites](#prerequisitesdocker)
  - [Installation](#installation)
  - [Setting up the environment](#envdocker)
  - [Running the application](#rundocker)
- [Running with yarn or npm](#yarnnpm)
  - [Prerequisites](#prerequisitesyarnnpm)
  - [Installation](#installationyarnnpm)
  - [Running the application](#runyarnnpm)

---

## Description <a name="description"></a>

This is the website for [Maze Runner Backend](https://github.com/Lennartstachowiak/maze-runner-api). To interact with the website you also need to run the backend.
On the website the user can interact with they algorithms and mazes. The user can edit algorithms and create new algorithms, can create new mazes, can solve mazes and compete against others in the highscore list.

- The website is build with the frameworks [React](https://react.dev/), [Next.js](https://nextjs.org/) and [Typescript](https://www.typescriptlang.org/) as language.

# Getting Started <a name="started"></a>

You can run the programm locally in two different ways.

- Running with **Docker** (recommended)
- Running with **yarn** or **npm**

## Running with **Docker** (recommended) <a name="docker"></a>

### Prerequisites <a name="prerequisitesdocker"></a>

- **Docker**
  - It is a platform that allows you to package, distribute, and run applications using containers.

### Tested versions

- **Docker** version 24.0.6, build ed223bc

  - Check with

        docker -v

- **Docker Compose** version v2.22.0-desktop.2

  - Check with:

        docker-compose -v

### Installation <a name="installation"></a>

To use Docker with this project, you'll need to have Docker installed on your system. If you haven't installed Docker yet, follow these steps:

1.  Visit the Docker website: https://www.docker.com

2.  Download the installer for your operating system (e.g., Docker Desktop for Windows, Docker Desktop for macOS, Docker Engine for Linux).

3.  Run the installer and follow the on-screen instructions to complete the installation.

4.  Once the installation is complete, start the Docker application.

> 💡 For detailed installation instructions and system requirements, please refer to the official Docker documentation.

### Setting up the environment <a name="envdocker"></a>

You need to create a `.env` file in the root directory and need to add some the endpoint for the backend:

    NEXT_PUBLIC_API_ENDPOINT=http://127.0.0.1:5000

### Running the application <a name="rundocker"></a>

In root directory run:

    docker compose up

This command will set up everything for you automatically.

**Now you are ready to go!** 🚀

The website runs in the development mode.\
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

---

## Running with **yarn** or **npm** <a name="yarnnpm"></a>

### Prerequisites <a name="prerequisitesyarnnpm">

- `yarn` or `npm`

> 💡 `npm` and `yarn` are package managers used in JavaScript development to install and manage project dependencies efficiently from a central registry.

### Installation (Only one needed) <a name="installationyarnnpm"></a>

- yarn
  - Check out the official website of [yarn](https://yarnpkg.com/) to install it for your operating system.
- npm
  - Check out the official website of [npm](https://www.npmjs.com/) to install it for your operating system.

#### Installing packages

##### Yarn

    yarn install

##### npm

    npm install

### Running the application <a name="runyarnnpm"></a>

##### Yarn

    yarn dev

##### npm

    npm run dev

**Now you are ready to go!** 🚀

The website runs in the development mode.\
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.
