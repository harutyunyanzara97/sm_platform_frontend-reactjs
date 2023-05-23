import React from "react"
import {Helmet} from "react-helmet";

function Subscriptions() {
    return (
        <div className="page-wrapper">
            <Helmet>
                <title>Dashboard - CRMS admin Template</title>
                <meta name="description" content="Reactify Blank Page"/>
            </Helmet>
            <div className="content container-fluid">
                <div className="row">
                    <div className="crms-title row bg-white">
                        <div className="col ">
                            <h3 className="page-title m-0">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="feather-smartphone"/>
                  </span> Manage Subscriptions </h3>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table
                                    // className="table mb-0"
                                    className="table"
                                    style={{overflowX: "auto"}}
                                >
                                    <thead>
                                    <tr>
                                        <th>Customer email</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Next renewal date</th>
                                        <th>Auto renew</th>
                                        <th>Charges</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>Active</td>
                                        <td>
                                            <div>
                                                <a
                                                    className="me-1 btn btn-sm bg-success-light"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit-blog-categories"
                                                >
                                                    <i className="feather-edit-3 me-1"/> Edit
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="modal custom-modal fade bank-details"
                id="edit-blog-categories"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header text-start mb-0">
                                <h4 className="mb-0 text-dark fw-bold">Edit Subscription</h4>
                            </div>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="bank-inner-details">
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>
                                                    Customer email
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    // defaultValue={user?.email}
                                                    // onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    Start date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    // defaultValue={user?.email}
                                                    // onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    End date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    // defaultValue={user?.email}
                                                    // onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    Next renewal date
                                                </label>
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    // defaultValue={user?.email}
                                                    // onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    Auto renew
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    // defaultValue={user?.email}
                                                    // onChange={handleEmailChange}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>
                                                    Charges
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    // defaultValue={user?.email}
                                                    // onChange={handleEmailChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="status-toggle">
                                            <input
                                                id="rating_6"
                                                className="check"
                                                type="checkbox"
                                                // checked={!!modalProduct?.active_flag}
                                                // onChange={() => handleStatusChange(modalProduct?.active_flag)}
                                            />
                                            <label
                                                htmlFor="rating_6"
                                                className="checktoggle checkbox-bg "
                                            >
                                                checkbox
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer blog-categories-btn">
                            <div className="bank-details-btn ">
                                <a
                                    href="#"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary me-2"
                                    // onClick={() => editProduct()}
                                >
                                    Update
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Subscriptions;