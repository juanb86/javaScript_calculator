import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      calc: [0],
      result: 0,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(e) {
    const key = e.key.toLowerCase();
    console.log(key);
    const calc = this.state.calc;
    const lastNumber = calc[calc.length - 1];
    //KEY ENTERED IS A NUMBER?
    if (!isNaN(key)) {
      const newNumber = lastNumber * 10 + Number(key);
      this.setState({ calc: calc.slice(0, calc.length - 1).concat(newNumber) });
    }
    //KEY ENTERED IS AN OPERATOR?
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
      this.setState({ calc: this.state.calc.concat([key, 0]) });
    }
    //KEY ENTERED IS EQUAL?
    else if (key === "=") {
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
      this.setState({ calc: [result] });
    } else if (key === "backspace") {
      const newNumber = lastNumber / 10;
      this.setState({
        calc: calc.slice(0, calc.length - 1).concat(newNumber),
      });
    }
  }

  render() {
    return (
      <div id="main-container">
        <div id="equals"></div>
        <div id="one"></div>
        <div id="add"></div>
        <div id="decimal"></div>
        <div id="display">{this.state.calc.join(" ")}</div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Calculator />, document.getElementById("root"));
