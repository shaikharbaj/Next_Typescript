// "use client"
// import { useEffect,useState } from 'react'
import React from 'react'
interface User {
    id: number;
    name: string;
}
const UsersPage =  async() => {
    // const [users,setUsers] = useState([]);
    // const fetchuser=async()=>{
    //         const response = await fetch('https://jsonplaceholder.typicode.com/users')
    //         const user = await response.json();
    //         setUsers(user)
    // }
    // useEffect(()=>{
    //          fetchuser();
    // },[])
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    return (
        <>
            <h1>Users</h1>
            <ul>
                {
                    users?.map((u)=><li>{u.name}</li>)
                }
            </ul>
        </>
    )
}

export default UsersPage