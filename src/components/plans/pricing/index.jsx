import React, {useEffect, useState} from 'react';
import {Helmet} from "react-helmet";
import {BASE_URL} from "../../../config/config";

const token = localStorage.getItem('token');
import {useLocation} from "react-router-dom";


function PricingPage() {
    const [plan, setPlan] = useState({});
    const {state} = useLocation();
    const plan_id = state.plans.id;
    const [pricing, setPricing] = useState({})


    useEffect(() => {
        fetch(`${BASE_URL}plan/${plan_id}`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json
                ();
            })
            .then(data => {
                setPlan(data.data.plan)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                if (error instanceof SyntaxError) {
                    console.error('The response was not valid JSON');
                }
            });
    }, [])
    console.log(plan);
    const handleStatusChange = () => {
        setPricing({...pricing, active: !pricing?.active})
    };

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
                  </span> Pricing List</h3>
                        </div>
                    </div>
                </div>
                {plan?.Plan_Pricings?.map(pricing => (
                    <div style={{display: "flex"}}>
                        <div className="demo10">
                            <div className="container">
                                <div className="row">
                                        <div className="pricingTable10">
                                            <div className="pricingTable-header">
                                                <h3 className="heading">{plan.name}</h3>
                                                <span className="price-value">
                                    <span className="currency">$</span> {pricing.monthly_price}
                                                    <span className="month">/mo</span>
                                    </span>
                                            </div>
                                            <div className="pricing-content">
                                                <ul>
                                                    <li>{(new Date(pricing.pricing_start)).toLocaleDateString()}</li>
                                                    <li>{(new Date(pricing.pricing_end)).toLocaleDateString()}</li>
                                                    <li>{pricing.frequency}</li>
                                                    <li>
                                                        <div className="status-toggle">
                                                            <input
                                                                id="rating_6"
                                                                className="check"
                                                                type="checkbox"
                                                                checked={!!pricing?.active}
                                                                onChange={() => handleStatusChange(pricing?.active)}
                                                            />
                                                            <label
                                                                htmlFor="rating_6"
                                                                className="checktoggle checkbox-bg "
                                                            >
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className="demo10">
                            <div className="container">
                                <div className="row">
                                        <div className="pricingTable10">
                                            <div className="pricingTable-header">
                                                <h3 className="heading">{plan.name}</h3>
                                                <span className="price-value">
                                    <span className="currency">$</span> {pricing.yearly_price}
                                                    <span className="month">/yr</span>
                                    </span>
                                            </div>
                                            <div className="pricing-content">
                                                <ul>
                                                    <li>{(new Date(pricing.pricing_start)).toLocaleDateString()}</li>
                                                    <li>{(new Date(pricing.pricing_end)).toLocaleDateString()}</li>
                                                    <li>{pricing.frequency}</li>
                                                    <li>
                                                        <div className="status-toggle">
                                                            <input
                                                                id="rating_6"
                                                                className="check"
                                                                type="checkbox"
                                                                checked={!!pricing?.active}
                                                                onChange={() => handleStatusChange(pricing?.active)}
                                                            />
                                                            <label
                                                                htmlFor="rating_6"
                                                                className="checktoggle checkbox-bg "
                                                            >
                                                                checkbox
                                                            </label>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );

}

export default PricingPage;