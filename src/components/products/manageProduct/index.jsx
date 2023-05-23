import React, {useState, useEffect} from 'react';
import {BASE_URL} from "../../../config/config";
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


function ManageProduct() {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem('token');
	const [modalProduct, setModalProduct] = useState({})
    const user = JSON.parse(localStorage.getItem('user'));


    const handleNameChange = (event) => {
        setModalProduct({ ...modalProduct, name: event.target.value})
    };

    const handleDescriptionChange = (event) => {
        setModalProduct({ ...modalProduct, description: event.target.value})
    };

    const handleStatusChange = () => {
        setModalProduct({ ...modalProduct, active_flag: !modalProduct?.active_flag})
    };

    const toggleDeleteModal = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return fetch(`${BASE_URL}product/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()

        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Successfully deleted')
                setProducts(products.filter(product => product.id !== id))
            }
        })
    }
    const toggleEditModal = (product) => {
        setModalProduct({...product})
        document.querySelector('.modal-backdrop').style.display = "inline";
        document.getElementById("edit-blog-categories").style.display = "block";
    }

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

    const editProduct = async () => {
        await fetch(`${BASE_URL}product`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(modalProduct)
        })
            .then(response => response.json())
            .then((data) => {
                Swal.fire(data.message)
                const findIndex = products.findIndex(({id}) => id === data.data.product.id)
                products[findIndex] = data.data.product
                setProducts([...products]);
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
                <div className="page-header">
                    <div className="page-header">
                        <div className="crms-title row bg-white">
                            <div className="col ">
                                <h3 className="page-title m-0"><span
                                    className="page-title-icon bg-gradient-primary text-white me-2">
                                        <i className="feather-smartphone"/>
                                    </span> Manage Products </h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table
                                    className="table"
                                    style={{overflowX: "auto"}}
                                >
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Description</th>
                                            <th>Flag</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{!!product.active_flag ? "Active" : "InActive"}</td>
                                            <td>
                                                <div>
                                                    <a
                                                        className="me-1 btn btn-sm bg-success-light"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-blog-categories"
                                                        onClick={() => toggleEditModal(product)}
                                                    >
                                                        <i className="feather-edit-3 me-1"/> Edit
                                                    </a>
                                                    {user.type === "superAdmin" ?
                                                    <a
                                                        className="me-1 btn btn-sm bg-danger-light"
                                                        onClick={() => toggleDeleteModal(product.id)}
                                                    >
                                                        <i className="feather-trash-2 me-1"/> Delete
                                                    </a>
                                                        : ''
                                                    }
                                                    <Link to="manage-plan-feature">
                                                        <a className="me-1 btn btn-sm bg-primary" style={{color: "#fff"}}>
                                                    Features
                                                        </a>
                                                    </Link>
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
                                <h4 className="mb-0 text-dark fw-bold">Edit Product</h4>
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
                                                Name<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modalProduct?.name}
                                                onChange={handleNameChange}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>
                                                Description<span className="text-danger">*</span>
                                            </label>
                                            <textarea
                                                className="form-control"
                                                value={modalProduct?.description}
                                                onChange={handleDescriptionChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="status-toggle">
                                            <input
                                                id="rating_6"
                                                className="check"
                                                type="checkbox"
                                                checked={!!modalProduct?.active_flag}
                                                onChange={() => handleStatusChange(modalProduct?.active_flag)}
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
                            </div>
                        </div>
                        <div className="modal-footer blog-categories-btn">
                            <div className="bank-details-btn ">
                                <a
                                    href="#"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary me-2"
                                    onClick={() => editProduct()}
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

export default ManageProduct;

