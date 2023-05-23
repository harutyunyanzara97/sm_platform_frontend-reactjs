import React, {useState} from "react"
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../../config/config";
import Swal from "sweetalert2";
import ManageProduct from "../manageProduct";

function CreateProduct() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('token');
    const [isActive, setIsActive] = useState(0)

    const handleToggle = () => {
        setIsActive(!isActive);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const product = {
            name: name,
            description: description,
            active_flag: isActive
        };
        // Validation logic
        let errors = {};
        if (!name) {
            errors.name = 'Name is required';
        }
        if (!description) {
            errors.description = 'Description is required';
        }


        // Set errors state
        setErrors(errors);

        // Submit form if no errors
        if (Object.keys(errors).length === 0) {
            fetch(`${BASE_URL}product/create`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            })
                .then(response => {
                    if (!response.ok) {
                        Swal.fire('Something went wrong');
                    } else {
                        Swal.fire('Product created successfully!');
                    }
                })
                .catch(error => {
                    console.error('There was a problem creating the product:', error);
                });

            setName('');
            setDescription('');
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
                  </span> Create Products </h3>
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
                                                        Name<span className="text-danger">*</span>
                                                    </label>
                                                    <input type="text"
                                                           className="form-control"
                                                           name="name"
                                                           value={name}
                                                           onChange={(event) => setName(event.target.value)}
                                                    />
                                                    {errors.name && <span style={{color: "red"}}>{errors.name}</span>}

                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-12">
                                                        <label className="col-form-label">Description </label>
                                                        <textarea className="form-control" rows={3} id="description"
                                                                  placeholder="Description"
                                                                  value={description}
                                                                  onChange={(event) => setDescription(event.target.value)}
                                                        />
                                                        {errors.description &&
                                                            <span style={{color: "red"}}>{errors.description}</span>}
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
                                        </div>
                                        <div className=" blog-categories-btn pt-0">
                                            <div className="bank-details-btn ">
                                                <button type="submit" onClick={handleSubmit}
                                                        className="btn btn-primary me-2">
                                                    Add Product
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
    )
}
export default CreateProduct