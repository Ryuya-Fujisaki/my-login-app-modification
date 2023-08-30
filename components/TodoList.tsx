"use client"

import React from 'react'
import { Todo } from './utils/interface';
import { deleteTodo, getAllTodos } from './utils/firebaseFunctions';
import styles from '../styles/Home.module.css'

type Props = {
    todos: Todo[];
    setTodos: React.Dispatch<any>;
}

const TodoList = (props: Props) => {
    const { todos, setTodos } = props;


    const handleDelete = async (id: string) => {
        await deleteTodo(id); // 文字列として渡す
        let todos = await getAllTodos();
        setTodos(todos);
    }

    return (
        <div>
            <ul className='mx-auto'>
                {todos.map((todo) => (
                    <div
                        key={todo.id}
                        className={styles.todoArray}
                    >
                        <li className={styles.todoTitle}>{todo.title}</li>
                        <span className={styles.deleteButton} onClick={() => handleDelete(todo.id)}>削除</span>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default TodoList