import { useEffect, useState } from "react";
import "./Calculator.css";
import { EquationCard } from "../equationCard/EquationCard.js";
import { links } from "../../utils/constant.js";
import { CreateLink, useCreteLink } from "../../utils/CreateLinks.js";
export const Calculator = () => {
  const [equation, setEquation] = useState([
    "x^2",
    "2*x+4",
    "x^2+20",
    "x-2",
    "x/2",
  ]);
  const [equationValid, setEquationValid] = useState(Array(5).fill(true));
  const [input, setInput] = useState(2);
  const [output, setOutput] = useState(null);
  const [equationOrder, setEquationOrder] = useState([1, 2, 4, 5, 3]);
  const [nextEquation, setNextEquation] = useState([2, 4, null, 5, 3]);

  const handleInputChange = (e) => {
    const newInput = e?.target?.value;
    setInput(newInput);
    if (newInput?.length) {
      calculate(Number(newInput), equation);
    }
  };

  const calculate = (input, equation) => {
    const eqValid = Array(5).fill(true);
    equationOrder?.map((item, index) => {
      try {
        const transformedEquation = equation[item - 1]
          .replace(/(\d)(x)/gi, "$1 * $2")
          .replace(/x/g, `(${input})`)
          .replace(/\^/g, "**");
        const result = new Function(`return ${transformedEquation}`)();
        input = result;
      } catch {
        input = 0;
        eqValid[item - 1] = false;
        return;
      }
    });
    setEquationValid(eqValid);
    setOutput(input);
  };

  const handleEquation = (value, index) => {
    const tempEquation = [...equation];
    tempEquation[index] = value;
    setEquation(tempEquation);
    if (input !== null) {
      calculate(input, tempEquation);
    }
  };

  useEffect(() => {
    calculate(input, equation);
  }, []);

  return (
    <div className="main-container">
      <svg ref={useCreteLink(links)} className="svg-style" />
      <div className="initial-value-section  container">
        <p className="title initial-value-title">Initial value of x</p>
        <div className="input-wrapper initial-value-input-wrapper">
          <input
            value={input}
            onChange={(e) => handleInputChange(e)}
            type="number"
            className="number-input"
          />
          <div className="separator input-separator"></div>
          <input
            type="radio"
            checked
            className="radio-input"
            readOnly
            id="starting"
          />
        </div>
      </div>
      <div className="equations-section">
        {equation.map((item, index) => (
          <EquationCard
            key={index}
            equation={item}
            index={index}
            handleEquation={handleEquation}
            order={nextEquation[index]}
          />
        ))}
      </div>
      <div className="final-output-section container">
        <p className="title end">Final Output y</p>
        <div className="input-wrapper end-output">
          <input
            type="radio"
            checked
            className="radio-input"
            readOnly
            id="ending"
          />
          <div className="separator output-separator"></div>
          <input
            value={output}
            type="number"
            className="number-input"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};
