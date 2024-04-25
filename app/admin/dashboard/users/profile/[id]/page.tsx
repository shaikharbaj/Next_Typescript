import React from 'react'
import './profile.css'
const ProfilePage = () => {
  return (
    <>
      <div className="container">
        <div className="card overflow-hidden">
          <div className="card-body p-0">
            <img src="https://www.bootdey.com/image/1352x300/6495ED/000000" alt="" className="img-fluid" />
            <div className="row d-flex justify-center">
              <div className="col-lg-4">
                <div className="mt-n5">
                  <div className="d-flex align-items-center justify-content-center mb-2">
                    <div className="linear-gradient d-flex align-items-center justify-content-center rounded-circle" style={{ width: "110px", height: "110px" }}>
                      <div className="border-white d-flex align-items-center justify-content-center rounded-circle overflow-hidden" style={{ width: "100px", height: "100px" }}>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" className="w-100 h-100" />
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h5 className="fs-5 mb-0 fw-semibold">ARBAJ SHAIKH</h5>
                    <p className="mb-0 fs-4">USER</p>
                  </div>
                </div>
              </div>
            </div>
            <ul className="nav nav-pills user-profile-tab justify-content-end mt-2 bg-light-info rounded-2" id="pills-tab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link position-relative rounded-0 active d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="true">
                  <i className="fa fa-user me-2 fs-6"></i>
                  <span className="d-none d-md-block">Profile</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-followers-tab" data-bs-toggle="pill" data-bs-target="#pills-followers" type="button" role="tab" aria-controls="pills-followers" aria-selected="false" tabIndex={-1}>
                  <i className="fa fa-heart me-2 fs-6"></i>
                  <span className="d-none d-md-block">Followers</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-friends-tab" data-bs-toggle="pill" data-bs-target="#pills-friends" type="button" role="tab" aria-controls="pills-friends" aria-selected="false" tabIndex={-1}>
                  <i className="fa fa-users me-2 fs-6"></i>
                  <span className="d-none d-md-block">Friends</span>
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link position-relative rounded-0 d-flex align-items-center justify-content-center bg-transparent fs-3 py-6" id="pills-gallery-tab" data-bs-toggle="pill" data-bs-target="#pills-gallery" type="button" role="tab" aria-controls="pills-gallery" aria-selected="false" tabIndex={-1}>
                  <i className="fa fa-photo me-2 fs-6"></i>
                  <span className="d-none d-md-block">Gallery</span>
                </button>
              </li>
            </ul>
          </div>
        </div >
      </div >
    </>
  )
}

export default ProfilePage;