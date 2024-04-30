"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { addbannerAsync } from '@/app/Redux/features/Banner/bannerSlice'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'
import { RootState } from '@/app/Redux/store'
import Loading from '@/app/components/Loading/Loading'
import { useRouter } from 'next/navigation'
import { addCategoryAsync, addsubCategoryAsync, loadCategoriesAsync } from '@/app/Redux/features/category/categorySlice'
const AddSubCategory = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { loading, categories } = useAppSelector((state: RootState) => state.category)
    const [parent_id, setParentId] = useState("");
    const [name, setName] = useState("");
    const submitHandler = () => {
        const payload = {
            parent_id,
            name
        }
        dispatch(addsubCategoryAsync(payload)).unwrap().then((res) => {
            router.replace("/admin/dashboard/categories");
            successtoast(res.message)
        }).catch((error) => {
            if (typeof (error) === "string") {
                errortoast(error);
            } else {
                console.log(error)
                // setError(error)
            }
        })
    }

    useEffect(() => {
        dispatch(loadCategoriesAsync());
    }, [])
    if (loading) {
        return <Loading />
    }
    return (
        <>
            <div className="container mt-3 mb-2">
                <div className="row gutters">
                    <div className="col-md-8 m-auto">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-12">
                                        <h6 className="mb-2 text-primary">Add Sub-Category</h6>
                                    </div>
                                    <div className="col-12 mb-2">
                                        <div className="form-group">
                                            <label htmlFor="fullName" className='mb-1'>Category</label>
                                            <select className='form-control' value={parent_id} onChange={(e) => setParentId(e.target.value)}>
                                                <option value="" hidden>select category</option>
                                                {
                                                    categories && categories.map((c: any) => {
                                                        return <option value={`${c.id}`}>{c?.name}</option>
                                                    })
                                                }
                                            </select>
                                            {/* {error?.title && <span className="error">{error.title}</span>} */}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="fullName" className='mb-1'>SubCategory</label>
                                            <input type="text" className="form-control" id="fullName" placeholder="Enter full name"
                                                value={name} onChange={(e) => setName(e.target.value)}
                                            />
                                            {/* {error?.title && <span className="error">{error.title}</span>} */}
                                        </div>
                                    </div>

                                </div>
                                <div className="row gutters mt-2">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right">
                                            <button type="button" id="submit" name="submit" className="btn btn-primary w-100" onClick={submitHandler} >ADD</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddSubCategory;