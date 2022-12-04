import React from "react";
import "../css/Footer.css";

function Footer() {
  // in footer ,we put some fake url just for looking beautiful
  return (
    <footer className="footer  py-3 foot ">
      <div className="container row min-vw-100 ">
        <div className="col-sm-4"></div>

        <ul className="row col-sm-4 mx-auto">
          {/* eslint-disable-next-line */}
          <li className="col-sm-3">
            <a className="link" href="#">
              Privacy
            </a>{" "}
          </li>
          {/* eslint-disable-next-line */}
          <li className="col-sm-3">
            <a className="link" href="#">
              {" "}
              Security
            </a>
          </li>
          {/* eslint-disable-next-line */}
          <li className="col-sm-3">
            <a className="link" href="#">
              {" "}
              Contact us
            </a>
          </li>
          {/* eslint-disable-next-line */}
          <li className="col-sm-3">
            <a className="link" href="#">
              {" "}
              About
            </a>
          </li>
        </ul>

        <div className="col-sm-4"></div>

        <span className="footSpan">
          {" "}
          ©️ 2022 develop by Yin ying and Ling zhao
        </span>
      </div>
    </footer>
  );
}

export default Footer;
