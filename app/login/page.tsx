"use client";

import { useState } from "react";
import { Loader2, Phone, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phoneNumber: "", password: "" });

  if (isLoggedIn) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // placeholder: emulate async login
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b8cedc] via-sky-50 to-white py-12 px-4">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-[#173F5F] to-[#1a6b84] p-8">
          <div className="text-center text-white px-6">
            <Image
              src="/logo_icon.svg"
              alt="Azrar"
              width={140}
              height={70}
              className="mx-auto mb-6"
            />
            <h2 className="text-2xl font-semibold mb-2">Добро пожаловать!</h2>
            <p className="opacity-90">
              Войдите в свой аккаунт, чтобы получить доступ к нашим услугам
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Image src="/logo_dark.svg" alt="Azrar" width={120} height={60} />
            </div>

            <h1 className="text-2xl font-bold mb-2 text-center md:text-left">
              Вход в аккаунт
            </h1>
            <p className="text-sm text-gray-600 mb-6 text-center md:text-left">
              Войдите в свой аккаунт, чтобы получить доступ к нашим услугам
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-700">Номер телефона</span>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Phone size={16} />
                  </span>
                  <input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+998901234567"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        phoneNumber: e.target.value,
                      }))
                    }
                    required
                    className="w-full pl-10 pr-3 py-2 border rounded-md focus:ring-2 focus:ring-sky-300 focus:outline-none"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-gray-700">Пароль</span>
                <div className="mt-1 relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock size={16} />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, password: e.target.value }))
                    }
                    required
                    className="w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 focus:ring-sky-300 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span>Запомнить меня</span>
                </label>
                <a className="text-sky-600 hover:underline" href="#">
                  Забыли пароль?
                </a>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#173F5F] text-white py-2 rounded-md hover:brightness-105 disabled:opacity-60"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                Войти
              </button>

              <div className="pt-2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Или</span>
                  </div>
                </div>
                <Link
                  href={"/register"}
                  className="text-sky-600 hover:underline"
                >
                  Нет аккаунта? Зарегистрируйтесь
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
