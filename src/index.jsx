import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calc: ["0"],
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyClick = this.onKeyClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(e) {
    const key = e.key.toLowerCase();
    console.log(key);
    const newCalc = calcAlgo(this.state.calc, key);
    this.setState({ calc: newCalc });
  }

  onKeyClick(e) {
    const key = e.target.innerText;
    const newCalc = calcAlgo(this.state.calc, key);
    this.setState({ calc: newCalc });
  }

  render() {
    const display = this.state.calc.join(" ");
    return (
      <div id="main-container">
        <div id="keys">
          {KEYS.map((e) => (
            <div key={e.id} id={e.id} onClick={this.onKeyClick}>
              {e.content}
            </div>
          ))}
        </div>
        <div id="display">{display}</div>
      </div>
    );
  }
}

// ========================================

function calcAlgo(calc, key) {
  const lastNumber = calc[calc.length - 1];
  //KEY ENTERED IS A NUMBER?
  if (!isNaN(key)) {
    const newNumber = lastNumber !== "0" ? lastNumber.concat(key) : key;
    const newCalc = calc.slice(0, calc.length - 1).concat(newNumber);
    return newCalc;
  }
  //KEY ENTERED IS A DOT?
  else if (key === "." && lastNumber.indexOf(".") === -1) {
    const newNumber =
      lastNumber !== "-"
        ? lastNumber.concat(key)
        : lastNumber.concat("0" + key);
    const newCalc = calc.slice(0, calc.length - 1).concat(newNumber);
    return newCalc;
  }
  //KEY ENTERED IS AN OPERATOR?
  else if (key === "+" || key === "*" || key === "/" || key === "-") {
    if (!isNaN(lastNumber) && lastNumber !== "0") {
      const newCalc = calc.concat([key, "0"]);
      return newCalc;
    } else if (lastNumber === "-" || (lastNumber === "0" && key !== "-")) {
      const newCalc = calc.slice(0, calc.length - 2).concat([key, "0"]);
      return newCalc;
    } else {
      const newCalc = calc.slice(0, calc.length - 1).concat(key);
      return newCalc;
    }
  }
  //KEY ENTERED IS EQUAL OR ENTER?
  else if (key === "=" || key === "enter") {
    let result = Number(calc[0]);
    for (let i = 1; i < calc.length; i = i + 2) {
      switch (calc[i]) {
        case "+":
          result += Number(calc[i + 1]);
          break;
        case "-":
          result -= Number(calc[i + 1]);
          break;
        case "*":
          result *= Number(calc[i + 1]);
          break;
        case "/":
          result /= Number(calc[i + 1]);
          break;
      }
    }
    const finalResult = Number(result.toPrecision(9));
    return [finalResult.toString()];
  }
  //KEY ENTERED IS CLEAR OR SUPR?
  else if (key === "AC" || key === "delete") {
    return ["0"];
  }
  //KEY ENTERED IS BACKSPACE?
  else if (key === "backspace") {
    if (calc.length > 1 && lastNumber.length === 1) {
      const newCalc = calc.slice(0, calc.length - 1);
      return newCalc;
    } else if (lastNumber.length > 1) {
      const newNumber = lastNumber.slice(0, lastNumber.length - 1);
      const newCalc = calc.slice(0, calc.length - 1).concat(newNumber);
      return newCalc;
    } else {
      return ["0"];
    }
  }
  return calc;
}

const KEYS = [
  { id: "zero", content: "0" },
  { id: "one", content: "1" },
  { id: "two", content: "2" },
  { id: "three", content: "3" },
  { id: "four", content: "4" },
  { id: "five", content: "5" },
  { id: "six", content: "6" },
  { id: "seven", content: "7" },
  { id: "eight", content: "8" },
  { id: "nine", content: "9" },
  { id: "decimal", content: "." },
  { id: "add", content: "+" },
  { id: "subtract", content: "-" },
  { id: "multiply", content: "*" },
  { id: "divide", content: "/" },
  { id: "clear", content: "AC" },
  { id: "equals", content: "=" },
  { id: "backspace", content: "backspace" },
];

// ========================================

ReactDOM.render(<Calculator />, document.getElementById("root"));
