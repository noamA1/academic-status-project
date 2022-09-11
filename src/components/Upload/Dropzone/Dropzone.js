import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadFilesService from "../../../services/uploadFilesService.js";
import { setFile } from "../../../store/grades.js";

import "../Dropzone/Dropzone.css";

const Dropzone = (props) => {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  const [dropActive, setDropActive] = useState(false);
  // ref
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const fileName = useSelector((state) => state.curriculum.fileName);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    if (fileName === null) {
      setDragActive(false);
      setDropActive(false);
    }
  }, [fileName]);

  const handleFile = (file) => {
    setDropActive(true);
    let formData = new FormData();

    if (file.name.includes("בוקר")) {
      formData.set("file", file, "morning.xlsx");
      props.uploadFileHandle(formData, "morning.xlsx");
    } else if (file.name.includes("ערב")) {
      formData.set("file", file, "evening.xlsx");
      props.uploadFileHandle(formData, "evening.xlsx");
    } else if (file.name.includes("ציוני")) {
      formData.set("file", file, "grades.xlsx");
      dispatch(setFile({ value: "grades.xlsx" }));
      uploadFilesService.uploadFile(formData);
    } else {
      formData.append("file", file);
      props.uploadFileHandle(formData, file.name);
    }
  };

  return (
    <form
      id='form-file-upload'
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type='file'
        id='input-file-upload'
        accept='.xlsx, .xls, .csv'
        onChange={handleChange}
        onClick={onButtonClick}
      />
      <label
        id='label-file-upload'
        htmlFor='input-file-upload'
        className={dragActive || dropActive ? "drag-active" : ""}
      >
        גרור קבצים לכאן או לחץ כאן להעלאה
      </label>
      {dragActive && (
        <div
          id='drag-file-element'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

export default Dropzone;
