"use client"
import styles from './homepage.module.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks';
import { useRouter } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react';
import useDebounce from '@/app/Hook/useDebounce';
// import { loadproductAsync } from '@/app/Redux/features/Product/productSlice';
import Loading from '@/app/components/Loading/Loading';
import Pagination from '@/app/components/Pagination/Pagination';
import { loadAllBanners } from '@/app/Redux/features/Banner/bannerSlice';

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
  const { products, loading } = useAppSelector((state) => state.products);
  const { allbanners } = useAppSelector((state) => state.banner);
  const [searchText, setSerchText] = useState('');
  const debauncedValue = useDebounce(searchText, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const payload: Payload = { currentpage, perPage, searchText }
    // dispatch(loadproductAsync(payload));
    dispatch(loadAllBanners())
  }, [debauncedValue, currentpage, perPage]);

  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1);
    setSerchText(e.target.value);
  }


  return (
    <>
      {loading && <Loading />}
      <>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {
              allbanners.map((banner: any, i: number) => {
                return (
                  <div className={`carousel-item ${i == 0 ? "active" : ""}`} key={banner.id}>
                    <div className={`${styles['image-overlay']}`}></div> {/* Add overlay */}
                    <img src={banner.imageUrl} className={`d-block w-100`} alt="..." />
                    <div className="carousel-caption modify-caption">
                      <h5 className={styles.title}>{banner?.title}</h5>
                      <p className={styles.description}>{banner?.description}</p>
                    </div>
                  </div>

                )
              })
            }
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* {
          allbanners?.length > 0 && (
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                {
                  allbanners.map((banner: any, i: number) => {
                    return (
                      <div className={`carousel-item ${i == 0 ? "active" : ""}`} key={banner.id}>
                        <div className={`${styles['image-overlay']}`}></div> 
                        <img src={banner.imageUrl} className={`d-block w-100`} alt="..." />
                        <div className="carousel-caption modify-caption">
                          <h5 className={styles.title}>{banner?.title}</h5>
                          <p className={styles.description}>{banner?.description}</p>
                        </div>
                      </div>

                    )
                  })
                }
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          )
        } */}
      </>
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
                      <td>{perPage * (currentpage - 1) + (i + 1)}</td>
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