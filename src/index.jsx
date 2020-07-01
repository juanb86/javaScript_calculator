import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      calc: [],
      result: 0,
    };
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown);
  }

  onKeyDown(e) {
    const key = e.key.toLowerCase();
    //KEY ENTERED IS A NUMBER?
    if (!isNaN(key)) {
      const newNumber = this.state.number * 10 + Number(key);
      this.setState({ number: newNumber });
    }
    //KEY ENTERED IS AN OPERATOR?
    else if (key === "+" || key === "-" || key === "*" || key === "/") {
      const pushing = [this.state.number, key];
      this.setState({ calc: this.state.calc.concat(pushing) });
      this.setState({ number: 0 });
      console.log(this.state.calc);
    }
    //KEY ENTERED IS EQUAL?
    else if (key === "=") {
      this.setState({ calc: this.state.calc.concat(this.state.number) });
      const calc = this.state.calc;
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
      this.setState({ number: result, result: result });
    }
  }

  render() {
    return (
      <div id="main-container">
        <div id="equals"></div>
        <div id="one"></div>
        <div id="add"></div>
        <div id="decimal"></div>
        <div id="display">{this.state.number}</div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Calculator />, document.getElementById("root"));
