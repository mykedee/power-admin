import React from "react";

const Careers = () => {
	return (
		<div>
			<div className="relative group">
				<div className="bg-black h-[300px]  md:h-[500px] opacity-90 w-full top-0 right-0 left-0 bottom-0  overflow-hidden">
					<div className=" w-40 absolute right-0 left-0 top-1/2 bottom-1/2 mx-auto z-10">
						<h3 className="text-white opacity-100 bg-primary-green p-2 md:p-3 text-center rounded text-xl md:text-2xl font-bold">
							Careers
						</h3>
					</div>

					<img
						src="./images/careers.jpg"
						alt="careers"
						className="block h-[300px] md:h-[500px] object-cover overflow-hidden group-hover:scale-110  transition duration-300 ease-in-out"
					/>
				</div>
			</div>

			<div className="w-4/5 mx-auto">
				<h3 className="text-2xl font-bold text-center my-10">
					Join Our Growing Team and Cultivate Your Career in Agriculture
				</h3>
				<div className=" my-10">
					<p>
						At &nbsp;
						<span className="font-bold text-left md:text-center">
							BSOM Integrated Services
						</span>
						, we're sowing the seeds of innovation, sustainability, and growth
						in the agricultural industry. We believe that the key to a
						prosperous future lies in the dedication and passion of talented
						individuals who share our vision.
					</p>
					<h3 className="text-xl text-center font-bold py-10 text-primary-green">
						Why Choose a Career with Us?
					</h3>
					<div className="flex items-center flex-col md:flex-row">
						<div className="h-90 p-7 md:p-7 transition duration-300 ease-in-out bg-dash-bg rounded lg:h-96 my-3 mx-1 group hover:bg-primary-green hover:text-zinc-50">
							<h6 className="font-bold">
								<span className="relative rounded-full bg-primary-green  group-hover:bg-dash-bg group-hover:text-primary-green text-zinc-50 h-8 w-8 flex items-center justify-center text-left">
									<span className="">1.</span>
								</span>
								Innovative Environment
							</h6>
							<p>
								Be part of a team that thrives on innovation. We foster an
								environment that encourages creative thinking, embraces
								cutting-edge technology, and values forward-looking ideas that
								drive agricultural advancements.
							</p>
						</div>

						<div className="h-90 p-7 md:p-7 transition duration-300 ease-in-out bg-dash-bg rounded lg:h-96 my-3 mx-2 group hover:bg-primary-green hover:text-zinc-50">
							<h6 className="font-bold">
								<span className="relative rounded-full   bg-primary-green  group-hover:bg-dash-bg group-hover:text-primary-green text-zinc-50 h-8 w-8 flex items-center justify-center text-left">
									<span className="">2.</span>
								</span>
								Impactful Work
							</h6>
							<p>
								Your contributions matter. Join us in making a tangible impact
								on global agriculture. From sustainable farming practices to
								groundbreaking technological solutions, your work will directly
								shape the future of the industry.
							</p>
						</div>

						<div className="h-90 p-7 md:p-7 group transition duration-300 ease-in-out bg-dash-bg rounded lg:h-96 my-3 mx-2 hover:bg-primary-green hover:text-zinc-50">
							<h6 className="font-bold">
								<span className="relative rounded-full bg-primary-green group-hover:bg-dash-bg group-hover:text-primary-green text-zinc-50 h-8 w-8 flex items-center justify-center text-left">
									<span className="">3.</span>
								</span>
								Collaborative Culture
							</h6>
							<p>
								We believe in the power of collaboration. Work alongside experts
								and passionate individuals dedicated to creating a more
								sustainable and productive agricultural landscape.
							</p>
						</div>

						<div className="h-90 group transition duration-300 ease-in-out p-7 md:p-7 bg-dash-bg rounded lg:h-96 my-3 mx-2 hover:bg-primary-green hover:text-zinc-50">
							<h6 className="font-bold">
								<span className="relative rounded-full  bg-primary-green group-hover:bg-dash-bg group-hover:text-primary-green text-zinc-50 h-8 w-8 flex items-center justify-center text-left">
									<span className="">4.</span>
								</span>
								Continuous Growth
							</h6>
							<p>
								Your career growth matters to us. We offer opportunities for
								professional development, training, and mentorship to help you
								flourish in your role and expand your skill set.
							</p>
						</div>
					</div>
				</div>
				<div className="text-center">
					<button className="bg-primary-green hover:bg-primary-green-prelite transition duration-300 ease-in-out p-3 rounded text-zinc-50">
						See open roles below
					</button>
				</div>

				<div className="text-center my-10">
					<p>Sorry, we don't currently have any open positions.</p>
				</div>
			</div>
		</div>
	);
};

export default Careers;
