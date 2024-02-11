import React from "react";
// import { Alert } from 'react-bootstrap'

const Message = ({ variant, children }) => {
	return <div variant={variant}>{children}</div>;
};

Message.defaultProps = {
	variant: "info",
};

export default Message;
