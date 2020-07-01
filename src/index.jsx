import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calc: [0],
    };
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyClick = this.onKeyClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(e) {
    const key = e.key.toLowerCase();
    const newCalc = calcAlgo(this.state.calc, key);
    this.setState({ calc: newCalc });
  }

  onKeyClick(e) {
    const key = e.target.innerText;
    const newCalc = calcAlgo(this.state.calc, key);
    this.setState({ calc: newCalc });
  }

  render() {
    return (
      <div id="main-container">
        <div id="zero" onClick={this.onKeyClick}>
          0
        </div>
        <div id="one" onClick={this.onKeyClick}>
          1
        </div>
        <div id="two" onClick={this.onKeyClick}>
          2
        </div>
        <div id="three" onClick={this.onKeyClick}>
          3
        </div>
        <div id="four" onClick={this.onKeyClick}>
          4
        </div>
        <div id="five" onClick={this.onKeyClick}>
          5
        </div>
        <div id="six" onClick={this.onKeyClick}>
          6
        </div>
        <div id="seven" onClick={this.onKeyClick}>
          7
        </div>
        <div id="eight" onClick={this.onKeyClick}>
          8
        </div>
        <div id="nine" onClick={this.onKeyClick}>
          9
        </div>
        <div id="add" onClick={this.onKeyClick}>
          +
        </div>
        <div id="subtract" onClick={this.onKeyClick}>
          -
        </div>
        <div id="multiply" onClick={this.onKeyClick}>
          *
        </div>
        <div id="divide" onClick={this.onKeyClick}>
          /
        </div>
        <div id="decimal" onClick={this.onKeyClick}>
          .
        </div>
        <div id="clear" onClick={this.onKeyClick}>
          AC
        </div>
        <div id="equals" onClick={this.onKeyClick}>
          =
        </div>
        <div id="display">{this.state.calc.join(" ")}</div>
      </div>
    );
  }
}

// ========================================

function calcAlgo(calc, key) {
  const lastNumber = calc[calc.length - 1];
  //KEY ENTERED IS A NUMBER?
  if (!isNaN(key)) {
    const newNumber = lastNumber * 10 + Number(key);
    const newCalc = calc.slice(0, calc.length - 1).concat(newNumber);
    return newCalc;
  }
  //KEY ENTERED IS AN OPERATOR?
  else if (key === "+" || key === "-" || key === "*" || key === "/") {
    const newCalc = calc.concat([key, 0]);
    return newCalc;
  }
  //KEY ENTERED IS EQUAL OR ENTER?
  else if (key === "=" || key === "enter") {
    let result = calc[0];
    for (let i = 1; i < calc.length; i = i + 2) {
      switch (calc[i]) {
        case "+":
          result += calc[i + 1];
          break;
        case "-":
          result -= calc[i + 1];
          break;
        case "*":
          result *= calc[i + 1];
          break;
        case "/":
          result /= calc[i + 1];
          break;
      }
    }
    return [result];
  }
  //KEY ENTERED IS BACKSPACE?
  else if (key === "backspace") {
    const newNumber = parseInt(lastNumber / 10);
    const newCalc = calc.slice(0, calc.length - 1).concat(newNumber);
    return newCalc;
  }
}

// ========================================

ReactDOM.render(<Calculator />, document.getElementById("root"));
