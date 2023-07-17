async function addGradeBoundaryToDatabase(criteriaId, mark, item) {
  try {
    const response = await fetch(`${API_URL}/AddNewGradeBoundary`, {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        criteriaId: criteriaId,
        gradeBoundaryDescription: item,
        maximumGradeAttainable: parseInt(mark),
      }),
    });
    let data = await response.json();
    
    console.log(data);
    return data? true: false
  } catch (error) {
    console.log(error);
    return false;
  }
}
