const uploadFile = async (formData) => {
  const response = await fetch(`http://localhost:9001/api/upload`, {
    method: "POST",
    body: formData,
  });
  if (response) {
    console.log(response.statusText);
  }
};

export default {
  uploadFile,
};
