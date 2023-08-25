import React, { useState } from "react";
function Key(props) {
  const handleClick = () => {
    const regex = /[^a-zA-Z\d\s.-]/;
    if (props.id == "equals") {
      props.changeFlag(true);
      // Remove octals
      const filtered = props.input
        .split(" ")
        .map((m) => {
          return m.length > 1 ? m.replace(/^0+/, "") : m;
        })
        .filter((n) => n);

      const newExp = filtered
        .filter((n, index) => {
          return !(regex.test(n) && regex.test(filtered[index + 1]));
        })
        .join(" ");

      props.res(eval(newExp)); //this.props.changeDisplay(eval(newExp));
    } else if (props.id === "clear") {
      props.changeFlag(true);

      props.clear("0");
    } else {
      if (
        ///[^a-zA-Z\d\s.]/.test(props.value)
        props.value == "+" ||
        props.value == "-" ||
        props.value == "*" ||
        props.value == "/"
      ) {
        props.changeFlag(true);
        props.handleSymbol(props.value);
        //props.changeDisplay(" " + props.value + " ");
        return;
      }
      if (props.value == ".") {
        props.changeFlag(false);
        props.changeDisplay(props.value);
        return;
      }
      props.changeDisplay(props.value);
    }
  };
  return (
    <div
      className={`key-pad btn btn-secondary px-3`}
      onClick={handleClick}
      id={props.id}
    >
      <h1>{props.value}</h1>
    </div>
  );
}

export default Key;
