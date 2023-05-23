import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../../config/config";
import Swal from "sweetalert2";
import Select from "react-select";

function CreatePlanFeatures() {

	const token = localStorage.getItem('token');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [limit, setLimit] = useState(0);
	const [alert_level, setAlertLevel] = useState(0);
	const [selected, setSelected] = useState('');
	const [type, setType] = useState('');
	const [plans, setPlans] = useState([]);
	const [isActive, setIsActive] = useState(false)

	const handleToggle = () => {
		setIsActive(1);
	}
	const handleChange = (selectedOption) => {
		setSelected(selectedOption);
	};
	useEffect(() => {
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
	const handleSubmit = (event) => {
		event.preventDefault();
		const feature = {
			"param_name": name,
			"param_type": type,
			"param_description": description,
			"param_limit": limit,
			"param_alert_level": alert_level,
			"param_flag": isActive,
			"plan_id": selected.value,
		};
		// Validation logic
		let errors = {};

		if (!name) {
			errors.name = 'Name is required';
		}
		if (!description) {
			errors.descrption = 'Description is required';
		}
		if (!limit) {
			errors.limit = 'Limit is required';
		}
		if (!alert_level) {
			errors.level = 'Alert level is required';
		}
		if (!selected.value) {
			errors.plan_id = "Plan is required"
		}
		if (!type) {
			errors.type = "Type is required"
		}

		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			fetch(`${BASE_URL}plan/feature/create`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(feature)

			})
				.then(response => {
					if (!response.ok) {
						Swal.fire('Something went wrong');
					} else {
						Swal.fire('Feature created successfully!');
					}
				})
				.catch(error => {
					console.error('There was a problem creating the product:', error);
				});

			setName('')
			setDescription('')
			setLimit('')
			setAlertLevel('')
			setType('')
			setIsActive('')
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
                  </span> Create Feature </h3>
						</div>
						<div className="col text-end">
							<ul className="breadcrumb bg-white float-end m-0 pl-0 pr-0">
								<li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
								<li className="breadcrumb-item active">Contacts</li>
							</ul>
						</div>
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
													Name
												</label>
												<input type="text"
													   className="form-control"
													   name="date"
													   value={name}
													   onChange={(event) => setName(event.target.value)}
												/>
											</div>
										</div>
										{errors.name && <span style={{color: "red"}}>{errors.name}</span>}
										<div className="col-lg-12 col-md-12">
											<div className="form-group">
												<label>
													Description
												</label>
												<textarea
													   className="form-control"
													   name="description"
													   value={description}
													   onChange={(event) => setDescription(event.target.value)}
												/>
											</div>
											{errors.descrption &&
												<span style={{color: "red"}}>{errors.descrption}</span>}
										</div>
										<div className="col-lg-12 col-md-12">
											<div className="form-group">
												<label>
													Type
												</label>
												<input type="text"
													   className="form-control"
													   name="type"
													   value={type}
													   onChange={(event) => setType(event.target.value)}
												/>
											</div>
											{errors.type &&
												<span style={{color: "red"}}>{errors.type}</span>}
										</div>
										<div className="col-lg-12 col-md-12">
											<div className="form-group">
												<label>
													Limit
												</label>
												<input type="number"
													   className="form-control"
													   name="limit"
													   value={limit}
													   onChange={(event) => setLimit(event.target.value)}
												/>
											</div>
											{errors.limit &&
												<span style={{color: "red"}}>{errors.limit}</span>}
										</div>
										<div className="col-lg-12 col-md-12">
											<div className="form-group">
												<label>
													Alert level
												</label>
												<input type="text"
													   className="form-control"
													   name="alert"
													   value={alert_level}
													   onChange={(event) => setAlertLevel(event.target.value)}
												/>
											</div>
											{errors.alert && <span style={{color: "red"}}>{errors.alert}</span>}
										</div>
										<div className="form-group modal-select-box">
											<label>Plan</label>
											<Select
												placeholder = "Select"
												onChange={handleChange}
												options={
													plans.map(el => {
														return {
															label: el.name,
															value: el.id
														}
													})
												}
											/>
											{errors.plan_id && <span style={{color: "red"}}>{errors.plan_id}</span>}
										</div>
									</div>
									<div className="col-lg-12 col-md-12">
										<div className="form-group">
											<div className="status-toggle">
												<input
													id="rating_6"
													className="check"
													type="checkbox"
													checked={isActive} onChange={handleToggle}
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
											<button type="submit"
													onClick={handleSubmit}
													className="btn btn-primary me-2">
												Add feature
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
	)
}

export default CreatePlanFeatures;
