import React, { Component } from 'react';
import '../styles/complaint-form.css'
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { isRequired, isNonEmpty, isCorrectLength, isNumber } from './validators';
import Input from './input';

class ComplaintForm extends Component {
	onSubmit = values => {
		return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
			method: 'POST',
			body: JSON.stringify(values),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				if (!res.ok) {
					if (
						res.headers.has('content-type') &&
						res.headers
							.get('content-type')
							.startsWith('application/json')
					) {
						return res.json().then(err => Promise.reject(err));
					}
					return Promise.reject({
						code: res.status,
						message: res.statusText
					});
				}
				return;
			})
			.then(() => console.log('Submitted with values', values))
			.catch(err => {
				const {reason, message, location} = err;
				if (reason === 'ValidationError') {
					// Convert ValidationErrors into SubmissionErrors for Redux Form
					return Promise.reject(
						new SubmissionError({
							[location]: message
						})
					);
				}
				return Promise.reject(
					new SubmissionError({
						_error: 'Error submitting message'
					})
				);
			});
	}

	render() {
		return(
			<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
				<label htmlFor="trackingNumber">Tracking Number</label>
				<Field className="form-field" name="trackingNumber" id="trackingNumber" component={Input} type="text" validate={[isRequired, isNonEmpty, isCorrectLength, isNumber]}/>
				<label htmlFor="issue">What is your issue?</label>
				<Field className="form-field" name="issue" id="issue" component="select" required>
					<option/>
					<option value="not-delivered">My Delivery hasn't arrived</option>
					<option value="wrong-item">The wrong item was delivered</option>
					<option value="missing-part">Part of my order was missing</option>
					<option value="damaged">Some of my order arrived damaged</option>
					<option value="other">Other (give details below)</option>
				</Field>
				<label htmlFor="details">Give more details (optional)</label>
				<Field className="form-field" name="details" id="details" component="textarea"/>
				<button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</button>
			</form>
		)
	}
}

export default reduxForm({
	form:'complaint'
})(ComplaintForm);


