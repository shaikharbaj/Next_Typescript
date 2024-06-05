"use client"
import EditAttributeValue from '@/app/screen/Admin/AttributeValue/EDIT/EditAttributeValue';
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const {id:attribute_id,attributevalue_id} = useParams();
  return (
    <>
      <EditAttributeValue attribute_id={Number(attribute_id)} attributevalue_id={Number(attributevalue_id)}/>
    </>
  )
}

export default page;