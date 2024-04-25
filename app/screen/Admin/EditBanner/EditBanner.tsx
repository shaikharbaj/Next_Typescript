"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from "./styles.module.css"
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { addbannerAsync, editbannerAsync, loadBannerByIdAsync } from '@/app/Redux/features/Banner/bannerSlice'
import { errortoast, successtoast } from '@/app/utils/alerts/alerts'
import { RootState } from '@/app/Redux/store'
import Loading from '@/app/components/Loading/Loading'
import { useRouter } from 'next/navigation'

const EditBanner = ({ editid }: { editid: number }) => {
  const id = editid;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state: RootState) => state.banner)
  const [banner, setBanner] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const currentDate = new Date().toISOString().split('T')[0];
  const HandleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imageFile = event.target.files[0];
      setBanner(imageFile);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(imageFile);
    }

  }
  const submitHandler = () => {
    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("description", description);
    formdata.append("start_date", start_date);
    formdata.append("end_date", end_date);
    if (banner) {
      formdata.append("banner", banner);
    }
    dispatch(editbannerAsync({ id, formdata })).unwrap().then((res) => {
      setBanner(null)
      const s_date = res?.data?.start_date?.split('T')[0];
      setStartDate(s_date);
      const e_date = res?.data?.end_date?.split('T')[0];
      setEndDate(e_date)
      setTitle(res?.data?.title)
      setDescription(res?.data?.description);
      setImagePreview(res?.data?.imageUrl);
      successtoast("banner updated successfully..!")
    }).catch((error) => {
      console.log(error);
    })
  }
  const loadBannerById = async (id: number) => {
    dispatch(loadBannerByIdAsync(id)).unwrap().then((res) => {
      const s_date = res?.start_date?.split('T')[0];
      setStartDate(s_date);
      const e_date = res?.end_date?.split('T')[0];
      setEndDate(e_date)
      setTitle(res?.title)
      setDescription(res?.description);
      setImagePreview(res?.imageUrl)

    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    loadBannerById(id);
  }, []);
  return (
    <>
      <div className="container mt-3 mb-2">
        <div className="row gutters">
          <div className="col-md-8 m-auto">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Edit Banner</h6>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="fullName" className='mb-1'>Title</label>
                      <input type="text" className="form-control" id="fullName" placeholder="Enter full name"
                        value={title} onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-2">
                    <div className="form-group">
                      <label htmlFor="eMail" className='mb-1'>Description</label>
                      <textarea className={`form-control ${styles.textarea}`} id="eMail" placeholder="Enter email ID"
                        value={description} onChange={(e) => setDescription(e.target.value)}
                      >
                      </textarea>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="phone" className='mb-1'>start date</label>
                      <input type="date" className="form-control" id="phone" placeholder="Enter phone number"
                        value={start_date} onChange={(e) => setStartDate(e.target.value)}
                      />
                      {/* {error?.phone_number && <span className="error">{error.phone_number}</span>} */}

                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label htmlFor="website" className='mb-1'>end date</label>
                      <input type="date" className="form-control" id="website" placeholder="end date"
                        value={end_date} onChange={(e) => setEndDate(e.target.value)}
                      />

                    </div>
                  </div>
                </div>
                <div className="row gutters mt-3">
                  <div className="col-12">
                    <div className="form-group">
                      <input type="file" accept="image/*" className={styles.input} id="profile" onChange={HandleFileChange} />
                      <div className={styles.change_profile}>
                        <label htmlFor="profile" className={styles.label}>Choose Image<i className='bx bxs-camera camera_icon ms-2'></i></label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gutters mt-2">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="text-right">
                      <button type="button" id="submit" name="submit" className="btn btn-primary w-100" onClick={submitHandler} disabled={loading}>{loading ? "loading" : "Edit Banner"}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.preview_image_wrapper}>
        {
          imagePreview && <img src={imagePreview} alt="" className={`img-fluid ${styles.preview_image}`} />
        }
      </div>
    </>
  )
}

export default EditBanner;