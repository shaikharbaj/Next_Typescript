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
import { deleteblogAsync, getAllblogAsync } from '@/app/Redux/features/blog/blogSlice';
import parser from 'html-react-parser'
interface IBlog {
  id: number,
  title: string,
  image: string
  description: string,
  createdAt: Date
}
const Banner = () => {
  const router = useRouter();
  const { loading, blogs } = useAppSelector(state => state.blog);
  const [searchTerm, setSerchText] = useState('');
  const debauncedValue = useDebounce(searchTerm, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useAppDispatch();

  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    // setSerchText(e.target.value);
  }
  const deletehandler = (id: number) => {
    if (confirm("are sure u want?")) {
      dispatch(deleteblogAsync(id)).unwrap().then((res) => {
        successtoast(res.message)
      }).catch((err) => {
        console.log(err);
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
    dispatch(getAllblogAsync());
  }, []);
  return (
    <>
      {loading && <Loading />}
      <div className={styles.wrapper}>
        <div className={`mt-5 mb-3 ${styles.inputbox}`}>
          <input type="text" onChange={handlesearch} value={searchTerm} placeholder='search something here.....' />
        </div>
        <div className={styles.add_btn_wrapper}>
          <button onClick={() => router.push("/admin/dashboard/blog/add")}>ADD Blog</button>
        </div>
        <table className={`table ${styles.custome_table} table-bordered`}>
          <thead>
            <tr>
              <th>SR.NO</th>
              <th>Image</th>
              <th>Title</th>
              {/* <th>Description</th> */}
              <th>Published Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              blogs?.length > 0 ? <>
                {
                  blogs.map((u: IBlog, i: number) => {
                    return <tr key={u.id}>
                      <td>{i + 1}</td>
                      <td className={styles.image}><img src={u?.image} alt="" /></td>
                      <td>{u?.title}</td>
                      {/* <td>{parser((u?.description?.replace(/<[^>]*>/g, '') || '').slice(0, 10) +
                        (u?.description?.length > 10 ? "..." : ""))}</td> */}

                      <td> {u?.createdAt ? formatDate(new Date(u?.createdAt)) : null}</td>
                      <td>
                        <Link href={`/admin/dashboard/blog/edit/${u.id}`}><i className='bx bxs-edit edit '></i></Link>
                        <span onClick={() => deletehandler(u?.id)}><i className='bx bxs-trash delete'></i></span>
                        <Link href={`/admin/dashboard/blog/${u.id}`} className='me-2'><i className='bx bx-show show'></i></Link>
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
        {/* <Pagination currentpage={currentpage} setCurrentPage={setCurrentPage} total={meta?.total} perpage={perPage} /> */}
      </div>
    </>
  )
}

export default Banner