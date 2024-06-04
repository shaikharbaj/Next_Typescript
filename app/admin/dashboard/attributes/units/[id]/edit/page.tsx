"use client"
import Edit from '@/app/screen/Admin/AttributeUnits/Edit/Edit';
import { useParams} from 'next/navigation';
import React from 'react'

const page = () => {
    const { id } = useParams();
    console.log(id);
//   const { id } = router.query;
  return (
    <>
        <Edit id={Number(id)}/>
    </>
  )
}

export default page