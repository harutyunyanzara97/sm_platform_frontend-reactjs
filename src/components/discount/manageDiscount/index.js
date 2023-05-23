import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import Select from "react-select";
import {BASE_URL} from "../../../config/config";
import Swal from "sweetalert2";

function ManageDiscount() {

    const [plans, setPlans] = useState([]);
    const [selected, setSelected] = useState('');
    const token = localStorage.getItem('token');
    const [discounts, setDiscounts] = useState([]);
    const [modalDiscount, setModalDiscount] = useState({});

    const handlePlanChange = (selectedOption) => {
        console.log(selectedOption, 'selectedOption');
        setSelected(selectedOption);
    };
    const handleDateChange = (event) => {
        setModalDiscount({ ...modalDiscount, period_start_date: event.target.value})
    }
    const handleCodeChange = (event) => {
        setModalDiscount({ ...modalDiscount, code: event.target.value})
    }
    const handleNumberOfPeriodsChange = (event) => {
        setModalDiscount({ ...modalDiscount, number_of_periods: event.target.value})
    }
    const handleValueChange = (event) => {
        setModalDiscount({ ...modalDiscount, value: event.target.value})
    }
    const handlePeriodChange = (event) => {
        setModalDiscount({ ...modalDiscount, period: event.target.value})
    }
    const handlePercentageChange = (event) => {
        setModalDiscount({ ...modalDiscount, percentage: event.target.value})
    }
    const handleStatusChange = () => {
        setModalDiscount({ ...modalDiscount, active_flag: !modalDiscount?.active_flag})
    };

    const handleDescriptionChange = () => {
        setModalDiscount({ ...modalDiscount, description: event.target.value})
    };

    const toggleEditModal = (discount) => {
        setModalDiscount(discount);

        const selectedValue = plans.find(({id}) => id === discount.plan_id)
        setSelected({ label: selectedValue.name, value: selectedValue.id })

        document.querySelector('.modal-backdrop').style.display = "inline";
        document.getElementById("edit-blog-categories").style.display = "block";
    }

    useEffect(() => {
        fetch(`${BASE_URL}plan`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setPlans(data.data.plans)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                if (error instanceof SyntaxError) {
                    console.error('The response was not valid JSON');
                }
            });

        fetch(`${BASE_URL}discount`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDiscounts(data.data.discount)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                if (error instanceof SyntaxError) {
                    console.error('The response was not valid JSON');
                }
            });
    }, [])
    useEffect(() => {

        fetch(`${BASE_URL}discount`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => {

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setDiscounts(data.data.discount)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                if (error instanceof SyntaxError) {
                    console.error('The response was not valid JSON');
                }
            });
    }, [])
    const editDiscount = async () => {
        await fetch(`${BASE_URL}discount`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(modalDiscount)
        })
            .then(response => response.json())
            .then((data) => {
                Swal.fire(data.message)
                const findIndex = discounts.findIndex(({id}) => id === data.data.id)
                discounts[findIndex] = data.data
                setDiscounts([...discounts]);
            })
            .catch(error => console.error('Error:', error));
    }
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
                  </span> Manage Discount </h3>
                        </div>
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
                                    <th>Pro Start Date</th>
                                    <th>Discount Code</th>
                                    <th>Discount Percentage</th>
                                    <th>Description</th>
                                    <th>Periodunt Value</th>
                                    <th>Discount Period</th>
                                    <th>Discount Number of Periods</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {discounts.map(discount => (
                                    <tr key={discount.id}>
                                        <td>{(new Date(discount.period_start_date)).toLocaleDateString()}</td>
                                        <td>{discount.code}</td>
                                        <td>{discount.percentage}</td>
                                        <td>{discount.description}</td>
                                        <td>{discount.value}</td>
                                        <td>{discount.period}</td>
                                        <td>{discount.number_of_periods}</td>
                                        <td>{!!discount.active_flag ? "Active" : "InActive"}</td>
                                        <td>
                                            <div>
                                                <a
                                                    className="me-1 btn btn-sm bg-success-light"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#edit-blog-categories"
                                                    onClick={() => toggleEditModal(discount)}
                                                >
                                                    <i className="feather-edit-3 me-1"/> Edit
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Edit Modal */}
            <div
                className="modal custom-modal fade bank-details"
                id="edit-blog-categories"
                role="dialog"
            >
                <div className="modal-dialog modal-dialog-centered modal-md">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="form-header text-start mb-0">
                                <h4 className="mb-0 text-dark fw-bold">Edit Discount</h4>
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
                                        <div className="form-group">
                                            <label>
                                                Pro Start Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={modalDiscount?.period_start_date}
                                                onChange={handleDateChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Discount Code
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modalDiscount?.code}
                                                onChange={handleCodeChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Discount Percentage
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modalDiscount?.percentage}
                                                onChange={handlePercentageChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Periodunt Value
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modalDiscount?.value}
                                                onChange={handleValueChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Discount Period
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modalDiscount?.period}
                                                onChange={handlePeriodChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Discount Number of Periods
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={modalDiscount?.number_of_periods}
                                                onChange={handleNumberOfPeriodsChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Description
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modalDiscount?.description}
                                                onChange={handleDescriptionChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Plan
                                                <span className="text-danger">*</span>
                                            </label>
                                            <Select
                                                value={selected}
                                                placeholder="Select"
                                                onChange={handlePlanChange}
                                                options={
                                                    plans.map(el => {
                                                        return {
                                                            label: el.name,
                                                            value: el.id
                                                        }
                                                    })
                                                }
                                            />

                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="status-toggle">
                                                <input
                                                    id="rating_6"
                                                    className="check"
                                                    type="checkbox"
                                                    checked={!!modalDiscount?.active_flag}
                                                    onChange={() => handleStatusChange(modalDiscount?.active_flag)}
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
                                        onClick={() => editDiscount()}
                                    >
                                        Edit discount
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageDiscount;