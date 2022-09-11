import { MarkerType } from "react-flow-renderer";

let nodes;

const getEveningCurriculum = async (file) => {
  const response = await fetch(`http://localhost:9001/api/curriculum/${file}`);
  const data = await response.json();
  nodes = setNodes(data);

  return nodes;
};

const setNodes = (array) => {
  let nodes = array.map((course) => {
    return {
      id: `${course.code}`,
      data: { ...course, label: course.name },
      position: {},
      sourcePosition: "right",
      targetPosition: "left",
      style: setStyle(course),
      type: setType(course),
    };
  });

  const y1s1 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה א'" && node.data.semester === "סמסטר א'"
    )
  );
  const y1s2 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה א'" && node.data.semester === "סמסטר ב'"
    )
  );
  const y1s3 = setPositions(
    nodes.filter(
      (node) =>
        node.data.year === "שנה א'" && node.data.semester === "סמסטר קיץ"
    )
  );
  const y2s1 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה ב'" && node.data.semester === "סמסטר א'"
    )
  );
  const y2s2 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה ב'" && node.data.semester === "סמסטר ב'"
    )
  );
  const y2s3 = setPositions(
    nodes.filter(
      (node) =>
        node.data.year === "שנה ב'" && node.data.semester === "סמסטר קיץ"
    )
  );
  const y3s1 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה ג'" && node.data.semester === "סמסטר א'"
    )
  );

  const y3s2 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה ג'" && node.data.semester === "סמסטר ב'"
    )
  );
  const y3s3 = setPositions(
    nodes.filter(
      (node) =>
        node.data.year === "שנה ג'" && node.data.semester === "סמסטר קיץ"
    )
  );
  const y4s1 = setPositions(
    nodes.filter(
      (node) =>
        node.data.year === "שנה ד'" && node.data.semester === "סמסטר א' "
    )
  );
  const y4s2 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה ד'" && node.data.semester === "סמסטר ב'"
    )
  );
  const y4s3 = setPositions(
    nodes.filter(
      (node) =>
        node.data.year === "שנה ד'" && node.data.semester === "סמסטר קיץ"
    )
  );
  const y5s1 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה ה'" && node.data.semester === "סמסטר א'"
    )
  );
  const y5s2 = setPositions(
    nodes.filter(
      (node) => node.data.year === "שנה ה'" && node.data.semester === "סמסטר ב'"
    )
  );

  nodes = [
    ...y1s1,
    ...y1s2,
    ...y1s3,
    ...y2s1,
    ...y2s2,
    ...y2s3,
    ...y3s1,
    ...y3s2,
    ...y3s3,
    ...y4s1,
    ...y4s2,
    ...y4s3,
    ...y5s1,
    ...y5s2,
  ];

  return nodes;
};

const setStyle = (course) => {
  switch (course.department) {
    case "it":
      return { backgroundColor: "#6060e2", color: "#fff" };

    case "programing":
      return { backgroundColor: "#3bc9db" };
    case "math":
      return { backgroundColor: "#ffd43b" };
    case "operation":
      return { backgroundColor: "#e599f7" };
    case "physics":
      return { backgroundColor: "#f783ac", color: "#fff" };

    default:
      return { backgroundColor: "#9775fa" };
  }
};

const setType = (node) => {
  if (node.hasChilds && node.hasPerents) {
    return "default";
  }
  if (node.hasChilds) {
    return "input";
  }
  if (node.hasPerents) {
    return "output";
  } else {
    return "custom";
  }
};

const setPositions = (nodes) => {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].data.year === "שנה א'") {
      if (nodes[i].data.semester === "סמסטר א'") {
        nodes[i].position = { y: 0, x: 0 };
      } else if (nodes[i].data.semester === "סמסטר ב'") {
        nodes[i].position = { y: 0 + i * 100, x: 200 + i * 10 };
      } else {
        nodes[i].position = { y: 0 + i * 125, x: 400 + i * 20 };
      }
    }
    if (nodes[i].data.year === "שנה ב'") {
      if (nodes[i].data.semester === "סמסטר א'") {
        nodes[i].position = { y: 0 + i * 125, x: 650 + i * 10 };
      } else if (nodes[i].data.semester === "סמסטר ב'") {
        nodes[i].position = { y: 0 + i * 150, x: 850 + i * 20 };
      } else {
        nodes[i].position = { y: 0 + i * 175, x: 1050 + i * 30 };
      }
    }
    if (nodes[i].data.year === "שנה ג'") {
      if (nodes[i].data.semester === "סמסטר א'") {
        nodes[i].position = { y: 0 + i * 175, x: 1300 + i * 10 };
      } else if (nodes[i].data.semester === "סמסטר ב'") {
        nodes[i].position = { y: 0 + i * 200, x: 1500 + i * 20 };
      } else {
        nodes[i].position = { y: 0 + i * 225, x: 1700 + i * 30 };
      }
    }
    if (nodes[i].data.year === "שנה ד'") {
      if (nodes[i].data.semester === "סמסטר א' ") {
        nodes[i].position = { y: 0 + i * 225, x: 1950 + i * 10 };
      } else if (nodes[i].data.semester === "סמסטר ב'") {
        nodes[i].position = { y: 0 + i * 250, x: 2150 + i * 20 };
      } else {
        nodes[i].position = { y: 0 + i * 275, x: 2350 + i * 30 };
      }
    }
    if (nodes[i].data.year === "שנה ה'") {
      if (nodes[i].data.semester === "סמסטר א'") {
        nodes[i].position = { y: 0 + i * 300, x: 2600 + i * 10 };
      } else {
        nodes[i].position = { y: 0 + i * 325, x: 2850 + i * 20 };
      }
    }
  }

  return nodes;
};

const setEdges = async (nodesArray) => {
  let edges = [];
  nodesArray.forEach((node) => {
    if (node.data.preCourses.length > 0) {
      for (let i = 0; i < node.data.preCourses.length; i++) {
        edges.push({
          id: `${node.data.code}-${node.data.preCourses[i].code}-${i}`,
          source: `${node.data.preCourses[i].code}`,
          target: `${node.data.code}`,
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.Arrow,
          },

          style: { markerWidth: "10", markerHeight: "10" },
        });
      }
    }
  });
  return edges;
};

export default {
  getEveningCurriculum,
  setEdges,
};
