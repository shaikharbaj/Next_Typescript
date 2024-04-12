import Image from "next/image";
import ProductCard from './components/ProductCard'
export default function Home() {
  return (
    <>
        <main className="p-2">
            <p>  Hello world</p>
            <ProductCard/>
        </main>
    </>
  );
}
