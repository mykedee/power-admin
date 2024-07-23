const CardContainer = ({ children }) => {
	return (
		<div className="min-h-full rounded pt-16 w-full lg:ml-[15vw] mx-auto">
			<div className="w-11/12 md:w-10/12 lg:w-10/12 mx-auto">{children}</div>
		</div>
	);
};

export default CardContainer;
