'use client'
import { api } from '@/app/api'
// import api from '@/app/api'
import { Notification, Button, Center, Flex, Paper, PasswordInput, TextInput, Affix } from '@mantine/core'
import { useRouter } from 'next/navigation'
// import { useForm } from '@mantine/form'
// import { IconX } from '@tabler/icons-react'
// import { useMutation } from '@tanstack/react-query'
import { Dispatch, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();


  const fetchData = async () => {
    const response = await fetch('/api/revalidate', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer your-jwt-token',
      },
    });
    const result = await response.json();
    // setData(result);
    // alert(result)
    console.log(result);
    console.log(result.data);
    // alert(data)
  };




  useEffect(() => {
    // fetchData(); 
    // Проверка сессии при монтировании компонента
    const session = localStorage.getItem('session');
    if (session) {
      // Если сессия есть, проверяем ее валидность
      const parsedSession = JSON.parse(session);
      // fetchData();
      if (new Date(parsedSession.expire).getTime() > new Date().getTime()) {
        console.log(parsedSession)
        api.currentAccount = parsedSession; // Устанавливаем текущий аккаунт
        setIsAuth(true); // Устанавливаем флаг аутентификации
        // router.push('/account')
      } else {
        // Если токен просрочен, удаляем сессию
        logout();
      }
    } else {
      router.push('/'); // Если нет сессии, перенаправляем на страницу логина
    }
  }, []);

  function logout() {
    setIsAuth(false);
    localStorage.removeItem('session');
    api.currentAccount = null;
    router.push('/login'); // Перенаправляем на логин
  }
  return <>{isAuth ? children : <Login setIsAuth={setIsAuth} />}</>
}

interface FormValues {
  email: string
  password: string
}

interface LoginProps {
  setIsAuth: Dispatch<boolean>
}

export const Login = ({ setIsAuth }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.createSession(email, password);
      if (response) {
        localStorage.setItem('session', JSON.stringify(response))
        setIsAuth(true)
      }
      console.log(response)
      // Сохраняем сессию (токен, время истечения и т.д.)
      // localStorage.setItem('session', JSON.stringify(response.data));
      setIsAuth(true); // Устанавливаем пользователя как авторизованного
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export { AuthProvider }
