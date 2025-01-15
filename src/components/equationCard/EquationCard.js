import { useEffect, useState } from "react";
import "./EquationCard.css";

export const EquationCard = ({ equation, index, handleEquation, order }) => {
  const [inputEquation, setInputEquation] = useState(equation);
  const [showError, setShowError] = useState(false);

  const handleEquationInput = (e) => {
    const value = e.target.value;
    const validPattern = /^[0-9x+\-*/^().\s]*$/;
    if (!validPattern.test(value)) {
      return;
    }

    if (value !== "" && isValidEquation(value)) {
      handleEquation(value, index);
      setShowError(false);
    } else {
      setShowError(true);
    }
    setInputEquation(value);
  };

  const isValidEquation = (equation) => {
    const invalidPattern =
      /\/\/|[^0-9]\*{2,}|[+\-*/]{2,}|^[+\-*/]|[+\-*/]$|xx+|(\d)x{2,}|x[+\-*/^]$/;
    return !invalidPattern.test(equation);
  };

  return (
    <div className="equation-container">
      <div className="header">
        <img className="drag-img" src="/images/drag.svg" alt="Drag" />
        <h3 className="heading">Function {index + 1}</h3>
      </div>
      <p>Equation</p>
      <input
        className="equation-input"
        value={inputEquation}
        onChange={handleEquationInput}
      />
      {showError && <p className="error">This is an invalid equation</p>}
      <p>Next function</p>
      <button disabled={true}>{order ? "Function: " + order : "-"}</button>
      <img
        className="chevron-img"
        src="/images/chevron-down.svg"
        alt="Chevron image"
      />
      <div className="footer">
        <div>
          <input type="radio" checked readOnly id={`input${index + 1}`} />
          <span>input</span>
        </div>
        <div>
          <span>output</span>
          <input type="radio" checked readOnly id={`output${index + 1}`} />
        </div>
      </div>
    </div>
  );
};
