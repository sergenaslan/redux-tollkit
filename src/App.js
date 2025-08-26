import React from "react";
import { Counter } from "./features/counter/Counter";
import  UserCard  from "./features/user/UserCard";

export default function App() {
  return (
    <div>
      <h1>Redux Toolkit Başlangıç</h1>
      <Counter />
      <UserCard />
    </div>
  );
}
