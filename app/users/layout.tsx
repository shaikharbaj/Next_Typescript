import React from "react"
import Navbar from "../components/Navbar/Navbar"
import Protected from "../utils/LoaderWrapper"

export default function ProfileLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {/* <Protected> */}
            <Navbar />                                          
            {children}
            {/* </Protected> */}
        </>
    )
}