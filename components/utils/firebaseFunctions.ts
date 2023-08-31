import { collection, doc, addDoc, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { firestore } from "../utils/firebase"; // Firebase初期化が必要
import { Todo } from "./interface";

export const getAllTodos = async () => {
  const todosCollection = collection(firestore, "todo");
  const todosQuery = query(todosCollection);
  const querySnapshot = await getDocs(todosQuery);
  const todos: Todo[] = [];
  
  querySnapshot.forEach((doc) => {
    // todos.push({ id: doc.id, ...doc.data() });
    todos.push({ id: doc.id, title: doc.data().title });
  });

  return todos;
};

export const addTodo = async (title: string) => {
  const todosCollection = collection(firestore, "todo");
  await addDoc(todosCollection, { title: title });
};

export const deleteTodo = async (id: string) => {
  const todosCollection = collection(firestore, "todo");
  const todoDoc = doc(todosCollection, id);
  await deleteDoc(todoDoc);
};
