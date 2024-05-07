import EditBlog from '@/app/screen/Admin/blog/EditBlog/EditBlog'
import React from 'react'

const page = ({params}:{params:{id:number}}) => {
  return (
        <EditBlog id={params.id}/>
  )
}

export default page