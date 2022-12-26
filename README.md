# chat-app-react

## Description
Web-based End-to-End Encrypted chat application in NodeJS using ReactJS with Vite as build tool and [Socket.io](https://socket.io/).
This uses [Diffie-Hellman Key Exchange](https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange) for secure exchange of keys and [AES](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) for encrypting messages.

## Tech used
*   NodeJS v18.12.1 (It should still work with other versions of node)
*   Vite
*   React
*   Mantine
*   TypeScript (Front-end only. Backend still uses vanilla JavaScript)
*   Socket.io

## Note
You can check the deployed version [here](https://chat-app-e2ee.netlify.app)
> This is just a working prototype, so bugs are everywhere. Improvements should be added in the future.

## To do
*   Improve application logic
*   Error handling on other parts
*   Clean up code / Refactor

## How to run
clone the repo
```
git clone https://github.com/Mulitt/chat-app-react.git
```
install dependencies
*   dependencies for front-end
*   ```
    cd client/
    ```
    ```
    npm install
    ```
*   dependencies for backend
*   ```
    cd server
    ```
    ```
    npm install
    ```
run front-end and backend
*   run front-end
*   ```
    npm run dev
    ```
*   run backend
*   ```
    npm run test
    ```
