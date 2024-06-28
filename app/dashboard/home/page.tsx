"use client";
import styles from "./home.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/app/Hook/useDebounce";
// import { loadproductAsync } from '@/app/Redux/features/Product/productSlice';
import Loading from "@/app/components/Loading/Loading";
import Pagination from "@/app/components/Pagination/Pagination";
import { loadAllBanners } from "@/app/Redux/features/Banner/bannerSlice";
import Link from "next/link";
import { loadallproductAsync } from "@/app/Redux/features/Product/productSlice";
import { RootState } from "@/app/Redux/store";
import Helper from "@/app/utils/helper";

type Payload = {
  currentpage: number;
  perPage: number;
  searchText: string;
};
type ProductType = {
  id: string;
  title: string;
  description: string;
  price: string;
  brand: string;
  category: string;
};
const HomePage = () => {
  // const { products, loading } = useAppSelector((state) => state.products);
  // const { allbanners } = useAppSelector((state) => state.banner);
  // const [searchText, setSerchText] = useState("");
  // const debauncedValue = useDebounce(searchText, 600);
  // const [currentpage, setCurrentPage] = useState(1);
  // const [perPage, setPerPage] = useState(5);

  // const dispatch = useAppDispatch();
  // const router = useRouter();

  // useEffect(() => {
  //   const payload: Payload = { currentpage, perPage, searchText };
  //   // dispatch(loadproductAsync(payload));
  //   dispatch(loadAllBanners());
  // }, [debauncedValue, currentpage, perPage]);

  // const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   setCurrentPage(1);
  //   setSerchText(e.target.value);
  // };
  const { loading, products, meta } = useAppSelector(
    (state: RootState) => state.products
  );

  console.log(products);
  const [searchTerm, setSerchText] = useState("");
  const debauncedValue = useDebounce(searchTerm, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const dispatch = useAppDispatch();

  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  };

  useEffect(() => {
    dispatch(loadallproductAsync({ currentpage, searchTerm }));
  }, [debauncedValue, currentpage]);

  // useEffect(() => {
  //   dispatch(loadallproductAsync());
  // }, []);

  console.log(products);
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      {loading && <Loading />}
      {/* <>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {allbanners.map((banner: any, i: number) => {
              return (
                <div
                  className={`carousel-item ${i == 0 ? "active" : ""}`}
                  key={banner.id}
                >
                  <div className={`${styles["image-overlay"]}`}></div>{" "}
                 
                  <img
                    src={banner.imageUrl}
                    className={`d-block w-100`}
                    alt="..."
                  />
                  <div className="carousel-caption modify-caption">
                    <h5 className={styles.title}>{banner?.title}</h5>
                    <p className={styles.description}>{banner?.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {
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
        }
      </> */}
      {/* <div className={styles.wrapper}>
        <div className={`mt-3 ${styles.inputbox}`}>
          <input
            type="text"
            onChange={handlesearch}
            value={searchText}
            placeholder="search something here....."
          />
        </div>
        
      </div> */}

      <section id="hot_Product_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="tabs-el-wrapper">
                <div className="tab-content">
                  <div
                    id="new_arrival"
                    className="tab-pane fade show in active"
                  >
                    <div className="row d-flex justify-content-center">
                      <h2 className="mt-5 text-center">Products</h2>
                      <div className="row">
                        {products?.length > 0 ? (
                          products?.map((p: any) => {
                            return (
                              <div
                                className="col-lg-3 col-md-4 col-sm-6 col-12"
                                key={p?.id}
                              >
                                <div className={styles.product_wrappers_one}>
                                  <div className={styles.thumb}>
                                    <Link
                                      href={`/product/${p?.slug}`}
                                      className={`${styles.image} text-center`}
                                    >
                                      <img
                                        id={styles.card_img}
                                        src={
                                          p?.variantImages[
                                            p?.variantImages?.findIndex(
                                              (i: any) => i.isThumbnail == true
                                            )
                                          ]?.url
                                        }
                                        alt="product"
                                        style={{
                                          height: "15rem",
                                          width: "15rem",
                                        }}
                                      />
                                    </Link>
                                    <div className="actions"></div>
                                  </div>
                                  <div className={styles.content}>
                                    <h5 className={`${styles.title} mb-0`}>
                                      <Link href={"/"}>
                                        {p?.product?.name +
                                          `(${Helper.generate_attribute_list(
                                            p
                                          )})`}
                                      </Link>
                                    </h5>
                                    <span className={styles.price}>
                                      <span className={styles.new}>
                                        ₹ <span>{p?.discountprice}</span>
                                      </span>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
