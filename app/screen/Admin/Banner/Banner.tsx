"use client"
import Loading from '@/app/components/Loading/Loading'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import useDebounce from '@/app/Hook/useDebounce';
import { deletebannerAsync, loadAllBanners } from '@/app/Redux/features/Banner/bannerSlice';
import Pagination from '@/app/components/Pagination/Pagination';
import { successtoast } from '@/app/utils/alerts/alerts';
interface IBanner {
  id: number,
  title: string,
  imageUrl: string
  description: string,
  start_date: Date,
  end_date: Date
}
const Banner = () => {
  const { banners, meta, loading } = useAppSelector(state => state.banner);
  const [searchTerm, setSerchText] = useState('');
  const debauncedValue = useDebounce(searchTerm, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useAppDispatch();

  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  }
  const deletehandler = (id: number) => {
    dispatch(deletebannerAsync(id)).unwrap().then((res) => {
      successtoast("banner deleted successfully")
    })
  }
  useEffect(() => {
    dispatch(loadAllBanners({ currentpage, searchTerm }))
  }, [debauncedValue, currentpage]);
  return (
    <>
      {loading && <Loading />}
      <div className={styles.wrapper}>
        <div className={`mt-5 mb-3 ${styles.inputbox}`}>
          <input type="text" onChange={handlesearch} value={searchTerm} placeholder='search something here.....' />
        </div>

        <table className={`table ${styles.custome_table} table-bordered`}>
          <thead>
            <tr>
              <th>SR.NO</th>
              <th>Image</th>
              <th>Title</th>
              <th>Description</th>
              <th>start date</th>
              <th>end date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              banners?.length > 0 ? <>
                {
                  banners.map((u: IBanner, i: number) => {
                    return <tr key={u.id}>
                      <td>{perPage * (currentpage - 1) + (i + 1)}</td>
                      <td><img src={u?.imageUrl} alt="" /></td>
                      <td>{u?.title}</td>
                      <td>{u?.description?.length > 30 ? u.description.slice(0, 29) + "..." : u?.description}</td>
                      <td> {u?.start_date ? new Date(u?.start_date).toLocaleDateString() : null}</td>
                      <td> {u?.end_date ? new Date(u?.end_date).toLocaleDateString() : null}</td>
                      <td><button className='btn btn-danger' onClick={() => deletehandler(u?.id)}>delete</button></td>
                    </tr>
                  })
                }
              </> : <>
                <tr>
                  <td colSpan={10}>No Data found</td>
                </tr>
              </>
            }
          </tbody>
        </table>
        <Pagination currentpage={currentpage} setCurrentPage={setCurrentPage} total={meta?.total} perpage={perPage} />
      </div>
    </>
  )
}

export default Banner