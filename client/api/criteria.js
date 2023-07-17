async function addCriteriaToDatabase(rubricId) {
  var criteria = document.getElementsByClassName("criteria");
  for (let i = 0; i < criteria.length; i++) {
    var criterion = criteria[i];
    var maximumGradeAttainable = criterion.querySelector("#pointVal").value;
    var sampleFeedback = criterion.querySelector("#sampleFeedbackTextArea");
    if (sampleFeedback) {
      sampleFeedback = sampleFeedback.value;
    } else {
      sampleFeedback = "";
    }
    var title = criterion.querySelector("#title").value;
    var description = criterion.querySelector(".quill");
    description = Quill.find(description).getText();
    const data = {
        criteriaTitle: title,
        criteriaDescription: description,
        sampleFeedback: sampleFeedback,
        maxGradeAttainable: maximumGradeAttainable,
      }
    console.log(data)
    try {
      let response = await fetch(
        `${API_URL}/AddNewCriteria/${rubricId}`,
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.log(response)
      if (response.ok) {
        let criteriaId = await response.json();
        console.log(criteriaId);
        var trElements = criterion.querySelectorAll("tr");
        for (let i = 1; i < trElements.length; i++) {
          let tr = trElements[i];
          var tdElements = tr.querySelectorAll("td");
          let maxGrade = 0;
          let item = "";
          for (let j = 0; j < tdElements.length; j++) {
            let output = null;
            try {
              output = tdElements[j].querySelector("textarea").value;
            } catch (err) {
              output = tdElements[j].querySelector("input").value;
            }

            if (j % 2 === 0) {
              maxGrade = output;
            } else {
              item = output;
            }
          }
          addGradeBoundaryToDatabase(criteriaId.value, maxGrade, item);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
