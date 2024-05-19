"use client"
import Edit from '@/app/screen/supplier/Products/Edit/Edit'
import React from 'react'
interface IEditPageProps {
    params: { id: number }
}
const EditPage: React.FC<IEditPageProps> = ({ params }) => {
    return (
        <>
            <Edit id={params.id}/>
        </>
    )
}

export default EditPage