import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Button = (props) => {
  const fileName = useSelector((state) => state.curriculum.fileName);
  const fileType = useSelector((state) => state.curriculum.fileType);
  const program = useSelector((state) => state.curriculum.selectedProgram);
  const year = useSelector((state) => state.curriculum.selectedYear);
  const [isDisable, setIsDisable] = useState(false);

  useEffect(() => {
    if (
      fileType === "" ||
      fileName === "" ||
      program === "" ||
      year === "" ||
      fileType === null ||
      fileName === null ||
      program === null ||
      year === null
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [fileType, fileName, program, year, isDisable]);

  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={isDisable}
    >
      {props.text}
    </button>
  );
};

export default Button;
