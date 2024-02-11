import React from "react";

const CardContainer = ({ children }) => {
	return (
		<div className="h-full rounded my-24 w-full md:ml-[18vw] lg:ml-[20vw] mx-auto">
			<div className="w-11/12 md:w-9/12 lg:w-10/12 mx-auto">{children}</div>
		</div>
	);
};

export default CardContainer;
