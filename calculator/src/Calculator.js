import React, { useState, useEffect } from "react";
import Key from "./Keys";

const KEYS = [
  {
    id: "seven",
    value: "7",
  },
  {
    id: "eight",
    value: "8",
  },
  {
    id: "nine",
    value: "9",
  },
  {
    id: "four",
    value: "4",
  },
  {
    id: "five",
    value: "5",
  },
  {
    id: "six",
    value: "6",
  },
  {
    id: "one",
    value: "1",
  },
  {
    id: "two",
    value: "2",
  },
  {
    id: "three",
    value: "3",
  },
  {
    id: "zero",
    value: "0",
  },
  {
    id: "decimal",
    value: ".",
  },
];
const OPERATORS = [
  {
    id: "add",
    value: "+",
  },
  {
    id: "subtract",
    value: "-",
  },
  {
    id: "multiply",
    value: "*",
  },
  {
    id: "divide",
    value: "/",
  },
];

function Calculator() {
  const [input, setInput] = useState("0");
  const [result, setResult] = useState("0");
  const [flag, setFlag] = useState(true);

  const handleSymbol = (symbol) => {
    let regexSymbol = /[^a-zA-Z\d\s.-]/;
    let regexNum = /\d/;
    let prev = input.trim();
    if (regexSymbol.test(symbol)) {
      if (
        regexSymbol.test(prev.slice(-1)) &&
        !regexSymbol.test(prev.charAt(prev.length - 2))
      ) {
        let sliced = prev.slice(0, -1) + " " + symbol + " ";
        /* this.setState({
          input: sliced,
        }); */
        return;
      } else if (
        !regexNum.test(prev.slice(-1)) &&
        regexSymbol.test(prev.charAt(prev.length - 3))
      ) {
        let sliced = prev.slice(0, -3) + " " + symbol + " ";
        setInput(sliced);
        /* this.setState({
          input: sliced,
        }); */
        return;
      }
    }
    setInput(prev + " " + symbol + " ");
    /* this.setState({
      input: prev + " " + symbol + " ",
    }); */
  };

  const changeResult = (res) => {
    setInput("" + res);
    setResult("" + res);
  };

  const changeFlag = (flag) => {
    setFlag(flag);
  };

  const clearDisplay = () => {
    setInput("0");
    setResult("0");
    setFlag(true);
  };

  const changeDisplay = (newDisplay) => {
    if (
      (input.slice(-1) == "." && newDisplay == ".") ||
      (!flag && newDisplay == ".")
    ) {
      return;
    }
    if (input === "0") {
      setInput("" + newDisplay);
      /* this.setState({
          input: "" + newDisplay
        }); */
    } else {
      setInput(input + newDisplay + "");
      /* this.setState({
          input: this.state.input + newDisplay + ""
        }); */
    }
  };

  const keys = KEYS.map((k) => (
    <Key
      changeDisplay={changeDisplay}
      id={k.id}
      value={k.value}
      changeFlag={changeFlag}
    />
  ));
  const operators = OPERATORS.map((k) => (
    <Key
      changeDisplay={changeDisplay}
      id={k.id}
      value={k.value}
      changeFlag={changeFlag}
      handleSymbol={handleSymbol}
    />
  ));
  return (
    <div id="calculator">
      <div className="display">
        <h3 id="display">{input}</h3>
        <h3 id="res">{result}</h3>
      </div>
      <div className="numbers">
        {keys}
        <Key
          clear={changeResult}
          id="clear"
          value="CE"
          changeFlag={changeFlag}
        />
      </div>
      <div className="operators">
        {operators}
        <Key
          changeDisplay={changeDisplay}
          input={input}
          clear={clearDisplay}
          res={changeResult}
          id="equals"
          value="="
          changeFlag={changeFlag}
        />
      </div>
    </div>
  );
}

export default Calculator;
