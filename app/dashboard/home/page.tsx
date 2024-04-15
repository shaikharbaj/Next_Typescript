"use client"
import styles from './homepage.module.css'
import { useRouter } from 'next/navigation'
const HomePage = () => {
  const {push} = useRouter();
  const gotoprofile=()=>{
         push("/profile");
  }
  return (
    <div className={styles.wrapper}>
    <h1>Welcome TO Dashboard</h1>
    <button onClick={()=>gotoprofile()}>GO TO Profile</button>
  </div>
  )
}

export default HomePage;