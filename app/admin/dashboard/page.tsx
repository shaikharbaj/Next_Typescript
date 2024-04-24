"use client"
import { useEffect } from 'react'
// import AdminRoute from "@/app/utils/protected/adminprotected";
import styles from './dashboard.module.css'
import { useAppDispatch, useAppSelector } from '@/app/Hook/hooks'
import { loadAllDashboardCount } from '@/app/Redux/features/admin/adminSlice'
import { RootState } from '@/app/Redux/store'
const admindashboard = () => {
    const dispatch = useAppDispatch();
    const { counts } = useAppSelector((state: RootState) => state.admin);
    useEffect(() => {
        dispatch(loadAllDashboardCount());
    }, []);
    return (
        <>
            <div className="grey-bg container-fluid">
                <section id="minimal-statistics">
                    <div className="row">
                        <div className="col-12 mt-3 mb-1">
                            <h4 className={`${styles.heading} "text-uppercase"`}>WELCOME ADMIN DASHBOARD</h4>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="align-self-center">
                                                <i className="icon-pencil primary font-large-2 float-left"></i>
                                            </div>
                                            <div className="media-body text-left">
                                                <h3>{counts?.admincount ? counts?.admincount._count : 0}</h3>
                                                <span>Total Admin</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="align-self-center">
                                                <i className="icon-speech warning font-large-2 float-left"></i>
                                            </div>
                                            <div className="media-body text-left">
                                                <h3>{counts?.subadmincount ? counts?.subadmincount._count : 0}</h3>
                                                <span>Total SubAdmin</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="align-self-center">
                                                <i className="icon-graph success font-large-2 float-left"></i>
                                            </div>
                                            <div className="media-body text-left">
                                                <h3>{counts?.usercount ? counts?.usercount._count : 0}</h3>
                                                <span>Total Users</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="align-self-center">
                                                <i className="icon-pointer danger font-large-2 float-left"></i>
                                            </div>
                                            <div className="media-body text-right">
                                                <h3>423</h3>
                                                <span>Total Visits</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>

                    {/* <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="danger">278</h3>
                                                <span>New Projects</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="icon-rocket danger font-large-2 float-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="success">156</h3>
                                                <span>New Clients</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="icon-user success font-large-2 float-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="warning">64.89 %</h3>
                                                <span>Conversion Rate</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="icon-pie-chart warning font-large-2 float-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12 mb-3">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="primary">423</h3>
                                                <span>Support Tickets</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="icon-support primary font-large-2 float-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </section>
            </div>
        </>
    )
}
export default admindashboard;