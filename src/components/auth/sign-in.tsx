"use client";

import { MouseEvent, useEffect, useState } from "react";

import { setUser } from "@/store/features/auth/authSlice"; // Удалить
import { useAppDispatch } from "@/store/hooks"; // Удалить
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/store/features/auth/authApi";
import { toast } from "react-toastify";
import AuthInput from "../UI/auth-input";

export default function SignInForm({ setShowRegister }: any) {
  const [email, setEmail] = useState<string | any>("");
  const [password, setPassword] = useState<string | any>("");
  const router = useRouter();

  const dispatch = useAppDispatch();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSucces,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  async function loginHandler(e: MouseEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) {
      await loginUser({ email, password });
    }
  }

  useEffect(() => {
    if (isLoginSucces) {
      dispatch(setUser(loginData));
      setEmail("");
      setPassword("");
      toast.success("Вход успешен");
      router.back();
    }
  }, [isLoginSucces]);

  useEffect(() => {
    if (isLoginError) {
      toast.error((loginError as any).data.message);
    }
  }, [isLoginError]);

  return (
    <form
      onSubmit={loginHandler}
      className="max-w-sm rounded-lg p-6 mx-auto w-full flex flex-col gap-5 font-blender text-[25px]"
    >
      <h1 className="text-[25px] text-center uppercase mb-4">
        Вход
      </h1>

      <AuthInput
        value={email}
        onChange={(e: any) => setEmail(e.target.value)}
        type="email"
        id="signinEmail"
        placeholder="Email"
      />

      <AuthInput
        value={password}
        onChange={(e: any) => setPassword(e.target.value)}
        type="password"
        id="signinPassword"
        placeholder="Password"
      />

      <button
        type="submit"
        className="text-white text-[20px] bg-background hover:bg-hover rounded-lg px-4 py-3 ease-in duration-200 w-full mt-8"
      >
        Sign In
      </button>

      <h2 className="text-[20px]">
        Нет аккаунта?{" "}
        <a
          onClick={() => setShowRegister(true)}
          className="cursor-pointer hover:text-hover ease-out duration-200 font-bold"
        >
          {" "}
          Войти
        </a>
      </h2>
    </form>
  );
}