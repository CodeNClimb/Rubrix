async function getRubricsFromDatabase() {
  try {
    const response = await fetch(
      `${API_URL}/GetRubricsByUsername/${store.user.username}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      }
    );
    let rubrics = await response.json();
    if (rubrics.length > 0) {
      showMyRubrics(rubrics);
      document.getElementById("no-rubric-message").style.display = "none";
      return rubrics;
    }
    return [];
  } catch (err) {
    console.log(err);
  }
}
async function updateExistingRubric({
  courseId,
  rubricTitle,
  rubricDescription,
  noteToMarkers,
  rubricId,
}) {
  try {
    const response = await fetchWithAuth(`UpdateExistingRubric/${rubricId}`, {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json;",
      },
      body: JSON.stringify({
        courseId,
        rubricTitle,
        rubricDescription,
        noteToMarkers,
        creator: store.user.username,
      }),
    });
    return response;
  } catch (err) {
    console.log(err);
  }
}

//need to store rubric UUID when its created
//need to store it everytime they click on a rubric
async function saveRubricToDatabase() {
  let selectedCourseId = $("#courses option:selected").attr("id").toString();
  let rubricTitle = $("#rubric-title").text();
  let rubricDescription = $("#rubric-description").text();
  let noteToMarkers = $("#rubric-notes").text();
  if (store.currentRubric) {
    await updateExistingRubric({
      courseId: selectedCourseId,
      rubricTitle,
      rubricDescription,
      noteToMarkers,
      rubricId: store.currentRubric.rubricId,
    });
  } else {
    await createNewRubric(
      selectedCourseId,
      rubricTitle,
      rubricDescription,
      noteToMarkers
    );
  }
}

//sends rubric Course, title, description and note to makers to database
async function createNewRubric(courseId, title, description, noteToMarkers) {
  const data = {
    courseId: courseId,
    rubricTitle: title,
    rubricDescription: description,
    noteToMarkers: noteToMarkers,
    creator: store.user.username,
  };
  try {
    const response = await fetch(`${API_URL}/AddNewRubric`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json;",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      let data = await response.json();
      data=data.value
      await addCriteriaToDatabase(data);
      await sendNewRequirementToDatabase(data);

      store.rubrics = await getRubricsFromDatabase()
    }
  } catch (err) {
    console.log(err);
  }
}

function showMyRubrics(myRubrics) {
  const rubricsContainer = document.querySelector(".rubrics-container");

  // Clear the container
  rubricsContainer.innerHTML = "";

  store.courses.forEach((course) => {});
  // Iterate over each rubric
  myRubrics.forEach((rubric) => {
    var course = document.getElementById(rubric.courseId).innerText;
    // Create a rubric card element
    const card = createRubricCard(
      course,
      rubric.rubricTitle,
      rubric.rubricDescription
        ? `${rubric.rubricDescription.slice(40)}...`
        : "",
      rubric.rubricId
    );

    // Append the card to the container
    rubricsContainer.appendChild(card);
  });
}
async function sendCourseToDatabase(element) {
  let data = {
    courseId: element.id,
    subject: element.subject,
    catalogNbr: element.catalogNbr,
    title: element.title,
    description: element.description,
  };
  data = JSON.stringify(data);
  try {
    const response = await fetchWithAuth(`AddCourse`, {
      method: "POST",
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: data,
    });
    store.courses = await getCoursesFromDatabase()
    return await response.json();
  } catch (err) {
    console.log(err);
  }
}

function createRubricCard(
  courseName,
  rubricTitle,
  rubricDescription,
  rubricId
) {
  const card = document.createElement("div");
  card.classList.add("rubric-card");

  const content = document.createElement("div");
  content.classList.add("rubric-card-content");

  const course = document.createElement("h2");
  course.classList.add("rubric-card-courseName");
  course.textContent = courseName;

  const cardTitle = document.createElement("h3");
  cardTitle.classList.add("rubric-card-title");
  cardTitle.textContent = rubricTitle;

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("rubric-card-description");
  cardDescription.textContent =
    rubricDescription && rubricDescription.length > 40
      ? `${rubricDescription.slice(0, 40)} ...`
      : rubricDescription;

  content.appendChild(course);
  content.appendChild(cardTitle);
  content.appendChild(cardDescription);

  card.appendChild(content);
  // Create buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("rubric-card-buttons-container");

  // Create edit button
  const editButton = document.createElement("button");
  editButton.classList.add("rubric-card-button");
  editButton.textContent = "Edit";

  editButton.addEventListener("click", async () => {
    let rubrix = store.rubrics.find((r) => r.rubricId === rubricId);
    await renderServerRubrix("edit", rubrix);
    window.location.hash = "creator";
  });

  // Create download button
  const downloadButton = document.createElement("button");
  downloadButton.classList.add("rubric-card-button");
  downloadButton.textContent = "Download";
  downloadButton.style.color = "white";
  downloadButton.style.background = "#3498DB";

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("rubric-card-button");
  deleteButton.textContent = "Delete";
  deleteButton.style.color = "white";
  deleteButton.style.background = "#E74C3C";

  deleteButton.addEventListener("click", (ev) => deleteRubric(rubricId));

  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(deleteButton);

  card.appendChild(buttonsContainer);

  // Event listener for hover
  card.addEventListener("mouseover", () => {
    buttonsContainer.style.display = "block";
  });

  card.addEventListener("mouseout", () => {
    buttonsContainer.style.display = "none";
  });

  return card;
}

async function deleteRubric(id) {
  console.log(`Deleting Rubric with ID: ${id}`);
  let response = await fetchWithAuth(`DeleteRubric/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}
