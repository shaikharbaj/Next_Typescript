"use client";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./units/styles.module.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  changeattributestatusAsync,
  deleteattributeAsync,
  deleteattributeunitAsync,
  getallAtrributeAsync,
} from "@/app/Redux/features/attributes/attributeSlice";
import { RootState } from "@/app/Redux/store";
import useDebounce from "@/app/Hook/useDebounce";
import Loading from "@/app/components/Loading/Loading";
import Pagination from "@/app/components/Pagination/Pagination";
import { FaTrash } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import { errortoast, successtoast } from "@/app/utils/alerts/alerts";
const page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, meta, attributes } = useAppSelector(
    (state: RootState) => state.attribute
  );
  console.log(attributes);
  const [searchTerm, setSerchText] = useState("");
  const debauncedValue = useDebounce(searchTerm, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  };

  useEffect(() => {
    dispatch(getallAtrributeAsync({ currentpage, searchTerm }))
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [debauncedValue, currentpage]);

  const deleteAttributeHandler = (id: number) => {
    dispatch(deleteattributeAsync({ id }))
      .unwrap()
      .then((res) => {
        console.log(res);
        successtoast(res.message);
      })
      .catch((err) => {
        console.log(err);
        errortoast(err.message);
      });
  };

  const changeStatusHandler = (id: number) => {
    dispatch(changeattributestatusAsync({ id }))
      .unwrap()
      .then((res) => {
        successtoast(res.message);
      })
      .catch((error) => {
        errortoast(error?.message);
      });
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.inputbox}`}>
        <input
          type="text"
          onChange={handlesearch}
          value={searchTerm}
          placeholder="search something here....."
        />
      </div>
      <div className={styles.add_btn_wrapper}>
        <button
          onClick={() => router.push("/admin/dashboard/attributes/create")}
        >
          ADD Attribute
        </button>
      </div>
      <div className={styles.table_wrapper}>
        <table className={`table table-bordered text-center`}>
          <thead>
            <tr>
              <th>SR.NO</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>STATUS</th>
              <th>
                Required <span style={{ color: "red" }}>*</span>
              </th>
              <th>Values</th>
              <th>OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {attributes?.length > 0 ? (
              attributes.map((att: any, index: number) => {
                return (
                  <tr key={att?.id}>
                    <td>{index + 1}</td>
                    <td>{att?.name}</td>
                    <td>{att?.category?.name}</td>
                    <td>
                      {att?.status ? (
                        <button
                          className={styles.active}
                          onClick={() => changeStatusHandler(att?.id)}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className={styles.inactive}
                          onClick={() => changeStatusHandler(att?.id)}
                        >
                          InActive
                        </button>
                      )}
                    </td>
                    <td>
                      <span className={styles.isRequired}>
                        {att?.required ? "Yes" : "No"}
                      </span>
                    </td>
                    <td>
                      <Link
                        href={`/admin/dashboard/attributes/${att?.id}/values`}
                        style={{ fontSize: "14px" }}
                      >
                        <i className="bx bx-sitemap"></i> Manage Values
                      </Link>
                    </td>
                    <td>
                      <Link
                        href={`/admin/dashboard/attributes/${att?.id}/edit`}
                        className={`${styles.edit_btn} me-2`}
                      >
                        <i className="bx bxs-edit"></i>Edit
                      </Link>
                      <span
                        className={styles.delete_btn}
                        onClick={() => deleteAttributeHandler(att?.id)}
                      >
                        <i className="bx bxs-trash-alt"></i>Delete
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>No Data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentpage={currentpage}
        setCurrentPage={setCurrentPage}
        total={meta?.total}
        perpage={perPage}
      />
    </div>
  );
};

export default page;
