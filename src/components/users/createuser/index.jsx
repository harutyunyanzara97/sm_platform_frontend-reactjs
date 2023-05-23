import React, {useEffect, useState} from 'react';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Select from 'react-select';
import {BASE_URL} from "../../../config/config";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Swal from "sweetalert2";

const CreateUser =()=> {

  const [email, setEmail] = useState('');
  const [selected, setSelected] = useState('');
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');
	const [isActive, setIsActive] = useState(0)


  useEffect(() => {
    fetch(`${BASE_URL}product`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setProducts(data.data.products)
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
    const user = {
      email: email,
      password: password,
      product_id: selected.value,
		active_flag: isActive
    };

    let errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    if (!password) {
      errors.password = 'Password is required';
    }
    if(!selected.value) {
      errors.product_id = "Product is required"
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      fetch(`${BASE_URL}user/create`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })
          .then(response => response.json())
          .then(jsondata => Swal.fire(jsondata.message))
      setEmail('');
      setPassword('');
      setSelected('');
    }
  }

  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

    return(
<>
  {/* Page Wrapper */}
  <div className="page-wrapper">
  <Helmet>
      <title>Dashboard - CRMS admin Template</title>
      <meta name="description" content="Reactify Blank Page" />
  </Helmet>
    <div className="content container-fluid">
      <div className="row">
        <div className="crms-title row bg-white">
          <div className="col ">
            <h3 className="page-title m-0">
                  <span className="page-title-icon bg-gradient-primary text-white me-2">
                    <i className="feather-smartphone" />
                  </span> Create Users </h3>
          </div>
        </div>
        <div className="col-xl-8 offset-xl-2">
          <form
              onSubmit={handleSubmit}
          >
          <div className="card">
            <div className="card-body">
              <div className="bank-inner-details">
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Email<span className="text-danger">*</span>
                      </label>
                      <input type="email"
                             className="form-control"
                             name="email"
                             value={email} onChange={(event) => setEmail(event.target.value)}
                      />
                      {errors.email && <span style={{color: "red"}} >{errors.email}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>
                        Password<span className="text-danger">*</span>
                      </label>
                      <input type="password"
                             className="form-control"
                             name="password"
                             value={password} onChange={(event) => setPassword(event.target.value)}
                      />
                      {errors.password && <span style={{color: "red"}}>{errors.password}</span>}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group modal-select-box">
                      <label>Product</label>
                      <Select
                          placeholder = "Select"
                          onChange={handleChange}
                          options={
                            products.map(el => {
                              return {
                                label: el.name,
                                value: el.id
                              }
                            })
                          }
                      />
                      {errors.product_id && <span style={{color: "red"}}>{errors.product_id}</span>}
                    </div>
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
                  <div className=" blog-categories-btn pt-0">
                    <div className="bank-details-btn ">
                      <button type="submit" onClick={handleSubmit} className="btn btn-primary me-2">
                        Add User
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
  </div>

  {/* /Page Wrapper */}
  {/* /Main Wrapper */}
  {/* Modal */}
  <div className="modal fade confirmModal" tabIndex={-1} aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content p-3">
        <div className="modal-header border-bottom-0">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
          <div className="text-center">
            <h5 className="mb-3">Confirm Save Changes</h5>
            <button
              type="button"
              className="btn btn-dark w-md"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary w-md"
              data-bs-dismiss="modal"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

    )
}
export default CreateUser;
