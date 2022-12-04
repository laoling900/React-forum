import React from "react";

function checkPassword(password) {
  let validateResult;

  //password contains one of upper case letters，Lowercase letters，number or ！？%
  const weekPassword = new RegExp(/^[a-z|A-Z|0-9|\W_]+$/);

  //password contains two of upper case letters，Lowercase letters，number or ！？%
  const okayPassword = new RegExp(
    /^(?![A-Z]+$)(?![a-z]+$)(?![0-9]+$)(?![\W_]+$)[a-zA-Z|a-z0-9|a-z\W_|A-Z0-9|A-Z\W_|0-9\W_]+$/
  );

  //password contains three of upper case letters，Lowercase letters，number or ！？%
  const goodPassword = new RegExp(
    /^(?![A-Z]+$)(?![a-z]+$)(?![0-9]+$)(?![\W_]+$)(?![a-zA-Z]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9|a-z0-9\W_|A-Z0-9\W_|a-zA-Z\W_]+$/
  );

  //password contains all of upper case letters，Lowercase letters，number or ！？%
  const strongPassword = new RegExp(
    /^(?![A-Za-z0-9]+$)(?![a-z0-9\W_]+$)(?![A-Za-z\W_]+$)(?![A-Z0-9\W_]+$)[a-zA-Z0-9\W_]{8,}$/
  );

  if (weekPassword.test(password)) {
    validateResult= 1;
  }
  if (okayPassword.test(password)) {
    validateResult = 2;
  }
  if (goodPassword.test(password)) {
    validateResult = 3;
  }
  if (strongPassword.test(password)) {
    validateResult = 4;
  }

  return validateResult;
}
const PasswordStrengthMeter = ({ password }) => {
  let validateResult = checkPassword(password);

  const funcProgressColor = () => {
    switch (validateResult) {
      case 0:
        return "#828282";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${(validateResult * 100) / 4}%`,
    height: "7px",
    background: funcProgressColor(),
  });

  const createPassLabel = () => {
    let validateResult = checkPassword(password);
    switch (validateResult) {
      case 0:
        return "";
      case 1:
        return "Weak";
      case 2:
        return "okay";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return " ";
    }
  };

  return (
    <>
      <div className="progress" style={{ height: "7px" }}>
        <div className="progress-bar" style={changePasswordColor()}></div>
      </div>
      <p style={{ color: funcProgressColor() }}>{createPassLabel()}</p>
    </>
  );
};

export { checkPassword, PasswordStrengthMeter };
