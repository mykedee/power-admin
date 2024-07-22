import React from "react";
import { MdInfoOutline } from "react-icons/md";

const DialogBox = ({ handleSubmit, setOpen, dialogLabel, dialogInfo, buttonLabel }) => {
	const handleClose = () => setOpen(false);

	return (
    <div className="fixed top-0 bottom-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] w-full max-h-full overflow-y-scroll">
      <div className="w-11/12 md:w-5/12 lg:w-3/12 top-1/2 translate-y-1/2 mx-auto max-w-2xl">
        <div className="w-full relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
          <div className="w-9/12 text-center align-middle mx-auto">
            <div className="flex justify-center items-center  py-5">
              <MdInfoOutline
                className=" text-yellow-400 text-center align-super"
                size={50}
              />
            </div>

            <h6 className="font-bold text-lg">{dialogLabel}</h6>
            <p>{dialogInfo}</p>
            <div className="flex justify-center items-center mt-2 py-10 space-x-3  rounded-b right-0">
              <button
                id="edit-modal"
                className="p-3 text-sm rounded dark:bg-primary-orange dark:hover:bg-primary-orange-hover bg-primary-green text-white"
                onClick={handleSubmit}
              >
                {buttonLabel}
              </button>
              <button
                variant="secondary"
                onClick={handleClose}
                className="text-sm bg-danger-primary text-white hover:bg-danger-primary-hover p-3 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
