import React, {useEffect, useState} from "react";
import config from "config";

import {Route, BrowserRouter as Router, Switch} from "react-router-dom";

import Header from "./components/header/index";
import Dashboard from "./components/dashboard";
import Sidebarnav from "./components/sidebar";
import 'antd/dist/antd.css';
import "./assets/css/bootstrap.min.css"
import "./assets/css/font-awesome.min.css"
import "./assets/css/feather.css";
import "./assets/css/line-awesome.min.css";
import "./assets/css/theme-settings.css";
import "./assets/css/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "./assets/js/bootstrap.bundle.js";
import "./assets/js/jquery.slimscroll.min.js";
import "./assets/js/theme-settings.js";
import "./assets/js/app.js";
import Login from "./components/login";
import CreateUser from "./components/users/createuser";
import ManageUser from "./components/users/manageUser";
import CreateProduct from "./components/products/createProduct";
import ManageProduct from "./components/products/manageProduct";
import CreatePlan from "./components/plans/createPlan";
import CreatePlanFeatures from "./components/plans/addPlanFeature";
import ManagePlanFeature from "./components/plans/managePlanFeature";
import ManagePlan from "./components/plans/managePlan";
import ProductAdminDashboard from "./components/productAdminDashboard/ProductAdminDashboard";
import CreateDiscount from "./components/discount/createDiscount";
import ManageDiscount from "./components/discount/manageDiscount";
import Subscriptions from "./components/subscriptions";
import Pricing from "./components/plans/pricing";
import CreatePrice from "./components/plans/createPrice";

const AppUniversal = (props) => {

    const url = props.location.pathname.split("/")[1];
    const exclusionArray = ["login", "register", "forgot-password", "error-404", "error-500"];
    const token = localStorage.getItem('token');

    return (
        <>
            {token ?
                <Router basename={`${config.publicPath}`}>

                    <Route path="/home" exact component={Dashboard}/>
                    <div className="main-wrapper">
                        <Route render={(props) => <Header {...props} />}/>
                        {url === "components" ? <Route render={(props) => <ComponentSidebar {...props} />}/> :
                            url === "email" || url === "mail-view" ?
                                <Route render={(props) => <EmailSidebar {...props} />}/> :
                                <Route render={(props) => <Sidebarnav {...props} />}/>
                        }
                    </div>
                    <Route path="/create-user" exact  component={CreateUser } />
                    <Route path="/manage-user" exact  component={ManageUser } />
                    <Route path="/create-product" exact component={CreateProduct} />
                    <Route path="/manage-product" exact component={ManageProduct}/>
                    <Route path="/create-plan" exact component={CreatePlan}/>
                    <Route path="/manage-plan" exact component={ManagePlan}/>
                    <Route path="/create-plan-feature" exact component={CreatePlanFeatures}/>
                    <Route path="/manage-plan-feature" exact component={ManagePlanFeature}/>
                    <Route path="/create-discount" exact component={CreateDiscount} />
                    <Route path="/manage-discount" exact component={ManageDiscount} />
                    <Route path="/pricing/:id" exact component={Pricing} />
                    {/*<Route path="/plan-pricing:id" exact component={Pricing} />*/}
                    <Route path="/subscriptions" exact component={Subscriptions}/>
                    <Route path="/create-price" exact component={CreatePrice}/>
                </Router>
                :
                <Route path="/" exact component={Login}/>
            }

            <Router>
                <Route path="/productDashboard" exact component={ProductAdminDashboard}/>
            </Router>


            {/*theme settings modal*/}
            <div className="modal right fade settings" id="settings" role="dialog" aria-modal="true">
                <div className="toggle-close">
                    <div className="toggle" data-bs-toggle="modal" data-bs-target="#settings"><i
                        className="fa fa-cog fa-w-16 fa-spin fa-2x"/>
                    </div>
                </div>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header p-3">
                            <h4 className="modal-title" id="myModalLabel2">Theme Customizer</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body pb-3">
                            <div className="scroll">
                                <div>
                                    <ul className="list-group">
                                        <li className="list-group-item border-0">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="pb-2">Primary Skin</h5>
                                                </div>
                                                <div className="col text-end">
                                                    <a className="reset text-white bg-dark" id="ChangeprimaryDefault">Reset
                                                        Default</a>
                                                </div>
                                            </div>
                                            <div className="theme-settings-swatches">
                                                <div className="themes">
                                                    <div className="themes-body">
                                                        <ul id="theme-change"
                                                            className="theme-colors border-0 list-inline-item list-unstyled mb-0">
                                                            <li className="theme-title">Solid Color</li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-solid-black bg-black"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-solid-pink bg-primary"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-solid-orange bg-secondary1"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-solid-purple bg-success"/></li>
                                                            {/* <li class="list-inline-item"><span class="theme-solid-blue bg-info"></span></li> */}
                                                            <li className="list-inline-item"><span
                                                                className="theme-solid-green bg-warnings"/></li>
                                                            <li><br/></li>
                                                            <li>
                                                                <hr/>
                                                            </li>
                                                            <li className="theme-title">Gradient Color</li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-orange bg-sunny-morning"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-blue bg-tempting-azure"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-grey bg-amy-crisp"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-lgrey bg-mean-fruit"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-dblue bg-malibu-beach"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-pink bg-ripe-malin"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="theme-purple bg-plum-plate"/></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="list-group">
                                        <li className="list-group-item border-0">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="pb-2">Header Style</h5>
                                                </div>
                                                <div className="col text-end">
                                                    <a className="reset text-white bg-dark" id="ChageheaderDefault">Reset
                                                        Default</a>
                                                </div>
                                            </div>
                                            <div className="theme-settings-swatches">
                                                <div className="themes">
                                                    <div className="themes-body">
                                                        <ul id="theme-change1"
                                                            className="theme-colors border-0 list-inline-item list-unstyled mb-0">
                                                            <li className="theme-title">Solid Color</li>
                                                            <li className="list-inline-item"><span
                                                                className="header-solid-black bg-black"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="header-solid-pink bg-primary"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="header-solid-orange bg-secondary1"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="header-solid-purple bg-success"/></li>
                                                            {/* <li class="list-inline-item"><span class="header-solid-blue bg-info"></span></li> */}
                                                            <li className="list-inline-item"><span
                                                                className="header-solid-green bg-warnings"/></li>
                                                            <li><br/></li>
                                                            <li>
                                                                <hr/>
                                                            </li>
                                                            <li className="theme-title">Gradient Color</li>
                                                            <li className="list-inline-item"><span
                                                                className="header-gradient-color1 bg-sunny-morning"/>
                                                            </li>
                                                            <li className="list-inline-item"><span
                                                                className="header-gradient-color2 bg-tempting-azure"/>
                                                            </li>
                                                            <li className="list-inline-item"><span
                                                                className="header-gradient-color3 bg-amy-crisp"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="header-gradient-color4 bg-mean-fruit"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="header-gradient-color5 bg-malibu-beach"/>
                                                            </li>
                                                            <li className="list-inline-item"><span
                                                                className="header-gradient-color6 bg-ripe-malin"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="header-gradient-color7 bg-plum-plate"/></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <ul className="list-group m-0">
                                        <li className="list-group-item border-0">
                                            <div className="row">
                                                <div className="col">
                                                    <h5 className="pb-2">Apps Sidebar Style</h5>
                                                </div>
                                                <div className="col  text-end">
                                                    <a className="reset text-white bg-dark" id="ChagesidebarDefault">Reset
                                                        Default</a>
                                                </div>
                                            </div>
                                            <div className="theme-settings-swatches">
                                                <div className="themes">
                                                    <div className="themes-body">
                                                        <ul id="theme-change2"
                                                            className="theme-colors border-0 list-inline-item list-unstyled">
                                                            <li className="theme-title">Solid Color</li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-solid-black bg-black"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-solid-pink bg-primary"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-solid-orange bg-secondary1"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-solid-purple bg-success"/></li>
                                                            {/* <li class="list-inline-item"><span class="sidebar-solid-blue bg-info"></span></li> */}
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-solid-green bg-warnings"/></li>
                                                            <li><br/></li>
                                                            <li>
                                                                <hr/>
                                                            </li>
                                                            <li className="theme-title">Gradient Color</li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-gradient-color1 bg-sunny-morning"/>
                                                            </li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-gradient-color2 bg-tempting-azure"/>
                                                            </li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-gradient-color3 bg-amy-crisp"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-gradient-color4 bg-mean-fruit"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-gradient-color5 bg-malibu-beach"/>
                                                            </li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-gradient-color6 bg-ripe-malin"/></li>
                                                            <li className="list-inline-item"><span
                                                                className="sidebar-gradient-color7 bg-plum-plate"/></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div className="row Default-font">
                                        <div className="col">
                                            <h5 className="pb-2">Font Style</h5>
                                        </div>
                                        <div className="col text-end">
                                            <a className="reset text-white bg-dark font-Default">Reset Default</a>
                                        </div>
                                    </div>
                                    <ul className="list-inline-item list-unstyled font-family border-0 p-0">
                                        <li className="list-inline-item roboto-font">Roboto</li>
                                        <li className="list-inline-item poppins-font">Poppins</li>
                                        <li className="list-inline-item montserrat-font">Montserrat</li>
                                        <li className="list-inline-item inter-font">Inter</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/*theme settings*/}
            {exclusionArray.indexOf(url) >= 0 ? "" : <div className="sidebar-contact">
                <div className="toggle" data-bs-toggle="modal" data-bs-target="#settings"><i
                    className="fa fa-cog fa-w-16 fa-spin fa-2x"/></div>
            </div>}
        </>
    );
}
export default AppUniversal;
