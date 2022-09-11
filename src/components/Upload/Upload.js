import { useDispatch } from "react-redux";
import uploadFilesService from "../../services/uploadFilesService.js";
import { setFile } from "../../store/curriculum.js";

import Controls from "./Controls/Controls.js";
import Dropzone from "./Dropzone/Dropzone.js";
import css from "./Upload.module.css";

const Upload = (props) => {
  const dispatch = useDispatch();

  const uploadFileHandle = (formData, fileName) => {
    uploadFilesService.uploadFile(formData);
    dispatch(setFile({ value: fileName }));
  };

  return (
    <div className={css.container}>
      <Dropzone uploadFileHandle={uploadFileHandle} />
      <Controls />
    </div>
  );
};

export default Upload;
