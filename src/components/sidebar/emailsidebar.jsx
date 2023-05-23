import React from "react";
import { Link, withRouter } from "react-router-dom";

const SidebarNav =()=> {
   return (
    <div className="sidebar" id="sidebar">
    <div className="sidebar-inner slimscroll">
      <form action="search.html" className="mobile-view">
        <input className="form-control" type="text" placeholder="Search here" />
        <button className="btn" type="button"><i className="fa fa-search" /></button>
      </form>
      <div className="sidebar-menu">
        <ul>
          <li> 
            <a href="/"><i className="fa fa-home" aria-hidden="true" /> <span>Back to Home</span></a>
          </li>
          <li className="active"> 
            <Link to="/email"><i className="fa fa-envelope menu-icon" aria-hidden="true" /> <span>Inbox <span className="mail-count">(21)</span></span></Link>
          </li>
          <li> 
            <a href="#"><i className="fa fa-star menu-icon" aria-hidden="true" /> <span>Starred</span></a>
          </li>
          <li> 
            <a href="#"><i className="fa fa-paper-plane menu-icon" aria-hidden="true" /> <span>Sent Mail</span></a>
          </li>
          <li> 
            <a href="#"><i className="fa fa-trash menu-icon" aria-hidden="true" /> <span>Trash</span></a>
          </li>
          <li> 
            <a href="#"><i className="fa fa-folder-open-o menu-icon" aria-hidden="true" /> <span>Draft <span className="mail-count">(8)</span></span></a>
          </li>
          <li className="menu-title xs-hidden">Label <a href="#" className="label-icon"><i className="fa fa-plus" /></a></li>
          <li className="xs-hidden"> 
            <a href="#"><i className="fa fa-circle text-success mail-label" /> Work</a>
          </li>
          <li className="xs-hidden"> 
            <a href="#"><i className="fa fa-circle text-danger mail-label" /> Office</a>
          </li>
          <li className="xs-hidden"> 
            <a href="#"><i className="fa fa-circle text-warning mail-label" /> Personal</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  );
}
export default withRouter(SidebarNav);
