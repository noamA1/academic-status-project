const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.Server(app);
app.use(express.json());
app.use(cors());

const gradesBl = require("../server/business-logic/gradesBl.js");
const upload = require("../server/common/helper.js");
const curriculumBl = require("../server/business-logic/curriculumBl.js");

app.get("/api/grades/:fileName", async (req, res) => {
  const result = gradesBl.getGradesArray(req.params.fileName);
  res.send(result);
});
app.get("/api/curriculum/:fileName", async (req, res) => {
  const result = curriculumBl.getCurriculum(req.params.fileName);

  return res.send(result);
});
app.post(`/api/upload`, upload.upload.single("file"), (req, res) => {
  res.json({ url: `${upload.getDestination}` + upload.getFilename });
});

server.listen(9001, () => {
  console.log(`server is running on port 9001 localhost!`);
});
