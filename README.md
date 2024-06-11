<h1 align="center">
  MERN Chat App AES Encryption
</h1>
<p align="center">
  ReactJS, NodeJS, ExpressJS, MongoDB, AES Encryption
</p>

<img align="center" src="https://firebasestorage.googleapis.com/v0/b/licenseproject-c2773.appspot.com/o/mern.png?alt=media&token=3ec9ebdd-6476-4ae2-b172-7fcb635c072d" />

# Tech stack
MERN Chat App AES Encryption uses a number of open source projects to work properly:
* [ReactJS](https://reactjs.org/) - a JavaScript library for building user interfaces.
* [NodeJS](https://nodejs.org/) - is an open-source, server-side JavaScript runtime environment that allows you to run JavaScript code on the server.
* [ExpressJS](https://expressjs.com/) - is a popular web application framework for Node.js. It provides a set of features and tools that simplify the process of building web applications and APIs.
* [MongoDB](https://www.mongodb.com/) - a document-oriented, No-SQL database used to store the application data.

# Installation
MERN Chat App AES Encryption application requires [Node.js](https://nodejs.org/) to run.

### Clone the repositories
```sh
$ git clone https://github.com/catalyn98/MERN-Chat-App-AES-Encryption.git
```

### Set environment variables 
To set up your project, follow these steps:
1. Create a *.env* file in the following directories: the *backend api* folder, the *frontend-user* folder, and the *frontend-admin* folder, this file will store your environment variables.
2. Create a MongoDB database and obtain the connection string provided by MongoDB for connecting to your database.
3. Create a Firebase project and obtain the Firebase connection string.

### Install the dependencies:
Start the server:
```sh
$ npm run build 
$ npm start 
```

Start the frontend:
```sh
$ cd frontend
$ npm run dev
```

# Web application screenshots 
| **Register screen** | **Login Screen** | **Start screen** |
| :-----------------: | :--------------: | :--------------: |
| ![Register Screen](https://github.com/catalyn98/MERN-Chat-App-AES-Encryption/blob/main/screenshoots/2.Sign%20up%20AES-256.png) | ![Login Screen](https://github.com/catalyn98/MERN-Chat-App-AES-Encryption/blob/main/screenshoots/1.Login%20AES-256.png) | ![Start Screen](https://github.com/catalyn98/MERN-Chat-App-AES-Encryption/blob/main/screenshoots/3.Homepage%201.png) |
| **Conversation screen** | | |
| ![Conversation Screen](https://github.com/catalyn98/MERN-Chat-App-AES-Encryption/blob/main/screenshoots/4.Homepage%202.png) | | |

# Advanced Encryption Standard
The Advanced Encryption Standard (AES) is a specification for the encryption of electronic data established by the U.S. National Institute of Standards and Technology (NIST) in 2001. AES is a symmetric key encryption technique, which means the same key is used for both encrypting and decrypting the data. It was designed to be a replacement for the older Data Encryption Standard (DES) and has since become the standard for secure data encryption worldwide.
AES operates on blocks of data and is capable of using cryptographic keys of 128, 192, and 256 bits to encrypt and decrypt data in blocks of 128 bits. The process involves several rounds of data transformation, the number of which depends on the key length: 10 rounds for 128-bit keys, 12 rounds for 192-bit keys, and 14 rounds for 256-bit keys. Each round consists of several steps, including substitution, permutation, mixing, and key addition.
AES is widely used in various applications, from securing confidential data to encrypting internet communications, and is considered very secure against all currently feasible attacks. It has been analyzed extensively and is an encryption standard endorsed by many organizations and governments around the world.
