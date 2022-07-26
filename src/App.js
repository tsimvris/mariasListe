import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { saveToLocalStorage, loadFromLocalStorage } from "./lib/LocalStorage/";
import "./styles.css";
console.clear();
export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState(loadFromLocalStorage("My Todos") ?? []);

  useEffect(() => {
    saveToLocalStorage("My Todos", todos);
  });

  return (
    <div className="App">
      <h1 className="title">Maria's Einkaufsliste</h1>
      <form
        className="form"
        autoComplete="off"
        htmlFor="todo"
        onSubmit={(event) => {
          event.preventDefault();
          setTodos([...todos, { name: inputValue, id: nanoid() }]);
          setInputValue("");
        }}
      >
        <input
          required
          type="text"
          id="todo"
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />

        <button className="addButton">Add</button>
      </form>
      <ul className="todoUl">
        {todos.map((todo) => {
          return (
            <>
              <li className="todoLi" key={todo.id}>
                {todo.name}
                <button
                  key={todo.id}
                  type="button"
                  className="deleteButton"
                  onClick={() => {
                    setTodos(todos.filter((Item) => Item.id !== todo.id));
                  }}
                >
                  Delete
                </button>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}
