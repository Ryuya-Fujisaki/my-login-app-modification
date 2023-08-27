import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useAuth, useUser } from '../hooks/firebase';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const currentUser = useUser();
  const router = useRouter();

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

  return (
    <div className={styles.container}>
      <h1 style={{ fontWeight: '900', fontSize: '24px' }}>マイページ</h1>
      <p>{user?.email}</p>
      <button className={styles.button} onClick={logout} >ログアウト</button>



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
