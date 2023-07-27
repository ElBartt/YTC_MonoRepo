/*
   This code is licensed under the Creative Commons Attribution-NonCommercial License (CC BY-NC).
   For more information, please refer to the license file or visit: https://creativecommons.org/licenses/by-nc/4.0/
*/

// import app from './app';

// // Set the port number
// const port = 1234;

// // Start the server
// app.listen(port, () => {
//   console.log(`🚀 Server is up and running on port ${port}! Thank you for using our app! 🙌`);
//   console.log(`🔗 http://localhost:${port}/api-docs/`);
//   console.log(''); // Empty line
// });

import { Extraction } from "./tools/ytc_extraction";

const extraction = new Extraction();
extraction.Start();
