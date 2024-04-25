import React from 'react'
import './suspended.css'
import Link from 'next/link'
const page = () => {
  return (
    <>
      <div className="suspended_wrapper">
        <div className="flex-center position-ref full-height">
          <div className="content">
            <div className="title m-b-md">
              Account Suspended
            </div>
            <h2 className="m-b-md">
              This Account has been suspended. Contact your hosting provider for more information.
            </h2>
            <div className="links">
              <Link href="http://localhost:3000">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page