"use client"
import styles from './homepage.module.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '@/app/Hook/useDebounce';
import { loadproductAsync } from '@/app/Redux/features/Product/productSlice';
import Loading from '@/app/components/Loading/Loading';
import Pagination from '@/app/components/Pagination/Pagination';

type Payload = {
  currentpage: number,
  perPage: number,
  searchText: string
}
type ProductType = {
  id: string,
  title: string,
  description: string,
  price: string,
  brand: string,
  category: string
}
const HomePage = () => {
  const { userinfo } = useAppSelector((state) => state.auth);
  const { products, loading } = useAppSelector((state) => state.products);
  const [searchText, setSerchText] = useState('');
  const debauncedValue = useDebounce(searchText, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const payload: Payload = { currentpage, perPage, searchText }
    dispatch(loadproductAsync(payload));
  }, [debauncedValue, currentpage, perPage]);

  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSerchText(e.target.value);
  }


  return (
    <>
      {loading && <Loading/>}
      <div className={styles.wrapper}>
        <div className={`mt-3 mb-3 ${styles.inputbox}`}>
          <input type="text" onChange={handlesearch} value={searchText} placeholder='search something here.....' />
        </div>

        <table className={`table ${styles.custome_table} table-bordered`}>
          <thead>
            <tr>
              <th>SR.NO</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              products?.products?.length > 0 ? <>
                {
                  products.products.map((p: ProductType, i: number) => {
                    return <tr key={p.id}>
                      <td>{perPage*(currentpage-1) + (i+1)}</td>
                      <td>{p.title}</td>
                      <td>{p.description}</td>
                      <td>{p.price}</td>
                      <td>{p.brand}</td>
                      <td>{p.category}</td>
                    </tr>
                  })
                }
              </> : <>
                <tr>
                  <td colSpan={6}>No Data found</td>
                </tr>
              </>
            }
          </tbody>
        </table>
        <Pagination currentpage={currentpage} setCurrentPage={setCurrentPage} total={products?.total} perpage={perPage} />
      </div>
    </>

  )
}

export default HomePage;