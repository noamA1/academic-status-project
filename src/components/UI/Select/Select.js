import React from "react";

import css from "./Select.module.css";

const Select = React.forwardRef((props, ref) => {
  const options = props.options.map((option) => {
    if (option instanceof Object) {
      return <option key={option.studentID}>{option.studentID}</option>;
    } else {
      return <option key={option}>{option}</option>;
    }
  });

  return (
    <div className={css.wrapper}>
      <label className={css.select_label}>{props.text}</label>
      <select
        className={css.select}
        onChange={(event) => props.onChange.call(null, event, props.type)}
        ref={ref}
      >
        {props.isCleared ? options[0] : options}
      </select>
    </div>
  );
});

export default Select;
