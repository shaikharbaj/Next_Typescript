"use client"
import React, { useEffect, useState } from 'react'
import './view.css'
import parser from 'html-react-parser'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { RootState } from '@/app/Redux/store';
import Loader from '@/app/components/Loader/Loader';
import { loadblogbyID } from '@/app/Redux/features/blog/blogSlice';
import { formatDate } from '@/app/utils/date/date';
const ViewBlog = ({ id }: { id: number }) => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector((state: RootState) => state.blog);
    const [blog, setBlog] = useState<any>({});

    useEffect(() => {
        dispatch(loadblogbyID(Number(id))).unwrap().then((res) => {
            console.log(res)
            setBlog(res.data);
        }).catch((error) => {
            console.log(error)
        })
    }, [])
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-12">
                        <article>
                            {/* <!-- Post header--> */}
                            <header className="mb-4">
                                {/* <!-- Post title--> */}
                                <h1 className="fw-bolder mb-1">{blog?.title}</h1>
                                {/* <!-- Post meta content--> */}
                                <div className="text-muted fst-italic mb-2">Posted on {formatDate(blog?.createdAt)}   - AUTHOR <span className='blog_author'>{blog?.user?.email}</span></div>
                                {/* <!-- Post categories--> */}
                                <a className="badge bg-secondary text-decoration-none link-light me-2" href="#!" >{blog?.category?.name}</a>
                            </header>
                            {/* <!-- Preview image figure--> */}
                            <figure className="mb-4"><img className="img-fluid rounded" src={blog?.image} alt="..." /></figure>
                            {/* <!-- Post content--> */}
                            <section className="mb-5">
                                {
                                    blog?.description && parser(blog?.description)
                                }
                            </section>
                        </article>

                    </div>

                </div>
            </div>
        </>
    )
}

export default ViewBlog