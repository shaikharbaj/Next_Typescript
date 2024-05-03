import EditSubCategory from '@/app/screen/Admin/Category/SubCategory/Edit/EditCategory'
import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
    return (
        <>
            <EditSubCategory id={params.id} />
        </>
    )
}

export default page