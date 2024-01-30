import React from "react";
// import { StrictMode, createRoot } from "react";
//import { BrowserRouter } from "react-router-dom";
import App from "./src/App.js";
//import ReactDOM from "react-dom";

//const container = document.getElementById("root");
//const root = createRoot(container);

// root.render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// );
// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   container
// );
import { createRoot } from "react-dom/client";
const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);
