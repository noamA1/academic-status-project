import { useCallback } from "react";
import ReactFlow from "react-flow-renderer";
import CustomNode from "./CustomNode.js";

const Flow = (props) => {
  const nodeTypes = { custom: CustomNode };

  const onNodesChange = useCallback((changes) => {
    const selectedCourse = changes.find((node) => node.selected);
    let selectedCourseInfo;
    if (selectedCourse) {
      selectedCourseInfo = props.flowNodes.find(
        (course) => course.id === selectedCourse.id
      );
      props.onSelectCourse({
        code: selectedCourseInfo.data.code,
        credits: selectedCourseInfo.data.credits,
        department: selectedCourseInfo.data.department,
        laboratoryHours: selectedCourseInfo.data.laboratoryHours,
        lectureHours: selectedCourseInfo.data.lectureHours,
        name: selectedCourseInfo.data.name,
        practiceHours: selectedCourseInfo.data.practiceHours,
        semester: selectedCourseInfo.data.semester,
        year: selectedCourseInfo.data.year,
        preCourses: selectedCourseInfo.data.preCourses,
      });
    }
  }, []);

  return (
    <>
      <div
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <ReactFlow
          nodes={props.flowNodes}
          edges={props.flowEdges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
        />
      </div>
    </>
  );
};

export default Flow;
