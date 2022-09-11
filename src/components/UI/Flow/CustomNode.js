const CustomNode = (props) => {
  const nodeData = props;

  const nodeStyle = {
    border: "1px solid #1a192b",
    borderRadius: "3px",
    fontSize: "12px",
    padding: "10px",
    textAlign: "center",
    width: "150px",
  };

  return <div style={nodeStyle}>{nodeData.data.label}</div>;
};

export default CustomNode;
