import Footer from '@/app/admin/layout/Dashboard/Footer/Footer'
import Navbar from '@/app/components/Navbar/Navbar'
import ViewBlog from '@/app/screen/Admin/blog/ViewBlog/ViewBlog'
import React from 'react'

const page = ({ params }: { params: { id: number } }) => {
    return (
        <>
            <Navbar />
            <ViewBlog id={params.id} />
            <Footer />
        </>
    )
}

export default page