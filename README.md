## Getting Started

### Requirements
- **Node.js:** The application has been tested to work on Node version 16 & 18.
- **OS:** The application was built on macOS and should be able to run on macOS and Linux without issues. If you run into issues launching the application on Windows please reach out!

### Installation & Startup
1. Clone down this repository and cd into the new directory:
```shell
git clone https://github.com/jonathanhaviv/postmanTakehome.git

cd postmanTakeHome
```
2. Install dependencies:
```shell
npm install
```
3. You can either run a production build or a development build.
    * To run a production build run the following command from within the project directory:
    ```shell
    npm start
    ```
    * If you're having issues running the open command try to run the command with superuser privileges or run `npm start` and open the file `dist/index.html` in your browser.
    * To run a development build run the following command from within the project directory:
    ```shell
    npm run dev
    ```