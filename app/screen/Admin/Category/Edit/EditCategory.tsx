"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { addbannerAsync } from '@/app/Redux/features/Banner/bannerSlice'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'
import { RootState } from '@/app/Redux/store'
import Loading from '@/app/components/Loading/Loading'
import { useRouter } from 'next/navigation'
import { addCategoryAsync, editcategoryAsync, getcategoryById } from '@/app/Redux/features/category/categorySlice'
const EditCategory = ({ id }: { id: number }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState("");

  const submitHandler = () => {
    const payload = {
      name,
      id
    }
    dispatch(editcategoryAsync(payload)).unwrap().then((res) => {
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
    dispatch(getcategoryById(id)).unwrap().then((res) => {
      setName(res.data.name);
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <div className="container mt-3 mb-2">
        <div className="row gutters">
          <div className="col-md-8 m-auto">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Edit Category</h6>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="fullName" className='mb-1'>Name</label>
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

export default EditCategory;