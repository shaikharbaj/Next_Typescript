"use client";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/Hook/hooks";
import {
  changeattributestatusAsync,
  changestatus_attributevalueAsync,
  delete_attributevalueAsync,
  deleteattributeAsync,
  deleteattributeunitAsync,
  getallAtrributeAsync,
  getattributewithvalueAsync,
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
  const { id } = useParams();
  //   const { loading, meta, attributes } = useAppSelector(
  //     (state: RootState) => state.attribute
  //   );

  const [searchTerm, setSerchText] = useState("");
  const [attribute, setAttribute] = useState<any>({});
  const debauncedValue = useDebounce(searchTerm, 600);
  const [currentpage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const handlesearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSerchText(e.target.value);
  };
  useEffect(() => {
    dispatch(getattributewithvalueAsync({ currentpage, searchTerm, id }))
      .unwrap()
      .then((res) => {
        setAttribute(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [debauncedValue, currentpage]);

  const deleteAttributeHandler = (id: number) => {
    dispatch(delete_attributevalueAsync({ id }))
      .unwrap()
      .then((res) => {
        const newattributevalue = attribute?.attributevalues?.filter(
          (att: any) => {
            if (Number(att?.id) !== Number(res.data.id)) {
              return { ...att, status: res?.data?.status };
            }
          }
        );
        setAttribute((prev: any) => {
          return { ...prev, attributevalues: newattributevalue };
        });
        successtoast(res.message);
      })
      .catch((err) => {
        console.log(err);
        errortoast(err.message);
      });
  };

  const changeStatusHandler = (id: number) => {
    dispatch(changestatus_attributevalueAsync({ id }))
      .unwrap()
      .then((res) => {
        const newattributevalue = attribute?.attributevalues?.map(
          (att: any) => {
            if (Number(att?.id) === Number(res.data.id)) {
              return { ...att, status: res?.data?.status };
            }
            return att;
          }
        );
        setAttribute((prev: any) => {
          return { ...prev, attributevalues: newattributevalue };
        });
        successtoast(res.message);
      })
      .catch((error) => {
        errortoast(error?.message);
      });
  };
  //   if (loading) {
  //     return <Loading />;
  //   }
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
          onClick={() =>
            router.push(
              `/admin/dashboard/attributes/${attribute?.id}/values/create`
            )
          }
        >
          Create {`${attribute?.name} value`}
        </button>
      </div>
      <div className={styles.table_wrapper}>
        <table className={`table table-bordered text-center`}>
          <thead>
            <tr>
              <th>SR.NO</th>
              <th>NAME</th>
              <th>ATTRIBUTE</th>
              <th>STATUS</th>
              <th>OPERATIONS</th>
            </tr>
          </thead>
          <tbody>
            {attribute?.attributevalues?.length > 0 ? (
              attribute?.attributevalues.map((val: any, index: number) => {
                return (
                  <tr key={val?.id}>
                    <td>{index + 1}</td>
                    <td>{val?.name}</td>
                    <td>{attribute?.name}</td>
                    <td>
                      {val?.status ? (
                        <button
                          className={styles.active}
                          onClick={() => changeStatusHandler(val?.id)}
                        >
                          Active
                        </button>
                      ) : (
                        <button
                          className={styles.inactive}
                          onClick={() => changeStatusHandler(val?.id)}
                        >
                          InActive
                        </button>
                      )}
                    </td>
                    <td>
                      <Link
                        href={`/admin/dashboard/attributes/${attribute?.id}/values/${val?.id}/edit`}
                        className={`${styles.edit_btn} me-2`}
                      >
                        <i className="bx bxs-edit"></i>Edit
                      </Link>
                      <span
                        className={styles.delete_btn}
                        onClick={() => deleteAttributeHandler(val?.id)}
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
      {/* <Pagination
        currentpage={currentpage}
        setCurrentPage={setCurrentPage}
        total={meta?.total}
        perpage={perPage}
      /> */}
    </div>
  );
};

export default page;
