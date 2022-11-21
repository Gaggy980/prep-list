import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Item from "./Item";
import { db } from "./assets/firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-br from-[#240b36] to-[#c31432]`,
  conteiner: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4  `,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between `,
  input: `border p-2 w-full text-xl`,
  btn: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("please enter some item to continue.");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  //read todo
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const usubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => usubscribe();
  }, []);

  //update todo
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //delete todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  return (
    <div className={style.bg}>
      <div className={style.conteiner}>
        <h2 className={style.heading}>Prep List</h2>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className={style.input}
            placeholder="Add item to prep"
          />
          <button className={style.btn}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Item
              key={index}
              todo={todo}
              toggleComplete={toggleComplete}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>
        {todos.length < 1 ? null : 
          <p className={style.count}>
            {`you have ${todos.length} items to prep`}
          </p>
        }
      </div>
    </div>
  );
}

export default App;
