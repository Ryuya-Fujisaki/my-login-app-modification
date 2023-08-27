import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuth, useUser } from "../hooks/firebase";
import { useRouter } from "next/router";
import { Button, FormLabel, Input } from "@chakra-ui/react";

export default function Login() {
  /* ↓state変数を定義 */
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const auth = useAuth();
  const currentUser = useUser();
  const router = useRouter();

  /* ↓関数「handleSubmit」を定義 */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      alert("メールアドレスまたはパスワードが間違っています");
    }
  };

  /* ↓ログインを判定する設定 */
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  });

  useEffect(() => {
    if (currentUser) router.push("/");
  }, [currentUser, router]);

  return (
    <>
      <FormLabel fontWeight="bold" >ログインページ</FormLabel>
      <form onSubmit={handleSubmit} >
        <div>
          <label>メールアドレス</label>
          {/* ↓「value」と「onChange」を追加 */}
          <Input
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          {/* ↓「value」と「onChange」を追加 */}
          <Input
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          color="white"
          background="gray.800"
          size="lg"
          paddingX="80px"
          m="0 auto"
          _hover={{
            background: "gray.700",
          }}
        >
          ログイン
        </Button>
      </form>
    </>
  );
}
