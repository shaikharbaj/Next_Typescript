"use client";
import ProductCard from "@/app/components/ProductCard/ProductCard";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./style.module.css";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import { RootState } from "@/app/Redux/store";
import Loading from "@/app/components/Loading/Loading";
import { deleteproductAsync, loadallsupplierproductAsync } from "@/app/Redux/features/supplier/supplierSlice";
import { useRouter } from "next/navigation";
import useDebounce from "@/app/Hook/useDebounce";
import Pagination from "@/app/components/Pagination/Pagination";
import { slugify } from "@/app/utils/slug/slug_generator";
import Swal from 'sweetalert2'
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
const AllProduct = () => {
  const { loading, products, meta } = useAppSelector(
    (state: RootState) => state.supplier
  );
  const [searchTerm, setSerchText] = useState('');
  const debauncedValue = useDebounce(searchTerm, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const NavigateToAddProduct = () => {
    router.push("/supplier/dashboard/product/add");
  };

  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  }

  const deleteProduct = (id: number) => {
    dispatch(deleteproductAsync({ product_id: Number(id) })).unwrap().then((res) => {
      successtoast(res.message);
      dispatch(loadallsupplierproductAsync({ currentpage, searchTerm })).unwrap().then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err);
      })
    }).catch((err) => {
      console.log(err);
      errortoast(err.message);
    })
  }

  useEffect(() => {
    dispatch(loadallsupplierproductAsync({ currentpage, searchTerm })).unwrap().then((res) => {
      console.log(res)
    }).catch((err) => {
      // if (typeof (err) === "string") {
      //     errortoast(err);
      //     dispatch(clearstate())
      // }
    })
  }, [debauncedValue, currentpage]);
  const navigatetoviewPage = (slug: string) => {
    router.push(`/supplier/dashboard/product/${slugify(slug)}`)
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4 w-100">
        <div className="flex justify-center mt-3">
          <div className={`mt-3 ${styles.inputbox}`}>
            <input type="text" onChange={handlesearch} value={searchTerm} placeholder='search something here.....' />
          </div>
        </div>
        <div className="flex flex-col pt-4 h-full">
          {/* <!-- Table --> */}
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="flex justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Products</h2>
              <button
                className={styles.add_product_btn}
                onClick={NavigateToAddProduct}
              >
                ADD PRODUCTS
              </button>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto text-center">
                <table className="table-auto w-full text-center">
                  <thead className="text-xs text-center font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Name</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Category</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Subcategory
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          original price
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">
                          discount price
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">stock</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Action</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">
                    {products?.map((p: any) => {
                      return (
                        <tr>
                          <td className="p-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                <img
                                  className="rounded-full"
                                  src={p?.productImages[p?.productImages.findIndex((i: any) => i.isThumbnail == true)]?.url}
                                  width="40"
                                  height="40"
                                  alt="Alex Shatov"
                                />
                              </div>
                              <div className="font-medium text-gray-800">
                                {p?.name?.length > 20
                                  ? p?.name.slice(0, 19) + "..."
                                  : p?.name}
                              </div>
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left">{`${p?.category?.name}`}</div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-left font-medium text-green-500">
                              {p?.subcategory?.name
                                ? p.subcategory?.name
                                : " - "}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium">
                              {`₹ ${p?.originalprice}`}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium">
                              {`₹ ${p?.discountprice}`}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center font-medium">
                              {p?.stock > 0 ? (
                                p?.stock
                              ) : (
                                <span className={styles.out_of_stock}>
                                  {"out of stock"}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-2 whitespace-nowrap">
                            <div className="text-center">
                              <button className="btn btn-warning me-2" onClick={() => router.push(`/supplier/dashboard/product/edit/${p?.id}`)}>
                                Edit
                              </button>
                              <button className="btn btn-danger me-2" onClick={() => deleteProduct(p?.id)}>Delete</button>
                              <button className="btn btn-primary" onClick={() => navigatetoviewPage(p?.slug)}>View</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <Pagination currentpage={currentpage} setCurrentPage={setCurrentPage} total={meta?.total} perpage={perPage} />
        </div>

      </section>
    </>
  );
};

export default AllProduct;
