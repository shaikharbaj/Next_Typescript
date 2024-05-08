"use client"
import React, { useEffect, useState } from 'react'
import './blog.css';
import Navbar from '../components/Navbar/Navbar'
import { useAppDispatch, useAppSelector } from '../Hook/hooks'
import { RootState } from '../Redux/store'
import Loading from '../components/Loading/Loading'
import { getAllblogAsync } from '../Redux/features/blog/blogSlice'
import parser from 'html-react-parser'
import Link from 'next/link'
import { loadcategoryforFilter } from '../Redux/features/category/categorySlice';
const page = () => {
    const { loading, blogs } = useAppSelector((state: RootState) => state.blog);
    const { loading: categoryLoading, } = useAppSelector((state: RootState) => state.category);
    const [categoryData, setCategoryData] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState("");
    const dispatch = useAppDispatch();

    const handleCategoryToggle = (categoryId: number) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };
    useEffect(() => {
        dispatch(getAllblogAsync()).unwrap().then((res) => {
        });
        dispatch(loadcategoryforFilter()).unwrap().then((res) => {
            setCategoryData(res.data);
        })
    }, [])
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

        // <>
        //     <Navbar />
        //     <>
        //         <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">

        //             <div className="border-b mb-5 flex justify-between text-sm">
        //                 <div className="text-indigo-600 flex items-center pb-2 pr-2 border-b-2 border-indigo-600 uppercase">

        //                     <p className="font-semibold inline-block mb-0">BLogs</p>
        //                 </div>

        //             </div>

        //             {
        //                 blogs && blogs.length > 0 ? (
        //                     blogs.map((b: any) => {
        //                         return (
        //                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10" key={b.id}>  
        //                                 <div className="rounded overflow-hidden shadow-lg flex flex-col">
        //                                     <div className="relative">
        //                                         <img className="w-full" src={b.image} />
        //                                         <div className="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        //                                         <div className="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
        //                                             {b.category.name}
        //                                         </div>
        //                                     </div>
        //                                     <div className="px-6 py-4 mb-auto">
        //                                         <a href="#" className="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2">Simplest Salad Recipe ever</a>
        //                                         <p className="text-gray-500 text-sm">
        //                                             {parser((b?.description?.replace(/<[^>]*>/g, '') || '').slice(0, 60) +
        //                                                 (b?.description?.length > 60 ? "..." : ""))}
        //                                         </p>
        //                                         <Link className='btn w-100 read_more_btn' href={`/blog/${b.id}`}>Read More</Link>
        //                                     </div>
        //                                     <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        //                                         <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
        //                                             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="15px" height="15px" viewBox="0 0 30 30">
        //                                                 <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M16,16H7.995 C7.445,16,7,15.555,7,15.005v-0.011C7,14.445,7.445,14,7.995,14H14V5.995C14,5.445,14.445,5,14.995,5h0.011 C15.555,5,16,5.445,16,5.995V16z"></path>
        //                                             </svg>
        //                                             <span className="ml-1">{b?.createdAt && formatDate(new Date(b?.createdAt))}</span></span>

        //                                         <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
        //                                             <svg className="h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
        //                                             </svg>
        //                                             <span className="ml-1">Author: {b?.user?.name}</span></span>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         )
        //                     })

        //                 ) : <p>No Blog Available....!</p>
        //             }

        //         </div>
        //     </>
        // </>

        <>
            <div className="overlay" style={{ display: "none" }}></div>
            <div className="search-section">
                <div className="container-fluid container-xl">
                    <div className="row main-content ml-md-0">
                        <div className="sidebar col-md-3 px-0">
                            <h1 className="border-bottom filter-header d-flex d-md-none p-3 mb-0 align-items-center">
                                <span className="mr-2 filter-close-btn">
                                    X
                                </span>
                                Filters
                                <span className="ml-auto text-uppercase">Reset Filters</span>
                            </h1>
                            <div className="sidebar__inner ">
                                <div className="filter-body">
                                    {
                                        categoryData && categoryData.map((c: any) => {
                                            return (
                                                <div key={c.id}>
                                                    <input
                                                        type="checkbox"
                                                        className="custom-control-input"
                                                        id=""
                                                        checked={selectedCategories.includes(c.id)}
                                                        onChange={() => handleCategoryToggle(Number(c.id))}
                                                    />
                                                    <label htmlFor="">{c?.name}</label>
                                                    <div className="children" style={{ display: selectedCategories.includes(c.id) ? "block" : "none" }}>
                                                        <ul>
                                                            {
                                                                c.Category && c.Category.map((sub: any) => {
                                                                    return (
                                                                        <li key={sub.id}>{sub.name}</li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                        {/* <div className="content col-md-9">
        <div className="d-flex justify-content-between border-bottom align-items-center">
          <h2 className="title">Products</h2>
          <div className="filters-actions">
            <div>
              <button className="btn filter-btn d-md-none"><svg xmlns="http://www.w3.org/2000/svg" className="mr-2" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>
     Filter</button>
            </div>
            <div className="d-flex align-items-center">

              <div className="dropdown position-relative sort-drop">
                <button type="button" className="btn btn-transparent dropdown-toggle body-clr p-0 py-1 sm-font fw-400 sort-toggle" data-toggle="dropdown">
      <span className="mr-2 d-md-none">
<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><path d="M0,0h24 M24,24H0" fill="none"/><path d="M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>
</span>   
                  <span className="d-md-inline-block ml-md-2 font-semibold">Newest First</span>
                </button>
                <div className="dropdown-menu dropdown-menu-right p-0 no-caret">
                  <a className="dropdown-item selected" href="javascript:void(0)">Newest First</a>
                  <a className="dropdown-item" href="javascript:void(0)">Lowest First</a>
                  <a className="dropdown-item" href="javascript:void(0)">Highest First</a>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="row row-grid">
          <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>

 <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>


   <div className="col-md-6 col-lg-4 col-xl-4">
            <img src="https://dummyimage.com/300X400/000/fff" />
          </div>
  </div>
      </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page