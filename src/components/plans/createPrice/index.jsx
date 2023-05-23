import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {BASE_URL} from "../../../config/config";
import Swal from "sweetalert2";
import Select from "react-select";

function CreatePrice() {

    const [currency, setCurrency] = useState(0);
    const [monthly_price, setMonthly_price] = useState(0);
    const [yearly_price, setYearly_price] = useState(0);
    const [pricing_start, setPricing_start] = useState();
    const [pricing_end, setPricing_end] = useState();
    const [frequency, setFrequency] = useState('');
    const [selected, setSelected] = useState('');
    const [plans, setPlans] = useState([]);
    const [isActive, setIsActive] = useState(0)
    const token = localStorage.getItem('token');

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
    const handleToggle = () => {
        setIsActive(!isActive);
    }
    const handleChange = (selectedOption) => {
        setSelected(selectedOption);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const price = {
            currency: currency,
            monthly_price: monthly_price,
            yearly_price: yearly_price,
            pricing_start: pricing_start,
            pricing_end: pricing_end,
            frequency: frequency,
            active: isActive,
            plan_id: selected.value
        };

        let errors = {};

        if (!currency) {
            errors.currency = 'Currency is required';
        }
        if (!monthly_price) {
            errors.monthly_price = 'Monthly price is required';
        }
        if (!yearly_price) {
            errors.yearly_price = 'Yearly price is required';
        }
        if (!pricing_start) {
            errors.pricing_start = 'Pricing start is required';
        }
        if (!pricing_end) {
            errors.pricing_end = 'Pricing end is required';
        }
        if (!frequency) {
            errors.frequency = 'Frequency is required';
        }

        setErrors(errors)

        if (Object.keys(errors).length === 0) {
            fetch(`${BASE_URL}plan/pricing/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(price)
            })
                .then(response => {
                    if (!response.ok) {
                        Swal.fire('Something went wrong');
                    } else {
                        Swal.fire('Price created successfully!');
                    }
                })
                .catch(error => {
                    console.error('There was a problem creating the price:', error);
                });

            setCurrency(0);
            setMonthly_price(0);
            setYearly_price(0);
            setPricing_start();
            setPricing_end();
            setFrequency('');
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
                  </span> Create Pricing </h3>
                        </div>
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
                                                Currency
                                            </label>
                                            <input type="number"
                                                   className="form-control"
                                                   name="currency"
                                                   value={currency}
                                                   onChange={(event) => setCurrency(event.target.value)}
                                            />
                                            {errors.currency && <span style={{color: "red"}}>{errors.currency}</span>}

                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <label className="col-form-label">Monthly price</label>
                                                <input type="number"
                                                       className="form-control"
                                                       name="monthly_price"
                                                    value={monthly_price}
                                                    onChange={(event) => setMonthly_price(event.target.value)}
                                                />
                                                {errors.monthly_price && <span style={{color: "red"}}>{errors.monthly_price}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <label className="col-form-label">Yearly price</label>
                                                <input type="number"
                                                       className="form-control"
                                                       name="yearly_price"
                                                    value={yearly_price}
                                                    onChange={(event) => setYearly_price(event.target.value)}
                                                />
                                                {errors.yearly_price && <span style={{color: "red"}}>{errors.yearly_price}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <label className="col-form-label">Pricing start</label>
                                                <input type="date"
                                                       className="form-control"
                                                       name="pricing_start"
                                                    value={pricing_start}
                                                    onChange={(event) => setPricing_start(event.target.value)}
                                                />
                                                {errors.pricing_start && <span style={{color: "red"}}>{errors.pricing_start}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <label className="col-form-label">Pricing end</label>
                                                <input type="date"
                                                       className="form-control"
                                                       name="pricing_end"
                                                    value={pricing_end}
                                                    onChange={(event) => setPricing_end(event.target.value)}
                                                />
                                                {errors.pricing_end && <span style={{color: "red"}}>{errors.pricing_end}</span>}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-sm-12">
                                                <label className="col-form-label">Frequency</label>
                                                <input type="text"
                                                       className="form-control"
                                                       name="frequency"
                                                    value={frequency}
                                                    onChange={(event) => setFrequency(event.target.value)}
                                                />
                                                {errors.frequency && <span style={{color: "red"}}>{errors.frequency}</span>}
                                            </div>
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
                                            Add Price
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePrice;