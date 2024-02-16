# Chat Server

A simple chat server built with Node.js and Socket.io.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API](#api)
- [Docker Usage](#docker-usage)

## Installation

1. Clone the repository: `git clone https://github.com/your-username/project-name.git`
2. Install the dependencies: `npm install`

## Environment Variables

- `PORT`: The port number for the server to listen on. Default is `3000`.
- `DB_CONNECTION`: The URI for the MongoDB database

## Usage

1. Run the project: `npm start`
2. Open your browser and visit `http://localhost:3000`

## API

- `/api/users`
  - [POST] `/getUser`
  - [POST] `/updateNickname`
  - [GET] `/getTotalUsers`
- `/api/messages`
  - [GET] `/getAllMessages`

## Docker Usage

1. Build the Docker image: `docker build -t chat-server .`
2. Run the Docker container: `docker run --name DockerChat -e DB_CONNECTION="mongo URI" -e PORT=3000 -p 3000:3000 chat-server`
