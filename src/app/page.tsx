'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  router.push('/pages/account')
  return (
    <h1>
      Главная страница
      <button>account</button>
    </h1>
  );
}
