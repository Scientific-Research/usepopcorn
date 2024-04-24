import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'
// import './index.css'
import { StarRating } from "./components/StarRating";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} color="#fcc419" size={48} />
    <StarRating maxRating={5} color="red" size={24} />
    {/* <StarRating maxRating={10} /> */}
    {/* we have to define default value in Typescript as undefined, it doesn't accept null as default value! */}
    {/* <StarRating maxRating={undefined} /> */}
  </React.StrictMode>
);
