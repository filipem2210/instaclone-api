<h1 align="center">Instaclone API</h1>

<p align="center">Instagram clone with backend, frontend and mobile using Node.js, React and React Native</p>

## :computer: Technologies

* [Node.js](https://nodejs.org/en/)
* [Express](https://www.npmjs.com/package/express)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [Body Parser](https://www.npmjs.com/package/body-parser)
* [Celebrate](https://www.npmjs.com/package/celebrate)
* [Compression](https://www.npmjs.com/package/compression)
* [Cors](https://www.npmjs.com/package/cors)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit)
* [Helmet](https://www.npmjs.com/package/helmet)
* [JWT](https://www.npmjs.com/package/jsonwebtoken)
* [Morgan](https://www.npmjs.com/package/morgan)
* [Multer](https://www.npmjs.com/package/multer)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [PostgreSQL](https://www.npmjs.com/package/pg)
* [Sendgrid](https://www.npmjs.com/package/@sendgrid/mail)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Sharp](https://www.npmjs.com/package/sharp)
* [Socket.io](https://www.npmjs.com/package/socket.io)
* [VS Code](https://code.visualstudio.com/) with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## :information_source: How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js v12.16.3](https://nodejs.org/en/) or higher, [Yarn v1.22.4](https://yarnpkg.com/) or higher and [PostgreSQL v12](https://www.postgresql.org/) or higher installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/filipem2210/instaclone-api

# Go into the repository
$ cd instaclone-api

# Install dependencies
$ yarn install

# Rename .env.example file to .env and change the environment variables
# Install OpenSSL (https://chocolatey.org/packages/OpenSSL.Light)
# Run the commands below, with the same SECRET_KEY from .env file:
$ openssl genrsa -des3 -out private.pem 2048
$ openssl rsa -in private.pem -outform PEM -pubout -out public.pem

# Run the app
$ yarn start
```

## :memo: License

This project is under the MIT license. See the [LICENSE](https://github.com/filipem2210/instaclone-api/blob/master/LICENSE) for more information.

## :mortar_board: Author

| [<img src="https://avatars0.githubusercontent.com/u/47154367?s=115&u=193d66853bbf18dc0536b05ad10740931fa68642&v=4"><br><sub>@filipem2210</sub>](https://github.com/filipem2210) |
| :---: |
