import ViewBlog from '@/app/screen/Admin/blog/ViewBlog/ViewBlog'
import React from 'react'

const page = ({params}:{params:{id:number}}) => {
  return (
    <>
         <ViewBlog id={params.id}/>
    </>
  )
}

export default page