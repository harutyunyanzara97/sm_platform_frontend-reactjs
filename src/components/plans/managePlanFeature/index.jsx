import React, {useState, useEffect} from 'react';
import {BASE_URL} from "../../../config/config";
import {Helmet} from "react-helmet";
import Swal from "sweetalert2";

function ManagePlanFeature() {
	const [plans, setPlans] = useState([]);
	const [features, setFeatures] = useState([]);
	const [modalFeature, setModalFeature] = useState({})
	const token = localStorage.getItem('token');
	const [selected, setSelected] = useState([])



	const toggleEditModal = (feature) => {
		setModalFeature({...feature})
		const selectedValue = plans.find(({id}) => id === feature.plan_id);
		setSelected({label: selectedValue?.name, value: selectedValue?.id});
		document.querySelector('.modal-backdrop').style.display = "inline";
		document.getElementById("edit-blog-categories").style.display = "block";
	}

	const handleNameChange = (event) => {
		setModalFeature({ ...modalFeature, param_name: event.target.value})
	};

	const handleDescriptionChange = (event) => {
		setModalFeature({ ...modalFeature, param_description: event.target.value})
	};

	const handleLimitChange = (event) => {
		setModalFeature({ ...modalFeature, param_limit: event.target.value})
	};

	const handleAlertlevelChange = (event) => {
		setModalFeature({ ...modalFeature, param_alert_level: event.target.value})
	};

	const handleTypeChange = (event) => {
		setModalFeature({ ...modalFeature, param_type: event.target.value})
	};

	const handleStatusChange = () => {
		setModalFeature({ ...modalFeature, param_flag: !modalFeature?.param_flag})
	};


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


		fetch(`${BASE_URL}plan/features`, {
			headers: {'Authorization': `Bearer ${token}`}
		})
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then(data => {
				setFeatures(data.data.planFeatures)
			})
			.catch(error => {
				console.error('There was a problem with the fetch operation:', error);
				if (error instanceof SyntaxError) {
					console.error('The response was not valid JSON');
				}
			});
	}, [])
	console.log(features);


	// useEffect(() => {
	// 	setModalFeature({...modalFeature})
	// },[])
	const editFeatures = async () => {

		await fetch(`${BASE_URL}plan/feature`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify(modalFeature)
		})
			.then(response => response.json())
			.then((data) => {
				console.log(data,'gtfhg');
				Swal.fire(data.message)
				const findIndex = features.findIndex(({id}) => id === data.data.id)
				features[findIndex] = data.data
				setFeatures([...features]);
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
                                    </span> Manage Features </h3>
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
										<th>Limit</th>
										<th>Alert level</th>
										<th>Type</th>
										<th>Flag</th>
										<th>Action</th>
									</tr>
									</thead>
									<tbody>
									{features.map(feature => (
										<tr key={feature.id}>
											<td>{feature.param_name}</td>
											<td>{feature.param_description}</td>
											<td>{feature.param_limit}</td>
											<td>{feature.param_alert_level}</td>
											<td>{feature.param_type}</td>
											<td>{!!feature.param_flag ? "Active" : "InActive"}</td>
											<td>
												<div>
													<a
														className="me-1 btn btn-sm bg-success-light"
														data-bs-toggle="modal"
														data-bs-target="#edit-blog-categories"
														onClick={() => toggleEditModal(feature)}
													>
														<i className="feather-edit-3 me-1"/> Edit
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
								<h4 className="mb-0 text-dark fw-bold">Edit Feature</h4>
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
												value={modalFeature?.param_name}
												onChange={handleNameChange}
											/>
										</div>
										<div className="form-group">
											<label>
												Description<span className="text-danger">*</span>
											</label>
											<textarea
												className="form-control"
												value={modalFeature?.param_description}
												onChange={handleDescriptionChange}
											/>
										</div>
										<div className="form-group">
											<label>
												Alert level<span className="text-danger">*</span>
											</label>
											<textarea
												className="form-control"
												value={modalFeature?.param_alert_level}
												onChange={handleAlertlevelChange}
											/>
										</div>
										<div className="form-group">
											<label>
												Alert level<span className="text-danger">*</span>
											</label>
											<textarea
												className="form-control"
												value={modalFeature?.param_limit}
												onChange={handleLimitChange}
											/>
										</div>

										<div className="form-group">
											<label>
												Type<span className="text-danger">*</span>
											</label>
											<textarea
												className="form-control"
												value={modalFeature?.param_type}
												onChange={handleTypeChange}
											/>
										</div>
									</div>
									<div className="col-lg-12 col-md-12">
										<div className="status-toggle">
											<input
												id="rating_6"
												className="check"
												type="checkbox"
												checked={!!modalFeature?.param_flag}
												onChange={() => handleStatusChange(modalFeature?.param_flag)}
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
								<a
									href="#"
									data-bs-dismiss="modal"
									className="btn btn-primary me-2"
									onClick={() => editFeatures()}
								>
									Edit Feature
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ManagePlanFeature;
