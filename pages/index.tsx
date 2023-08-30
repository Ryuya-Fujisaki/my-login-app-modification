import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuth, useUser } from '../components/utils/firebase';
import { useRouter } from 'next/router';
import TodoList from '../components/TodoList';
import { addTodo, getAllTodos } from '../components/utils/firebaseFunctions';
import { User as FirebaseUser } from 'firebase/auth';


const Home: NextPage = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const auth = useAuth();
  const currentUser = useUser();
  const router = useRouter();
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<string>("");

  /* ↓ログインしているかどうかを判定する */
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  /* ↓関数「logout」を定義 */
  const logout = async () => {
    await signOut(auth);
    router.push("/login/");
  }

  useEffect(() => {
    const getTodos = async () => {
      const todos = await getAllTodos();
      setTodos(todos);
      console.log(todos);
    }
    getTodos();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (title === "") return;

    //Todoの追加
    await addTodo(title);
    let todos = await getAllTodos();
    setTodos(todos);

    setTitle("");
  };

  return (
    <div className={styles.container}>
      <h1 style={{ fontWeight: '900', fontSize: '24px' }}>FirebaseのAuthentificationと<br />Firestoreを活用したTODOリスト</h1>
      <p>{user?.email}</p>
      <div className={styles.code}>
        <h3>TODOの入力はこちら↓</h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            className={styles.todoTitle}
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button className={styles.button} >
            追加
          </button>
        </form>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
      <button style={{ marginTop: '40px' }} className={styles.button} onClick={logout} >ログアウト</button>
      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
