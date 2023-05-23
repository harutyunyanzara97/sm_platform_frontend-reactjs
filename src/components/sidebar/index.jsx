import React from "react";
import {Link, withRouter} from "react-router-dom";
import {avatar17} from '../imagepath';

const SidebarNav = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user.type);
    const exclusionArray = ["login", "register", "forgot-password", "error-404", "error-500", "email", "mail-view", "components"];
    if (
        exclusionArray.indexOf(props.location.pathname.split("/")[1]) >= 0
    ) {
        return "";
    }
    const {location} = props
    let pathname = location.pathname
    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-inner slimscroll">
                <form action="search.html" className="mobile-view">
                    <input className="form-control" type="text" placeholder="Search here"/>
                    <button className="btn" type="button"><i className="fa fa-search"/></button>
                </form>
                <div id="sidebar-menu" className="sidebar-menu">
                    {
                        user.type === "superAdmin" ?

                            <ul>
                                <li className="nav-item nav-profile">
                                    <a className="nav-link">
                                        <div className="nav-profile-image">
                                            <img src={avatar17} alt="profile"/>
                                        </div>
                                        <div className="nav-profile-text d-flex flex-column">
                                            <span className="font-weight-bold mb-2">David Grey. H</span>
                                            <span className="text-white text-small">Project Manager</span>
                                        </div>
                                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"/>
                                    </a>
                                </li>
                                <li className="menu-title">
                                    <span>Main</span>
                                </li>
                                <li className="submenu">
                                    <a className={`${pathname === "/user" ? "active subdrop" : ""}`}><i
                                        className="feather-grid"/> <span>Users</span> <span className="menu-arrow"/></a>
                                    <ul className="sub-menus">
                                        <li><Link to="/create-user"
                                                  className={`${pathname === "/create-user" ? "active" : ""}`}
                                        >Create
                                            Users</Link></li>
                                        <li><Link to="/manage-user"
                                                  className={`${pathname === "/manage-user" ? "active" : ""}`}>Manage
                                            Users</Link></li>
                                    </ul>
                                </li>
                                <li className="submenu">
                                    <a className={`${pathname === "/product" || pathname === "/create-product" ||
                                    pathname === "/create-product" || pathname === "create-product" ? "active subdrop" : ""}`}><i
                                        className="feather-grid"/> <span>Products</span> <span className="menu-arrow"/></a>
                                    <ul className="sub-menus">
                                        <li><Link to="/create-product"
                                                  className={`${pathname === "/create-product" ? "active" : ""}`}>Create
                                            Products</Link></li>
                                        <li><Link to="/manage-product"
                                                  className={`${pathname === "/manage-product" ? "active" : ""}`}>Manage
                                            Products</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className={`${pathname.includes("contacts") ? "active " : ""}`}
                                          to="/customers"><i
                                        className="feather-smartphone"/> <span>Customers</span></Link>
                                </li>
                                <li>
                                    <Link className={`${pathname === "/projects" ? "active" : ""}`}
                                          to="/transactions"><i
                                        className="feather-grid"/> <span>Transactions </span></Link>
                                </li>
                                <li>
                                    <Link className={`${pathname.includes("activities") ? "active" : ""}`}
                                          to="/subscriptions"><i
                                        className="feather-calendar"/> <span>Subscriptions</span></Link>
                                </li>
                            </ul>
                            :

                            <ul>
                                <li className="nav-item nav-profile">
                                    <a className="nav-link">
                                        <div className="nav-profile-image">
                                            <img src={avatar17} alt="profile"/>
                                        </div>
                                        <div className="nav-profile-text d-flex flex-column">
                                            <span className="font-weight-bold mb-2">David Grey. H</span>
                                            <span className="text-white text-small">Project Manager</span>
                                        </div>
                                        <i className="mdi mdi-bookmark-check text-success nav-profile-badge"/>
                                    </a>
                                </li>
                                <li className="menu-title">
                                    <span>Main</span>
                                </li>
                                <li className="submenu">
                                    <a className={`${pathname === "/product" || pathname === "/create-product" ||
                                    pathname === "/create-product" || pathname === "create-product" ? "active subdrop" : ""}`}><i
                                        className="feather-grid"/> <span>Products</span> <span className="menu-arrow"/></a>
                                    <ul className="sub-menus">
                                        <li><Link to="/manage-product"
                                                  className={`${pathname === "/manage-product" ? "active" : ""}`}>Manage
                                            Products</Link></li>
                                    </ul>
                                </li>
                                <li className="submenu">
                                    <a className={`${pathname === "/user" ? "active subdrop" : ""}`}><i
                                        className="feather-grid"/> <span>Plans</span> <span className="menu-arrow"/></a>
                                    <ul className="sub-menus">
                                        <li><Link to="/create-plan"
                                                  className={`${pathname === "/create-plan" ? "active" : ""}`}
                                        >Create
                                            Plans</Link></li>
                                        <li><Link to="/manage-plan"
                                                  className={`${pathname === "/manage-plan" ? "active" : ""}`}>Manage
                                            Plans</Link></li>
										<li><Link to="/create-plan-feature"
												  className={`${pathname === "/create-plan-feature" ? "active" : ""}`}>Plan Feature master
											</Link></li>
										<li><Link to="/manage-plan-feature"
												  className={`${pathname === "/manage-plan-feature" ? "active" : ""}`}>Plan Feature manage
										</Link></li>
                                        <li><Link to="/create-price"
                                                  className={`${pathname === "/create-price" ? "active" : ""}`}>Create Pricing
                                        </Link></li>
                                        <li><Link to="/pricing"
                                                  className={`${pathname === "/pricing" ? "active" : ""}`}>Pricing List
                                        </Link></li>

                                    </ul>
                                </li>
                                <li className="submenu">
                                    <a className={`${pathname === "/discount" ? "active subdrop" : ""}`}><i
                                        className="feather-grid"/> <span>Discount</span> <span className="menu-arrow"/></a>
                                    <ul className="sub-menus">
                                        <li><Link to="/create-discount"
                                                  className={`${pathname === "/create-discount" ? "active" : ""}`}
                                        >Create
                                            Discount</Link></li>
                                        <li><Link to="/manage-discount"
                                                  className={`${pathname === "/manage-discount" ? "active" : ""}`}>Manage
                                            Discount</Link></li>
                                    </ul>
                                </li>
                                <li>
                                    <Link className={`${pathname.includes("activities") ? "active" : ""}`}
                                          to="/subscriptions"><i
                                        className="feather-calendar"/> <span>Subscriptions</span></Link>
                                </li>
                                <li>
                                    <Link className={`${pathname.includes("contacts") ? "active " : ""}`}
                                          to="/customers"><i
                                        className="feather-smartphone"/> <span>Customers</span></Link>
                                </li>
                                <li>
                                    <Link className={`${pathname === "/projects" ? "active" : ""}`}
                                          to="/transactions"><i
                                        className="feather-grid"/> <span>Transactions </span></Link>
                                </li>

                            </ul>
                    }
                </div>
            </div>
        </div>
    );
}
export default withRouter(SidebarNav);
