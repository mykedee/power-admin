import React from "react";
// import { Col, Row, Container } from 'react-bootstrap'

const FormContainer = ({ children }) => {
	return (
		<div>
			<div className="justify-content-md-center">
				<div xs={12} sm={12} md={5}>
					{children}
				</div>
			</div>
		</div>
	);
};

export default FormContainer;
