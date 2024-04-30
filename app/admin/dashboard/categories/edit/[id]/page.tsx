import EditCategory from '@/app/screen/Admin/Category/Edit/EditCategory'
import React from 'react'

const page = ({params}:{params:{id:number}}) => {
    return (
        <>
            <EditCategory id={params.id}/>
        </>
    )
}

export default page