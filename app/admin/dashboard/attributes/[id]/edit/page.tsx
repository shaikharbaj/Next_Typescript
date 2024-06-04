"use client"
import EditAttributes from '@/app/screen/Admin/attributes/EditAttributes/EditAttributes';
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
    const { id } = useParams();
  return (
     <>
       <EditAttributes id={Number(id)}/>
     </>
  )
}

export default page