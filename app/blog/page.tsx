"use client"
import React, { useEffect, useState } from 'react'
import './blog.css';
import Navbar from '../components/Navbar/Navbar'
import { useAppDispatch, useAppSelector } from '../Hook/hooks'
import { RootState } from '../Redux/store'
import Loading from '../components/Loading/Loading'
import { getAllblogAsync, getblogwithfilterAsync } from '../Redux/features/blog/blogSlice'
import parser from 'html-react-parser'
import Link from 'next/link'
import { loadcategoryforFilter } from '../Redux/features/category/categorySlice';

interface IgetblogwithfilterPayload{
    selectedCategoryString:[],
    selectedsubcategoryString:[]
}
const page = () => {
    const [toggle_sidebar, setToggleSidebar] = useState(false);
    const { loading, blogs } = useAppSelector((state: RootState) => state.blog);
    const { loading: categoryLoading, } = useAppSelector((state: RootState) => state.category);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState<any>([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState<any>([]);
    const dispatch = useAppDispatch();

    const handleCategoryToggle = (categoryId: string) => {
        if (selectedCategories.includes(categoryId)) {
            const updatedCategories = selectedCategories.filter((id: any) => id !== categoryId);
            deselectChildCategories(categoryId, updatedCategories);
            setSelectedCategories(updatedCategories);
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };
    const handleSubcategoryToggle = (subcategoryId: string) => {
        if (selectedSubcategories.includes(subcategoryId)) {
            setSelectedSubcategories(selectedSubcategories.filter((id: any) => id !== subcategoryId));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategoryId]);
        }
    };

    const deselectChildCategories = (parentId: any, updatedCategories: any) => {
        const parentCategory: any = categoryData.find((category: any) => category.id === parentId);
        if (parentCategory && parentCategory.Category) {
            parentCategory.Category.forEach((childCategory: any) => {
                if (updatedCategories.includes(childCategory.id)) {
                    const index = updatedCategories.indexOf(childCategory.id);
                    updatedCategories.splice(index, 1);
                    deselectChildCategories(childCategory.id, updatedCategories);
                }
            });
        }
    };

    useEffect(() => {
        dispatch(loadcategoryforFilter()).unwrap().then((res) => {
            setCategoryData(res.data);
        })
    }, []);
    useEffect(() => {
        const selectedCategoryString=selectedCategories.join(",");
        const selectedsubcategoryString=selectedSubcategories.join(",");
        console.log(selectedCategoryString)
        console.log(selectedsubcategoryString)
        const payload:IgetblogwithfilterPayload={
              selectedCategoryString,
              selectedsubcategoryString
        }
        dispatch(getblogwithfilterAsync(payload)).unwrap().then((res) => {
        });
    }, [selectedCategories,selectedSubcategories]);
    if (loading || categoryLoading) {
        return <Loading />
    }
    function formatDate(date: Date) {
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = date.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
    }
    return (
        <>
            <Navbar />
            <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setToggleSidebar(!toggle_sidebar)}>
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>
            {
                toggle_sidebar && (
                    <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
                            <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" onClick={() => setToggleSidebar(!toggle_sidebar)}>
                                <span className="sr-only">Open sidebar</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                                </svg>
                            </button>
                            <ul className="space-y-2 font-medium">
                                {
                                    categoryData && categoryData.map((c: any) => {
                                        return (
                                            <div className='mb-4'>
                                                <div className="flex items-center mb-1" key={c.id}>
                                                    <input id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        checked={selectedCategories.includes(c.id)}
                                                        onChange={() => handleCategoryToggle((c.id))}
                                                    />
                                                    <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">{c?.name}</label>


                                                </div>
                                                <div className="children" style={{ display: selectedCategories.includes(c.id) ? "block" : "none" }}>
                                                    <ul>
                                                        {
                                                            c.Category && c.Category.map((sub: any) => {
                                                                return (
                                                                    <li key={sub.id}>
                                                                        <input
                                                                            type="checkbox"
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            id=""
                                                                            checked={selectedSubcategories.includes(sub.id)}
                                                                            onChange={() => handleSubcategoryToggle(sub.id)}
                                                                        />
                                                                        <label htmlFor="" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600">{sub?.name}</label>
                                                                    </li>

                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>

                                            </div>
                                        )
                                    })
                                }
                            </ul>

                        </div>
                    </aside>
                )
            }



            <>
                <div className={toggle_sidebar ? "p-4 sm:ml-64" : "p-4"}>
                    <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
                        <div className="border-b mb-5 flex justify-between text-sm">
                            <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">

                                <p className="font-semibold inline-block mb-0">BLogs</p>
                            </div>

                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" >
                            {
                                blogs && blogs.length > 0 ? (
                                    blogs.map((b: any) => {
                                        return (

                                            <div className="rounded overflow-hidden shadow-lg flex flex-col" key={b.id}>
                                                <div className="relative">
                                                    <img className="w-full blog_img" src={b.image} />
                                                    <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
                                                    <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                                                        {b.category.name}
                                                    </div>
                                                </div>
                                                <div className="px-6 py-4 mb-auto">
                                                    <p className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-1">{b?.title}</p>
                                                    <p className="text-gray-500 text-sm">
                                                        {parser((b?.description?.replace(/<[^>]*>/g, '') || '').slice(0, 60) +
                                                            (b?.description?.length > 60 ? "..." : ""))}
                                                    </p>
                                                    <Link className='btn w-100 read_more_btn' href={`/blog/${b.id}`}>Read More</Link>
                                                </div>
                                                <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
                                                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30 30">
                                                            <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,16H7.995 C7.445,16,7,15.555,7,15.005v-0.011C7,14.445,7.445,14,7.995,14H14V5.995C14,5.445,14.445,5,14.995,5h0.011 C15.555,5,16,5.445,16,5.995V16z"></path>
                                                        </svg>
                                                        <span className="ml-1">{b?.createdAt && formatDate(new Date(b?.createdAt))}</span></span>

                                                    <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
                                                        <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                                                        </svg>
                                                        <span className="ml-1">Author: {b?.user?.name}</span></span>
                                                </div>
                                            </div>

                                        )
                                    })

                                ) : <p>No Blog Available....!</p>
                            }
                        </div>
                    </div>
                </div>
            </>


        </>
    )
}

export default page