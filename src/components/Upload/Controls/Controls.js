import css from "./Controls.module.css";
import Select from "../../UI/Select/Select.js";
import { reset, setOptions, upload } from "../../../store/curriculum.js";
import { useDispatch } from "react-redux";
import Button from "../../UI/Button/Button.js";
import { useEffect, useState } from "react";

const Controls = () => {
  const years = [null, 2022, 2023, 2024, 2025, 2026, 2027, 2028];
  const programs = [null, "בוקר", "ערב", 'מח"ר'];
  const filetype = [null, "תכנית לימודים", "ציונים"];
  const [isClearSelections, setIsClearSelections] = useState(false);
  const dispatch = useDispatch();

  const selects = [
    { type: "years", label: "שנתון", options: years },
    { type: "files", label: "סוג קובץ", options: filetype },
    { type: "programs", label: "סוג תכנית", options: programs },
  ];

  const displaySelect = () => (
    <div className={css.selectWrapper}>
      {selects.map((select) => (
        <Select
          type={select.type}
          text={select.label}
          key={select.label}
          options={select.options}
          isCleared={isClearSelections}
          onChange={selectChangedHandler}
        />
      ))}
    </div>
  );

  useEffect(() => {
    if (isClearSelections) {
      setIsClearSelections(false);
    }
  }, [isClearSelections]);

  const selectChangedHandler = (event, type) => {
    dispatch(
      setOptions({
        type,
        value: event.target.value,
      })
    );
  };

  const onCancelHandler = () => {
    setIsClearSelections(true);
    dispatch(reset());
  };

  const onUploadHandler = () => {
    dispatch(upload());
  };

  return (
    <div className={css.wrapper}>
      {displaySelect()}
      <div className={css.formButtonControl}>
        <Button
          disabled={false}
          className={css.btnSubmit}
          onClick={onUploadHandler}
          text='שלח/י'
        />

        <Button
          disabled={false}
          className={css.btnCancel}
          onClick={onCancelHandler}
          text='בטל'
        />
      </div>
    </div>
  );
};

export default Controls;
