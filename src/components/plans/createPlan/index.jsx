import React, {useEffect, useState} from "react"
import {Helmet} from "react-helmet";
import {BASE_URL} from "../../../config/config";
import Swal from "sweetalert2";
import Select from "react-select";

function CreatePlan() {

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [product_id, setProduct] = useState('');
	const [selected, setSelected] = useState('');
	const [products, setProducts] = useState([]);
	const token = localStorage.getItem('token');

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
	const handleChange = (selectedOption) => {
		setSelected(selectedOption);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const plan = {
			name: name,
			description: description,
			product_id: selected.value
		};
		// Validation logic
		let errors = {};
		if (!name) {
			errors.name = 'Name is required';
		}
		if (!description) {
			errors.description= 'Description is required';
		}
		if(!selected.value) {
			errors.product_id = "Product is required"
		}
		// Set errors state
		setErrors(errors);

		// Submit form if no errors
		if (Object.keys(errors).length === 0) {
			fetch(`${BASE_URL}plan/create`, {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(plan)
			})
				.then(response => response.json())
				.then(jsondata => Swal.fire(jsondata.message))
				.catch(error => {
					console.error('There was a problem creating the plan:', error);
				});

			setName('');
			setDescription('');
			setProduct('');
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
                  </span> Create Plans </h3>
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
														{errors.description && <span style={{color: "red"}}>{errors.description}</span>}

													</div>
												</div>
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
										</div>
										<div className=" blog-categories-btn pt-0">
											<div className="bank-details-btn ">
												<button type="submit" onClick={handleSubmit} className="btn btn-primary me-2">
													Add Plan
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

export default CreatePlan
