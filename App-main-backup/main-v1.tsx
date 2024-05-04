import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'
// import './index.css'
import { StarRating } from "../src/components/StarRating";
import { Test } from "../src/components/StarRating";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      color="#fcc419"
      size={48}
      className=""
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating={3}
      onSetRating={function (rating: number): void {}}
    />
    <StarRating
      maxRating={5}
      defaultRating={3}
      color="red"
      size={24}
      className="test"
      messages={[]}
      onSetRating={function (rating: number): void {}}
    />
    {/* <StarRating maxRating={10} /> */}
    {/* we have to define default value in Typescript as undefined, it doesn't accept null as default value! */}
    {/* <StarRating maxRating={undefined} /> */}
    {/* <Test rating={0} /> */}
    <Test defaultRating={3} />
  </React.StrictMode>
);
