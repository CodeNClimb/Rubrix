function readUserSelectedRubrixFile(viewType) {
  return new Promise((resolve, reject) => {
    // Prompt the user to select a file
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = () => {
      // Load the selected file using a FileReader
      const fileReader = new FileReader();
      fileReader.onload = () => {
        // Parse the file content into an HTML document
        const rubrixDoc = new DOMParser().parseFromString(
          fileReader.result,
          "text/html"
        );
        // Get all the qsection elements
        const qSections = rubrixDoc.getElementsByTagName("qsection");
        const course = rubrixDoc.getElementsByTagName("qrubriccourse")[0];
        const rubricTitle = rubrixDoc.getElementsByTagName("qrubrictitle")[0];
        const rubricDescription = rubrixDoc.getElementsByTagName("qrubricdescription")[0];
        const rubricNotes = rubrixDoc.getElementsByTagName("qrubricnotes")[0];
        const rubrixData = {
          course: course,
          title: rubricTitle,
          description: rubricDescription,
          notes: rubricNotes,
          sections: []
        };
        // Loop through each qsection element
        for (const qSection of qSections) {
          // Get the qtitle and pointVal elements
          const qTitle = qSection.getElementsByTagName("qtitle")[0];
          const pointVal = qSection.getElementsByTagName("pointVal")[0];
          // Get the textareaq, quilltxt, tableq, and listQ elements
          const textareaq = qSection.getElementsByTagName("textareaq")[0];
          const quilltxt = qSection.getElementsByTagName("quilltxt")[0];
          const tableq = qSection.getElementsByTagName("tableq")[0];
          const listQ = qSection.getElementsByTagName("listQ")[0];
          let feedback = qSection.getElementsByTagName("sampleFeedback")[0];
          let listQData;

          if (listQ) {
            listQData = [];
            for (let i = 0; i < listQ.children.length; i++) {
              const listItemText =
                listQ.children[i].getElementsByTagName("txt")[0].textContent;
              const listItemPad =
                listQ.children[i].getElementsByTagName("pad")[0];

              let match = listItemPad.textContent.match(/(^\d+)/);

              const listItemPadValue = listItemPad
                ? match && match[0]
                  ? Number(match[0])
                  : 0
                : 0;
              listQData.push({ text: listItemText, padding: listItemPadValue });
            }
          }
          // Add the section data to the rubrixData object

          rubrixData.sections.push({
            course: course.textContent,
            title: qTitle.textContent,
            pointVal: pointVal ? pointVal.textContent : null,
            textareaq: textareaq ? textareaq.textContent : null,
            quilltxt: quilltxt ? quilltxt.innerHTML : null,
            tableq: tableq ? tableq.innerHTML : null,
            listQ: listQ ? listQData : null,
            sampleFeedback: feedback ? feedback.textContent : null,
          });
        }
        // Resolve the promise with the rubrixData object
        resolve(renderRubrix(viewType, rubrixData));
      };
      fileReader.onerror = () => {
        reject(fileReader.error);
      };
      fileReader.readAsText(input.files[0]);
    };
    input.click();
  });
}

function createCourseCard(id, title, desc, year) {
  let card = document.createElement("label");
  card.classList.add("card");

  let radio = document.createElement("input");
  radio.type = "radio";
  radio.value = id;
  radio.name = "courseSelect";
  card.appendChild(radio);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.innerHTML = `
  <h5 class="card-title">${title}</h5>
  <p class="card-text">${
    desc ? (desc.length > 40 ? desc.slice(0, 40) + "..." : desc) : ""
  }</p>
  <p class="card-text">${year}</p>
  `;
  card.appendChild(cardBody);
  return card;
}
function createRubrixCard(viewType, id, title, desc) {
  let modalConfirmButton = document.getElementById("modal-confirm-btn");
  let modal = document.getElementsByClassName("modal")[0];
  let card = document.createElement("label");
  card.classList.add("card");

  let radio = document.createElement("input");
  radio.type = "radio";
  radio.value = id;
  radio.name = "rubrixSelect";
  card.appendChild(radio);

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  cardBody.innerHTML = `
  <h5 class="card-title">${title}</h5>
  <p class="card-text">${
    desc ? (desc.length > 40 ? desc.slice(0, 40) + "..." : desc) : ""
  }</p>
  `;
  card.appendChild(cardBody);

  card.addEventListener("change", (event) => {
    //Rubrix ID
    const selectedRubrix = store.rubrics.find(
      ({ rubricId }) => rubricId === event.target.value
    );
    store.currentRubric = selectedRubrix

    modalConfirmButton.removeAttribute("disabled");

    modalConfirmButton.onclick = (ev) => {
      renderServerRubrix(viewType, selectedRubrix);
      let modalParent = modal.parentNode;
      modalParent.removeChild(modal);
    };
  });
  return card;
}

async function renderServerRubrix(viewType, rubrix) {
  CRITERIA_NUMBER = 0;
  let viewerContainer;
  if (viewType === "view") {
    viewerContainer = document.getElementById("rubric-view-container");
  } else if (viewType === "mark") {
    viewerContainer = document.getElementById("rubric-mark-view-container");
  } else if (viewType === "edit") {
    viewerContainer = document.getElementById("input-container");
  }
  viewerContainer.innerHTML = "";
  let rubricTitleEl;
  let rubricDescriptionEl;
  let rubricMarkersNoteEl;
  let rubricCreatorEl;
  let rubricMarkersEl;
  if (viewType == "edit") {
    let courseDetailsEl = document.getElementById("course-details");
    courseDetailsEl.innerHTML = `<label for="courses">Course</label> <br/>
    <select id="courses" disabled>
          <option default id='${rubrix.course.courseId}'>${rubrix.course.subject}${rubrix.course.catalogNbr}</option>
    </select>
    </div>`;

    rubricTitleEl = document.getElementById("rubric-title");
    rubricTitleEl.children[0].innerText = `${rubrix.rubricTitle}`;
    rubricDescriptionEl = document.getElementById("rubric-description");
    rubricDescriptionEl.children[0].innerText = `${rubrix.rubricDescription}`;

    rubricMarkersNoteEl = document.getElementById("rubric-notes");
    rubricMarkersNoteEl.children[0].innerText = `${rubrix.noteToMarkers}`;
    if (rubrix.criteria) {
      CRITERIA_NUMBER++;
      for (criteria of rubrix.criteria) {
        console.log(criteria)
        addCriteria(
          criteria.criteriaTitle,
          criteria.maxGradeAttainable,
          criteria.criteriaDescription,
          criteria.sampleFeedback,
          criteria.gradeBoundaries,
            null
        );
      }
    }

    for (requirement of rubrix.requirements) {
      let desc = JSON.parse(requirement.description);
      let listVals = [];
      for (item of desc.items) {
        listVals.push({ text: item, padding: 0 });
      }
      addChecklist(null, null, listVals);
    }
    return;
  } else if (viewType === "mark") {
    rubricTitleEl = document.createElement("h2");
    rubricTitleEl.textContent = rubrix.rubricTitle;
    rubricTitleEl.classList.add("rubric-title");
    rubricDescriptionEl = document.createElement("div");
    rubricDescriptionEl.innerHTML = `<h3>Description:</h3> <p>${rubrix.rubricDescription}</p>`;
    rubricDescriptionEl.classList.add("rubric-description");
    rubricMarkersNoteEl = document.createElement("div");
    rubricMarkersNoteEl.innerHTML = "<h3>Note to Markers:</h3>";
    rubricMarkersNoteEl.classList.add("rubric-markers-notef");
    let rubricMarkersNotesList = document.createElement("ul");
    rubricMarkersNotesList.classList.add("rubric-markers-notes-list");
    for (note of rubrix.noteToMarkers?.split(".")) {
      let noteEl = document.createElement("li");
      if (note && note !== " ") {
        noteEl.textContent = note;
        noteEl.classList.add("rubric-marker-note");

        rubricMarkersNotesList.appendChild(noteEl);
      }
    }
    rubricMarkersNoteEl.appendChild(rubricMarkersNotesList);

    rubricCreatorEl = document.createElement("h3");
    rubricCreatorEl.classList.add("rubric-creator");
    rubricCreatorEl.innerHTML = `Created By: ${rubrix.creator.username}`;
    rubricMarkersEl = document.createElement("div");
    rubricMarkersEl.classList.add("rubric-markers");
    rubricMarkersEl.innerHTML = `<h2>Markers</h2>`;
    let markersListEl = document.createElement("ul");
    markersListEl.classList.add("markers-list");
    rubrix.rubricUsers.forEach(({ username, role }) => {
      let userEl = document.createElement("li");
      userEl.classList.add("user");
      userEl.innerText = `${username} - ${role}`;
      markersListEl.appendChild(userEl);
    });
    rubricMarkersEl.appendChild(markersListEl);
    viewerContainer.append(
      rubricTitleEl,
      rubricDescriptionEl,
      rubricMarkersNoteEl,
      rubricCreatorEl
    );
    for (criteria of rubrix.criteria) {
      CRITERIA_NUMBER++;
      let titleEl = document.createElement("h2");
      titleEl.textContent = criteria.criteriaTitle;
      let el = document.createElement("div");
      let pointValEl;
      pointValEl = createPointValInput(
        criteria.maxGradeAttainable ? criteria.maxGradeAttainable : 5
      );
      let sampleFeedBackEl = document.createElement("div");
      let descriptionEl = document.createElement("p");
      descriptionEl.innerText  = criteria.criteriaDescription
      console.log(criteria.criteriaDescription)
      if (criteria.sampleFeedback) {
        const sampleFeedbackTitle = document.createElement("h3");
        sampleFeedbackTitle.textContent = "Sample Feedback";

        const sampleFeedbackContent = document.createElement("p");
        sampleFeedbackContent.textContent = criteria.sampleFeedback;

        sampleFeedBackEl.appendChild(sampleFeedbackTitle);
        sampleFeedBackEl.appendChild(sampleFeedbackContent);
      }
      let table = document.createElement("table");
      let tHead = document.createElement("tr");
      tHead.innerHTML = `<td><h3>Mark</h3></td><td><h3>Item(s)</h3></td>`;
      table.appendChild(tHead);
      if (criteria.gradeBoundaries) {
        criteria.gradeBoundaries.sort(
          (c1, c2) => c2.maximumGradeAttainable - c1.maximumGradeAttainable
        );
        for (bound of criteria.gradeBoundaries) {
          let row = document.createElement("tr");
          row.innerHTML = `<td><input type="radio" name="criteriaPoints" value="${bound.maximumGradeAttainable}">${bound.maximumGradeAttainable}</input</td><td><p>${bound.gradeBoundaryDescription}</p></td>`;
          table.appendChild(row);
        }
      }

      el.appendChild(table);
      appendElementsToContainer(
        viewerContainer,
        titleEl,
        descriptionEl,
        el,
        sampleFeedBackEl,
        pointValEl
      );
    }
    for (const [i, requirement] of rubrix.requirements.entries()) {
      CRITERIA_NUMBER++;
      titleEl = document.createElement("h2");
      titleEl.textContent = `Requirements Section ${CRITERIA_NUMBER}`;
      el = document.createElement("div");


      sampleFeedBackEl = document.createElement("div");
      if (requirement.sampleFeedback) {
        const sampleFeedbackTitle = document.createElement("h3");
        sampleFeedbackTitle.textContent = "Sample Feedback";

        const sampleFeedbackContent = document.createElement("p");
        sampleFeedbackContent.textContent = requirement.sampleFeedback;

        sampleFeedBackEl.appendChild(sampleFeedbackTitle);
        sampleFeedBackEl.appendChild(sampleFeedbackContent);
      }
      let desc = JSON.parse(requirement.description);
      pointValEl = createPointValInput(100, 100 / desc.items.length);
      for (item of desc.items) {
        let inputContainer = document.createElement("div");
        let inputLabel = document.createElement("label");
        inputLabel.style.fontSize = "inherit";
        inputLabel.setAttribute("for", item);
        inputLabel.innerHTML = `${item}`;
        let input = document.createElement("input");
        input.type = "checkbox";
        input.value = `${1 / desc.items.length}%`;
        input.name = item;
        input.innerHtml = item;
        inputContainer.appendChild(input);
        inputContainer.appendChild(inputLabel);

        el.append(inputContainer);
      }

      appendElementsToContainer(
        viewerContainer,
        titleEl,
        el,
        sampleFeedBackEl,
        pointValEl
      );
    }
  } else {
  }

  viewerContainer.append(rubricMarkersEl);
}

async function selectRubrixFromServer(viewType) {
  let currentStage = 0;

  // TODO combine use a modal to display rubrix that user has access to on api
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML =
    '<div class="modal-content"><div> <h2>Select a Rubrix</h2> <input type="text" id="course-search" placeholder="Search By Course" list="searchDataList"/><datalist id="searchDataList"></datalist> </div> <div id="rubricCourseSelect"></div> <div class="modal-btn-container"> <button id="modal-back-btn" style="display:none">Back</button>  <button id="modal-confirm-btn" disabled>Select</button>  <button id="modal-cancel-btn">Cancel</button> </div> </div>';
  document.body.appendChild(modal);

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      if (document.body.contains(modal)) {
        setTimeout(() => document.body.removeChild(modal), 50);
      }
    }
  });
  // Get a reference to the modal content element
  var modalContent = modal.querySelector(".modal-content");

  if (isModalDarkMode) {
    modalContent.classList.add("dark-mode");
  } else {
    modalContent.classList.remove("dark-mode");
  }
  // Get references to the confirm and cancel buttons inside the modal
  var modalCancelBtn = document.getElementById("modal-cancel-btn");
  modalCancelBtn.addEventListener("click", function () {
    document.body.removeChild(modal); // Remove the modal from the DOM
  });
  let modalConfirmButton = document.getElementById("modal-confirm-btn");
  var coursesEl = document.getElementById("rubricCourseSelect");
  /*
    TODO:
    fetch courses from api 
    dynamically generate cards bases on that info
  */
  coursesEl.innerHTML = `<form><div id="selectCourseCards" class="card-group">

</div>
<div id="rubrixSelect" style="display:none" >
<div id="courseRubrixContent"></div>
<div class="card-group" id="selectRubrixCard">
</div>
</div>`;
  let form = document.createElement("form");
  let courseCardContainer = document.getElementById("selectCourseCards");
  let coursesWithRubrics = store.courses.filter((course) =>
    store.rubrics.some((rubric) => rubric.courseId === course.courseId)
  );
  for (course of coursesWithRubrics) {
    courseCardContainer.appendChild(
      createCourseCard(
        course.courseId,
        `${course.subject}${course.catalogNbr}`,
        course.description,
        course.title
      )
    );
    ``;
  }
  let rubrixSelect = document.getElementById("rubrixSelect");
  let selectRubrixCard = document.getElementById("selectRubrixCard");
  let courseSelects = document.getElementsByName("courseSelect");
  let courseSelect = document.getElementById("selectCourseCards");
  let courseRubrixContent = document.getElementById("courseRubrixContent");

  courseSelects.forEach((el) => {
    el.addEventListener("change", (event) => {
      currentStage = 1;
      selectedCourseId = event.target.value;
      selectedCourse = store.courses.find(
        (course) => course.courseId === selectedCourseId
      );

      selectRubrixCard.innerHTML = "";
      let courseTitle = document.createElement("h2");
      courseRubrixContent.innerHTML = "";
      courseTitle.textContent = `Rubrix's for ${selectedCourse.subject}${selectedCourse.catalogNbr} \n ${selectedCourse.title}`;
      courseRubrixContent.append(courseTitle);
      let sampleRubrix = { id: 1, name: "Assignment 1", desc: "" };
      let courseRubrix = store.rubrics.filter(
        (rubric) => rubric.courseId === selectedCourseId
      );
      for (rubrix of courseRubrix) {
        selectRubrixCard.append(
          createRubrixCard(
            viewType,
            rubrix.rubricId,
            rubrix.rubricTitle,
            rubrix.rubricDescription
          )
        );
      }

      setTimeout(() => {
        courseSelect.style.display = "none";
        rubrixSelect.style.display = "flex";
        modalBackBtn.style.display = "block";
      }, 500);
    });
  });

  let modalBackBtn = document.getElementById("modal-back-btn");
  modalBackBtn.addEventListener("click", (ev) => {
    if (currentStage == 1) {
      currentStage -= 1;
      setTimeout(() => {
        courseSelect.style.display = "flex";
        rubrixSelect.style.display = "none";
        modalBackBtn.style.display = "none";
        modalConfirmButton?.setAttribute("disabled", "true");
        courseSelects.forEach((el) => {
          el.checked = false;
        });
      }, 500);
    } else {
      modalBackBtn.style.display = none;
    }
  });
}

function renderRubrix(viewType, rubrixData) {
  let viewerContainer;
  if (viewType === "view") {
    viewerContainer = document.getElementById("rubric-view-container");
  } else if (viewType === "mark") {
    viewerContainer = document.getElementById("rubric-mark-view-container");
  } else if (viewType === "edit") {
    viewerContainer = document.getElementById("input-container");
  }
  var course = rubrixData.course.textContent;
  viewerContainer.innerHTML = "";
  var $selectCourse = $('#courses');
  $selectCourse.children().filter(function(){
    return this.text === `${course}`;
  }).prop('selected', true);

  var div = document.getElementById("rubric-title");
  quill = Quill.find(div);
  quill.pasteHTML(`<div>${rubrixData.title.textContent}</div>`)
  div = document.getElementById("rubric-description");
  quill = Quill.find(div);
  quill.pasteHTML(`<div>${rubrixData.description.textContent}</div>`)
  div = document.getElementById("rubric-notes");
  quill = Quill.find(div);
  quill.pasteHTML(`<div>${rubrixData.notes.textContent}</div>`)


  const qSections = rubrixData.sections;

  for (const qSection of qSections) {
    const title = qSection.title;
    const pointVal = qSection.pointVal;
    const sampleFeedback = qSection.sampleFeedback;
    const titleEl = document.createElement("h2");
    titleEl.textContent = title;
    if (viewType === "edit") {
      if (qSection.textareaq != null) {
        addTextInput(
          title,
          pointVal,
          qSection.textareaq,
          sampleFeedback ? sampleFeedback : null
        );
      } else if (qSection.quilltxt) {
        addCriteria(title, pointVal, qSection.quilltxt,  sampleFeedback, null, qSection.tableq);
        //addTable(title, pointVal, qSection.tableq, null)
        sampleFeedbackEl = document.createElement("div");
        if (sampleFeedback) {
          const sampleFeedbackTitle = document.createElement("h3");
          sampleFeedbackTitle.textContent = "Sample Feedback";

          const sampleFeedbackContent = document.createElement("p");
          sampleFeedbackContent.textContent = sampleFeedback;

          sampleFeedbackEl.appendChild(sampleFeedbackTitle);
          sampleFeedbackEl.appendChild(sampleFeedbackContent);
        }
        else {
          const sampleFeedbackTitle = document.createElement("h3");
          sampleFeedbackTitle.textContent = "Sample Feedback";

          const sampleFeedbackContent = document.createElement("p");
          sampleFeedbackContent.textContent = "";

          sampleFeedbackEl.appendChild(sampleFeedbackTitle);
          sampleFeedbackEl.appendChild(sampleFeedbackContent);
        }

      } else if (qSection.listQ) {
        addChecklist(title, pointVal, qSection.listQ, null);
      }
    } else {
      let el;
      let pointValEl;
      let sampleFeedbackEl;
      if (viewType === "view") {
        pointValEl = createPointValElement(pointVal);
      } else if (viewType === "mark") {
        pointValEl = createPointValInput(pointVal);
      }



      if (qSection.textareaq != null) {
        el = document.createElement("p");
        el.textContent = qSection.textareaq;
      } else if (qSection.quilltxt) {
        el = document.createElement("div");
        el.innerHTML = qSection.quilltxt;
      } else if (qSection.tableq) {
        el = document.createElement("div");
        el.innerHTML = qSection.tableq;
      } else if (qSection.listQ) {
        el = createlistQElement(qSection.listQ);
      }
      appendElementsToContainer(
        viewerContainer,
        titleEl,
        el,
        sampleFeedbackEl,
        pointValEl
      );
    }
  }
}
let QUILL_COUNT = 0;
function appendQuillElements(container, element) {
  let section = document.createElement("div");
  QUILL_COUNT ++;
}
function appendElementsToContainer(container, ...elements) {
  let section = document.createElement("div");
  section.className = "q_section";
  section.id = "q_section";
  for (const el of elements) {
    section.appendChild(el);
  }
  container.appendChild(section);
}

function createPointValElement(pointVal) {
  var pointValEl = document.createElement("p");
  pointValEl.textContent = "Points: " + pointVal;
  return pointValEl;
}

function createPointValInput(pointVal, step = null) {
  // Create a div element to hold the input box and label
  var pointValEl = document.createElement("div");

  // Create a label element for the input box and set its text to "Points"
  var pointLabel = document.createElement("label");
  pointLabel.textContent = "Points: ";

  // Create an input element for the point value and set its type to "number"
  var pointValInputEl = document.createElement("input");
  pointValInputEl.type = "number";
  pointValInputEl.max = pointVal;
  pointValInputEl.min = 0;
  pointValInputEl.defaultValue = 0;

  if (step) {
    pointValInputEl.setAttribute("step", step);
  }

  // Create a label element for the "out of" text and set its text to "out of"
  var outOfLabel = document.createElement("label");
  outOfLabel.textContent = " out of " + pointVal;

  var commentLabel = document.createElement("label");
  commentLabel.textContent = "Comment:";

  var commentInput = document.createElement("textarea");
  commentInput.classList.add("textarea"); // add class name to box
  commentInput.type = "text";

  // Append the elements to the parent div element
  pointValEl.appendChild(pointLabel);
  pointValEl.appendChild(pointValInputEl);
  pointValEl.appendChild(outOfLabel);
  pointValEl.appendChild(document.createElement("br"));
  pointValEl.appendChild(commentLabel);
  pointValEl.appendChild(commentInput);
  return pointValEl;
}

function createlistQElement(listQ) {
  var listQEl = document.createElement("ul");
  for (const listItem of listQ) {
    const listItemEl = document.createElement("li");
    listItemEl.textContent = listItem.text;
    listItemEl.style.marginLeft = `${listItem.padding}px`;
    listQEl.append(listItemEl);
  }
  return listQEl;
}

function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
