import React, {useState, useEffect} from 'react';
import {BASE_URL} from "../../../config/config";
import Select from 'react-select';
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";
const auth_user = JSON.parse(localStorage.getItem('user'));


function ManageUser() {

    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [email, setEmail] = useState('');
    const [user, setUser] = useState({});
    const [selected, setSelected] = useState('');
    const [user_id, setUserId] = useState('');
	const [modalUser, setModalUser] = useState({});
	const token = localStorage.getItem('token');

    const toggleDeleteModal = (id) => {
        setUserId(id)
        Swal.fire({
            title: 'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonText: 'Ok',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return fetch(`${BASE_URL}user/${id}`, {
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
                setUsers(users.filter(user => user.id !== id))
            }
        })
    }

    const toggleEditModal = (user) => {
        setModalUser(user);

        const selectedValue = products.find(({id}) => id === user.product_id);
        setSelected({label: selectedValue?.name, value: selectedValue?.id});

        document.querySelector('.modal-backdrop').style.display = "inline";
        document.getElementById("edit-blog-categories").style.display = "block";
    }
    const handleProductChange = (selectedOption) => {
        setSelected(selectedOption);
    };
    const handleEmailChange = (event) => {
        setModalUser({...modalUser, email: event.target.value})
    }

	const handleStatusChange = () => {
		setModalUser({ ...modalUser, active_flag: !modalUser?.active_flag})
	};

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

        fetch(`${BASE_URL}user`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
            .then(response => {
                console.log(response);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data.data.users)
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                if (error instanceof SyntaxError) {
                    console.error('The response was not valid JSON');
                }
            });
    }, [])

	useEffect(() => {
		setModalUser({...modalUser})
	},[])
    const editUser = () => {
        const updatedUser = {
            ...modalUser,
            id: modalUser.id,
            product_id: selected.value,
            email: email || modalUser.email,
        };

        fetch(`${BASE_URL}user/${user_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedUser)
        })
            .then(response => response.json())
			.then(( data ) => {
				Swal.fire(data.message)
				const findIndex = users.findIndex(({id}) => id === data.data.user.id)
                users[findIndex] = data.data.user
				setUsers([...users]);
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
                {/* Page Header */}
                <div className="page-header">
                    <div className="page-header">
                        <div className="crms-title row bg-white">
                            <div className="col ">
                                <h3 className="page-title m-0"><span
                                    className="page-title-icon bg-gradient-primary text-white me-2">
                                        <i className="feather-smartphone"/>
                               </span> Manage Users </h3>
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
                                        <th>Email</th>
                                        <th>Product</th>
                                        <th>Action</th>
										<th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { users.map(user => (
                                        auth_user.email !== user.email ?
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.Product?.name}</td>
											<td>{!!user.active_flag ? "Active" : "InActive"}</td>
											<td>
                                                <div>
                                                    <a
                                                        className="me-1 btn btn-sm bg-success-light"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#edit-blog-categories"
                                                        onClick={() => toggleEditModal(user)}
                                                    >
                                                        <i className="feather-edit-3 me-1"/> Edit
                                                    </a>
                                                    <a
                                                        className="me-1 btn btn-sm bg-danger-light"
                                                        onClick={() => toggleDeleteModal(user.id)}
                                                    >
                                                        <i className="feather-trash-2 me-1"/> Delete
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                            : <tr></tr>
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
                                <h4 className="mb-0 text-dark fw-bold">Edit User</h4>
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
                                                Email<span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={modalUser?.email}
                                                onChange={handleEmailChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <label>
                                                Product
                                                <span className="text-danger">*</span>
                                            </label>
                                            <Select
                                                value={selected}
                                                placeholder="Select"
                                                onChange={handleProductChange}
                                                options={
                                                    products.map(el => {
                                                        return {
                                                            label: el?.name,
                                                            value: el?.id
                                                        }
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
									<div className="status-toggle">
										<input
											id="rating_6"
											className="check"
											type="checkbox"
											checked={!!modalUser?.active_flag}
											onChange={() => handleStatusChange(modalUser?.active_flag)}
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
                        <div className="modal-footer blog-categories-btn">
                            <div className="bank-details-btn ">
                                <a
                                    href="#"
                                    data-bs-dismiss="modal"
                                    className="btn btn-primary me-2"
                                    onClick={() => editUser(user)}
                                >
                                    Edit user
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManageUser;
