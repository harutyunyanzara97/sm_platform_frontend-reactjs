import React, {useState, useEffect} from 'react';
import {BASE_URL} from "../../../config/config";
import Select from 'react-select';
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


function ManagePlan() {

	const [product, setProducts] = useState([]);
	const [plan, setPlan] = useState({});
	const [selected, setSelected] = useState('');
	const token = localStorage.getItem('token');
	const [plans, setPlans] = useState([]);
	const [name, setName] = useState();
	const [description, setDescription] = useState();
	const [modalPlan, setModalPlan] = useState({});

	const toggleDeleteModal = (id) => {
		Swal.fire({
			title: 'Are you sure you want to delete?',
			showCancelButton: true,
			confirmButtonText: 'Ok',
			showLoaderOnConfirm: true,
			preConfirm: (login) => {
				return fetch(`${BASE_URL}plan/${id}`, {
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
				setPlans(plans.filter(plan => plan.id !== id))
			}
		})
	}

	const toggleEditModal = (plan) => {
		setModalPlan(plan);

		const selectedValue = product.find(({id}) => id === plan.product_id);
		setSelected({ label: selectedValue.name, value: selectedValue.id })

		document.querySelector('.modal-backdrop').style.display = "inline";
		document.getElementById("edit-blog-categories").style.display = "block";
	}
	const handleProductChange = (selectedOption) => {
		setSelected(selectedOption);
	};
	const handleNameChange = (event) => {
		setModalPlan({ ...modalPlan, name: event.target.value})
	}
	const handleDescriptionChange = (event) => {
		setModalPlan({ ...modalPlan, description: event.target.value})
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

		fetch(`${BASE_URL}plan`, {
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
				setPlans(data.data.plans)
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
				if (error instanceof SyntaxError) {
					console.error('The response was not valid JSON');
				}
			});
	}, [])


	useEffect(() => {
		setModalPlan({...modalPlan})
	},[])
	const editPlan = () => {
		const updatedPlan = {
			...modalPlan,
			id: modalPlan.id,
			product_id: selected.value,
			name: name || modalPlan.name,
			description: description || modalPlan.description,
		};

		fetch(`${BASE_URL}plan`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(updatedPlan)
		})
			.then(response => response.json())
			.then(( data ) => {
				Swal.fire(data.message)
				const findIndex = plans.findIndex(({ id }) => id === data.data.id)
				plans[findIndex] = data.data
				setPlans([...plans]);
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
                               </span> Manage Plans </h3>
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
										<th>Action</th>
									</tr>
									</thead>
									<tbody>
									{plans.map(plan => (
										<tr key={plan.id}>
											<td>{plan.name}</td>
											<td>{plan.description}</td>
											<td>
												<div>
													<a
														className="me-1 btn btn-sm bg-success-light"
														data-bs-toggle="modal"
														data-bs-target="#edit-blog-categories"
														onClick={() => toggleEditModal(plan)}
													>
														<i className="feather-edit-3 me-1"/> Edit
													</a>
													<Link
														to={{
															pathname: `/pricing/${plan.id}`,
															state: { plans: plan }
														}}
													>
														<a className="me-1 btn btn-sm bg-primary" style={{color: "#fff"}}>
															Pricing
														</a>
													</Link>
													<a
														className="me-1 btn btn-sm bg-danger-light"
														onClick={() => toggleDeleteModal(plan.id)}
													>
														<i className="feather-trash-2 me-1"/> Delete
													</a>
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

			<div
				className="modal custom-modal fade bank-details"
				id="edit-blog-categories"
				role="dialog"
			>
				<div className="modal-dialog modal-dialog-centered modal-md">
					<div className="modal-content">
						<div className="modal-header">
							<div className="form-header text-start mb-0">
								<h4 className="mb-0 text-dark fw-bold">Edit Plan</h4>
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
												value={modalPlan?.name}
												onChange={handleNameChange}
											/>
										</div>
									</div>
									<div className="col-lg-12 col-md-12">
										<div className="form-group">
											<label>
												Description<span className="text-danger">*</span>
											</label>
											<input
												type="text"
												className="form-control"
												value={modalPlan?.description}
												onChange={handleDescriptionChange}
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
													product.map(el => {
														return {
															label: el.name,
															value: el.id
														}
													})
												}
											/>
										</div>
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
									onClick={() => editPlan(plan)}
								>
									Edit plan
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ManagePlan;
