"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const Dashboard = () => {
  const router = useRouter();
  const addproduct = () => {
    router.push("/supplier/dashboard/product/add")
  }
  return (
    <>
      <div>Dashboard</div>
      <button className='btn btn-primary' onClick={addproduct}> ADD PRODUCT</button>
    </>
  )
}

export default Dashboard