"use client"
import Image from "next/image";
import ProductCard from './components/ProductCard/ProductCard'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard/home")
  }, []);
  return (
    <>
      <main className="p-2">
        <p>  Hello world</p>
        {/* <ProductCard/> */}
      </main>
    </>
  );
}
