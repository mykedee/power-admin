import React from "react";
import Footer from "../Footer/Footer";

const CardContainer = ({ children }) => {
	return (
		<div className="min-h-full rounded my-4 w-full lg:ml-[20vw] mx-auto">
			<div className="w-11/12 md:w-10/12 lg:w-10/12 mx-auto">{children}</div>
			<Footer/>
		</div>
	);
};

export default CardContainer;
