"use client"
import Loading from '@/app/components/Loading/Loading'
import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import useDebounce from '@/app/Hook/useDebounce';
import { deletebannerAsync, loadAllBannerswithpagination } from '@/app/Redux/features/Banner/bannerSlice';
import Pagination from '@/app/components/Pagination/Pagination';
import { successtoast } from '@/app/utils/alerts/alerts';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface IBanner {
  id: number,
  title: string,
  imageUrl: string
  description: string,
  start_date: string,
  end_date: string
}
const Banner = () => {
  const router = useRouter();
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
    if (confirm("are sure u want?")) {
      dispatch(deletebannerAsync(id)).unwrap().then((res) => {
        successtoast("banner deleted successfully")
      })
    }
  }

  function formatDate(date: Date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
  }
  useEffect(() => {
    dispatch(loadAllBannerswithpagination({ currentpage, searchTerm }))
  }, [debauncedValue, currentpage]);
  return (
    <>
      {loading && <Loading />}
      <div className={styles.wrapper}>
        <div className={`mt-5 mb-3 ${styles.inputbox}`}>
          <input type="text" onChange={handlesearch} value={searchTerm} placeholder='search something here.....' />
        </div>
        <div className={styles.add_btn_wrapper}>
          <button onClick={() => router.push("/admin/dashboard/banner/add")}>ADD BANNER</button>
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
                      <td className={styles.image}><img src={u?.imageUrl} alt="" /></td>
                      <td>{u?.title}</td>
                      <td>{u?.description?.length > 30 ? u.description.slice(0, 29) + "..." : u?.description}</td>
                      <td> {u?.start_date ? formatDate(new Date(u?.start_date)) : null}</td>
                      <td> {u?.end_date ? formatDate(new Date(u?.end_date)) : null}</td>
                      <td>
                        <Link href={`/admin/dashboard/banner/edit/${u.id}`}><i className='bx bxs-edit edit '></i></Link>
                        <span onClick={() => deletehandler(u?.id)}><i className='bx bxs-trash delete'></i></span>
                      </td>
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