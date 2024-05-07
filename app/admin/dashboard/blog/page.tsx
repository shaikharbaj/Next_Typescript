import React from 'react'
import Link from 'next/link'
import './blog.css'
const page = () => {
  return (
    <>
       <section className='dashboard'>
             <div className="container dashboard_container">
                   <div className="dashboard_post-info">
                        <div className="dashboard_post-thumbnail">
                             <img src="" alt="" />
                        </div>
                        <button>ADD BLOG</button>
                        <h5>Post Title</h5>
                        <div className="dashboard_post-action">
                               <Link href={"/"} className='btn sm'>View</Link>
                               <Link href={"/"} className='btn sm-primary'>View</Link>
                               <Link href={"/"} className="btn sm ">View</Link>
                        </div>
                   </div>
             </div>
       </section>
    </>
  )
}

export default page