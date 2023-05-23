import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {BASE_URL} from "../../../config/config";
import Swal from "sweetalert2";
import Select from "react-select";

function CreateDiscount() {

    const token = localStorage.getItem('token');
    const [period_start_date, setDate] = useState();
    const [code, setDiscountCode] = useState('');
    const [selected, setSelected] = useState('');
    const [percentage, setPercentage] = useState(0);
    const [value, setPerioduntValue] = useState('');
    const [period, setPeriod] = useState(0);
    const [plans, setPlans] = useState([]);
    const [number_of_periods, setNumberPeriods] = useState(0);
    const [isActive, setIsActive] = useState(0);
    const [description, setDescription] = useState('');

    const handleToggle = () => {
        setIsActive(!isActive);
    }
    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };
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
    }, [])
    const handleSubmit = (event) => {
        event.preventDefault();
        const discount = {
            period_start_date: period_start_date,
            code: code,
            percentage: percentage,
            value: value,
            period: period,
            number_of_periods: number_of_periods,
            plan_id: selected.value,
            active_flag: isActive,
            description: description
        };
        console.log(discount);
        // Validation logic
        let errors = {};

        if (!period_start_date) {
            errors.period_start_date = 'Date is required';
        }
        if (!code) {
            errors.code = 'Discount Code is required';
        }
        if (!percentage) {
            errors.percentage = 'Percentage is required';
        }
        if (!value) {
            errors.value = 'Periodunt Value is required';
        }
        if (!period) {
            errors.period = 'Period is required';
        }
        if (!number_of_periods) {
            errors.number_of_periods = 'Number of Periods is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }
        if (!selected.value) {
            errors.plan_id = 'Plan is required';
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            fetch(`${BASE_URL}discount/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(discount)
            })
                .then(response => {
                    if (!response.ok) {
                        Swal.fire('Something went wrong');
                    } else {
                        Swal.fire('Discount created successfully!');
                    }
                })
                .catch(error => {
                    console.error('There was a problem creating the product:', error);
                });

            setDate()
            setDiscountCode('')
            setPercentage(0)
            setPerioduntValue('')
            setPeriod(0)
            setNumberPeriods(0)
            setDescription('')
        }

    }

    const [errors, setErrors] = useState({});

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
                  </span> Create Discount </h3>
                        </div>
                    </div>
                </div>

                <div className="col-xl-8 offset-xl-2">
                    <form>
                        <div className="card">
                            <div className="card-body">
                                <div className="bank-inner-details">
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>
                                                    Pro Start Date
                                                </label>
                                                <input type="date"
                                                       className="form-control"
                                                       name="date"
                                                       value={period_start_date}
                                                       onChange={(event) => setDate(event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {errors.period_start_date && <span style={{color: "red"}}>{errors.period_start_date}</span>}
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>
                                                    Discount Code
                                                </label>
                                                <input type="text"
                                                       className="form-control"
                                                       name="discountCode"
                                                       value={code}
                                                       onChange={(event) => setDiscountCode(event.target.value)}
                                                />
                                            </div>
                                            {errors.code &&
                                                <span style={{color: "red"}}>{errors.code}</span>}
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input type="text"
                                                       className="form-control"
                                                       name="description"
                                                       value={description}
                                                       onChange={(event) => setDescription(event.target.value)}
                                                />
                                            </div>
                                            {errors.description &&
                                                <span style={{color: "red"}}>{errors.description}</span>}
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>
                                                    Discount Percentage
                                                </label>
                                                <input type="number"
                                                       className="form-control"
                                                       name="percentage"
                                                       value={percentage}
                                                       onChange={(event) => setPercentage(event.target.value)}
                                                />
                                            </div>
                                            {errors.percentage &&
                                                <span style={{color: "red"}}>{errors.percentage}</span>}
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>
                                                    Periodunt Value
                                                </label>
                                                <input type="text"
                                                       className="form-control"
                                                       name="perioduntValue"
                                                       value={value}
                                                       onChange={(event) => setPerioduntValue(event.target.value)}
                                                />
                                            </div>
                                            {errors.value &&
                                                <span style={{color: "red"}}>{errors.value}</span>}
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>
                                                    Discount Period
                                                </label>
                                                <input type="number"
                                                       className="form-control"
                                                       name="period"
                                                       value={period}
                                                       onChange={(event) => setPeriod(event.target.value)}
                                                />
                                            </div>
                                            {errors.period && <span style={{color: "red"}}>{errors.period}</span>}
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <label>
                                                    Discount Number of Periods
                                                </label>
                                                <input type="number"
                                                       className="form-control"
                                                       name="numberPeriods"
                                                       value={number_of_periods}
                                                       onChange={(event) => setNumberPeriods(event.target.value)}
                                                />
                                            </div>
                                            {errors.number_of_periods &&
                                                <span style={{color: "red"}}>{errors.number_of_periods}</span>}
                                        </div>
                                        <div className="form-group modal-select-box">
                                            <label>Plan</label>
                                            <Select
                                                placeholder = "Select"
                                                onChange={handleChange}
                                                options={
                                                    plans.map(el => {
                                                        return {
                                                            label: el.name,
                                                            value: el.id
                                                        }
                                                    })
                                                }
                                            />
                                            {errors.plan_id && <span style={{color: "red"}}>{errors.plan_id}</span>}
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <div className="status-toggle">
                                                <input
                                                    id="rating_6"
                                                    className="check"
                                                    type="checkbox"
                                                    checked={isActive}
                                                    onChange={handleToggle}
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
                                    <div className=" blog-categories-btn pt-0">
                                        <div className="bank-details-btn ">
                                            <button type="submit"
                                                    onClick={handleSubmit}
                                                    className="btn btn-primary me-2">
                                                Add Discount
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateDiscount;