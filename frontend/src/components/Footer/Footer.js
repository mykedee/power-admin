import React from "react";
import { FaGithub, FaInstagram, FaLinkedinIn,  } from "react-icons/fa";

const Footer = () => {
	return (
    <footer className="p-5 pt-20">
      <p className="text-xs text-center text-slate-700 dark:text-zinc-50 py-3">
        powerAmin V1. Made with ❤️ by Adedeji Olalekan
      </p>
      <div className="flex justify-center space-x-4 ">
        <a
          href="https://www.instagram.com/mista_lakes/"
          target="_blank"
          rel="noreferrer"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/olalekan-adedeji-2053b4196"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedinIn size={20} />
        </a>
        <a
          href="https://gitthub.com/mykedee/power-admin"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
