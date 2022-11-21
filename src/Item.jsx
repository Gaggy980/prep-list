import React from 'react'
import {FaRegTrashAlt} from 'react-icons/fa'

const style = {
    li:`flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplete:`flex justify-between bg-slate-300 p-4 my-2 capitalize`,
    row:`flex`,
    chkbox:`w-[25px]`,
    text:`ml-2 cursor-pointer text-lg`,
    textComplete:`ml-2 cursor-pointer line-through text-lg`,
    btn:`cursor-pointer, flex, items-center w-[25px]`,



};


const Item = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <li className={todo.completed ? style.liComplete : style.li}>
        <div className={style.row}>
            <input onChange={() => toggleComplete(todo)} className={style.chkbox} type="checkbox" checked={todo.completed ? 'checked' : ''} />
            <p onClick={() => toggleComplete(todo)} className={todo.completed ? style.textComplete : style.text}>{todo.text}</p>
        </div>
        <button onClick={() => deleteTodo(todo.id)} className={style.btn}>{<FaRegTrashAlt size={20}/>}</button>

    </li>
  )
}

export default Item