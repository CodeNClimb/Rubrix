
function genqAreaTop(div, newTitle) {
  div.id = "q_section";
  div.classList.add("q-section");

  // check if the body has the dark mode class
  if (document.body.classList.contains("dark-mode")) {
    // add the dark mode class to the new q-section
    div.classList.add("dark-mode");
  }

  var title = document.createElement("textarea");
  title.type = "text";
  title.id = "title";
  title.value = newTitle;
  div.appendChild(title);
  div.appendChild(document.createElement("br"));
}

function genNotesAboutCriteria(div, notesAboutCriteria) {
  var addNotesAboutCriteria = document.createElement("input");
  addNotesAboutCriteria.type = "checkbox";
  addNotesAboutCriteria.id = "addnotesAboutCriteria";
  addNotesAboutCriteria.name = "addnotesAboutCriteria";
  addNotesAboutCriteria.value = "yes";
  addNotesAboutCriteria.onchange = function () {
    if (this.checked) {
      var notesTitle = document.createElement("h3");
      feedbackTitle.innerHTML = "Notes About Criteria";
      div.appendChild(notesTitle);

      var notesTextArea = document.createElement("textarea");
      feedbackTextArea.name = "feedbackTextArea";
      feedbackTextArea.id = "sampleFeedbackTextArea";
      feedbackTextArea.rows = "5";
      feedbackTextArea.cols = "50";

      div.appendChild(feedbackTextArea);
    } else {
      var notesTitle = div.querySelector("h3");
      var notesTextArea = div.querySelector("#sampleFeedbackTextArea");
      if (notesTitle) {
        notesTitle.remove();
      }
      if (notesTextArea) {
        notesTextArea.remove();
      }
    }
  };

  var addNotesAboutCriteriaLabel = document.createElement("label");
  addNotesAboutCriteriaLabel.for = "addSampleFeedback";
  addNotesAboutCriteriaLabel.innerHTML = "Add Sample Feedback";
  div.appendChild(addNotesAboutCriteria);
  div.appendChild(addNotesAboutCriteriaLabelLabel);

  if (notesAboutCriteria) {
    addNotesAboutCriteria.checked = true;

    var notesTitle = document.createElement("h3");
    notesTitle.innerHTML = "Sample Feedback";
    div.appendChild(notesTitle);

    var feedbackTextArea = document.createElement("textarea");
    feedbackTextArea.name = "notesAboutCriteriaTextArea";
    feedbackTextArea.id = "notesAboutCriteriaTextArea";
    feedbackTextArea.rows = "5";
    feedbackTextArea.cols = "50";
    feedbackTextArea.value = notesAboutCriteria;
    addNotesAboutCriteria.checked = true;
    div.appendChild(feedbackTextArea);
  }
}

function genPointValInput(div, newPointVal) {
  //Add an input for point value
  var pointValLabel = document.createElement("label");
  pointValLabel.innerHTML = "How many marks is this question worth?";
  div.appendChild(pointValLabel);
  div.appendChild(document.createElement("br"));
  var pointVal = document.createElement("input");
  pointVal.type = "number";
  pointVal.id = "pointVal";
  pointVal.value = newPointVal || 1; // Modified line
  pointVal.min = 0;
  div.appendChild(pointVal);
}

function genSampleFeedBackArea(div, sampleFeedback) {
  var addSampleFeedback = document.createElement("input");
  addSampleFeedback.type = "checkbox";
  addSampleFeedback.id = "addSampleFeedback";
  addSampleFeedback.name = "addSampleFeedback";
  addSampleFeedback.value = "yes";
  addSampleFeedback.onchange = function () {
    if (this.checked) {
      var feedbackTitle = document.createElement("h3");
      feedbackTitle.innerHTML = "Sample Feedback";
      div.appendChild(feedbackTitle);

      var feedbackTextArea = document.createElement("textarea");
      feedbackTextArea.name = "feedbackTextArea";
      feedbackTextArea.id = "sampleFeedbackTextArea";
      feedbackTextArea.rows = "5";
      feedbackTextArea.cols = "50";

      div.appendChild(feedbackTextArea);
    } else {
      var feedbackTitle = div.querySelector("h3");
      var feedbackTextArea = div.querySelector("#sampleFeedbackTextArea");
      if (feedbackTitle) {
        feedbackTitle.remove();
      }
      if (feedbackTextArea) {
        feedbackTextArea.remove();
      }
    }
  };

  var addSampleFeedbackLabel = document.createElement("label");
  addSampleFeedbackLabel.for = "addSampleFeedback";
  addSampleFeedbackLabel.innerHTML = "Add Sample Feedback";
  div.appendChild(addSampleFeedback);
  div.appendChild(addSampleFeedbackLabel);

  if (sampleFeedback) {
    addSampleFeedback.checked = true;

    var feedbackTitle = document.createElement("h3");
    feedbackTitle.innerHTML = "Sample Feedback";
    div.appendChild(feedbackTitle);

    var feedbackTextArea = document.createElement("textarea");
    feedbackTextArea.name = "feedbackTextArea";
    feedbackTextArea.id = "sampleFeedbackTextArea";
    feedbackTextArea.rows = "5";
    feedbackTextArea.cols = "50";
    feedbackTextArea.value = sampleFeedback;
    addSampleFeedback.checked = true;
    div.appendChild(feedbackTextArea);
  }
}

function genUpDownBut(div) {
  // Create the move up button
  var moveUpBtn = document.createElement("button");
  moveUpBtn.classList.add("move-up-btn"); // add class name to button
  moveUpBtn.innerHTML = "Move Up";
  moveUpBtn.onclick = function () {
    if (div.previousElementSibling) {
      div.parentNode.insertBefore(div, div.previousElementSibling);
    }
  };
  div.appendChild(moveUpBtn);

  // Create the move down button
  var moveDownBtn = document.createElement("button");
  moveDownBtn.classList.add("move-down-btn"); // add class name to button
  moveDownBtn.innerHTML = "Move Down";
  moveDownBtn.onclick = function () {
    if (div.nextElementSibling) {
      div.parentNode.insertBefore(div.nextElementSibling, div);
    }
  };
  div.appendChild(moveDownBtn);
}

function genDeleteButton(div) {
  div.appendChild(document.createElement("br"));
  div.appendChild(document.createElement("br"));

  var deleteBtn = document.createElement("button");
  deleteBtn.id = "deleteBtn";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.onclick = function () {
    div.remove();
    toggleDeleteAllBtn(); // Call the toggleDeleteAllBtn function
  };
  div.appendChild(deleteBtn);
}

function genBottomArea(div, inputContainer, point, sampleFeedback) {
  genDeleteButton(div);
  genUpDownBut(div);

  if (point === -1) {
  } else if (point !== undefined) {
    genPointValInput(div, point);
  } else {
    genPointValInput(div);
  }

  if (sampleFeedback) {
    genSampleFeedBackArea(div, sampleFeedback);
  } else if (typeof sampleFeedback === "object") {
  } else {
    genSampleFeedBackArea(div);
  }

  inputContainer.appendChild(div);

  toggleDeleteAllBtn();
}

function addTextInput(title = "", point = 1, textVal = "", sampleFeedback, boundaries) {
  var inputContainer = document.getElementById("input-container");
  var div = document.createElement("div");

  genqAreaTop(div, title); // Modified line

  var input = document.createElement("textarea");
  input.classList.add("textarea"); // add class name to box
  input.type = "text";
  input.value = textVal; // Modified line
  div.appendChild(input);

  genBottomArea(div, inputContainer, point, sampleFeedback); // Modified line
}

function addCriteria(
  title = "",
  point = 0,
  quillVal = "",
  sampleFeedback,
  boundaries = null,
  boundariesTable = null
) {
  var inputContainer = document.getElementById("input-container");
  var div = document.createElement("div");
  div.className = "criteria";
  genqAreaTop(div, title); // Modified line

  var input = document.createElement("div");
  input.classList.add("quill");
  var description = document.createElement("textarea");
  description.id = "description";
  description.placeholder = "description";
  div.appendChild(input);
  var quill = new Quill(input, {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image", "code-block"],
      ],
    },
    placeholder: "Enter question text here...",
    theme: "snow",
  });

  var table = document.createElement("table");

  if (boundaries) {
    let tHead = document.createElement("tr");
    tHead.innerHTML = `<td><textarea class="quill">Mark</textarea></td><td><textarea class="quill">Item(s)</textarea></td>`;
    table.appendChild(tHead);
    boundaries.sort(
      (c1, c2) => c2.maximumGradeAttainable - c1.maximumGradeAttainable
    );
    for (criteria of boundaries) {
      let row = document.createElement("tr");
      row.innerHTML = `<td><input type ="number" class="quill" value = ${criteria.maximumGradeAttainable}></input></td><td><textarea class="quill">${criteria.gradeBoundaryDescription}</textarea></td>`;
      table.appendChild(row);
    }
    console.log(boundariesTable);
    var numRowsInput = table.rows.length;
    var numColsInput = 2;
  }
  else if (boundariesTable) {
    boundariesTable = boundariesTable.slice(16, -17);
    table.innerHTML = boundariesTable;
    var numRowsInput = table.rows.length;
    numRowsInputElm = numRowsInput;
    var numColsInput = 2;

    // Get references to the source and destination tables
    const sourceTable = table;
    const destinationTable = document.createElement('table');

    // Copy the table rows
    const rows = sourceTable.querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
      let count = 0;
      const row = rows[i];
      const cells = row.querySelectorAll('td');
      const newRow = document.createElement('tr');

      for (let j = 0; j < cells.length; j++) {
        var textArea = document.createElement("textarea")
        textArea.innerText = cells[j].textContent;
        const newCell = document.createElement('td');
        if (i > 0 && count === 0) {
          textArea = document.createElement(("input"));
          textArea.value = cells[j].textContent;
          textArea.type = "number";
          count ++;
        }

        newCell.appendChild(textArea);
        newRow.appendChild(newCell);
      }

      destinationTable.appendChild(newRow);
    }

    table = destinationTable;
  }



  else {
    var numRowsInput = 3;
    var numColsInput = 2;
    for (var i = 0; i < numRowsInput; i++) {
      var row = document.createElement("tr");
      let count = 0;
      for (var j = 0; j < numColsInput; j++) {
        var cell = document.createElement("td");
        var input = document.createElement("textarea");
        //input.classList.add("quill");
        input.id = "quill" + i.toString() + j.toString();
        //input.type = "text";
        if (i === 0 && j === 0) {
          input.innerText = "Mark Per Item";
        } else if (i === 0 && j === 1) {
          input.innerText = "Item(s)";
        }
       if (i > 0 && count === 0) {
         input = document.createElement("input");
         input.type = "number";
         count ++;
       }
        cell.appendChild(input);
        row.appendChild(cell);
        table.appendChild(row);
      }
    }
  }

   //Check if table has tbody tags and delete them if present
  var tbody = table.querySelector("tbody");
  if (tbody) {
    table.removeChild(tbody);
  }

  div.appendChild(table);

  div.appendChild(document.createElement("br"));

  var numRowsLabel = document.createElement("label");
  numRowsLabel.innerHTML = "Number of Rows:";
  div.appendChild(numRowsLabel);

  var numRowsInputElm = document.createElement("input");
  numRowsInputElm.type = "number";
  numRowsInputElm.id = "num-rows";
  numRowsInputElm.value = numRowsInput;
  numRowsInputElm.min = 1;
  numRowsInputElm.step = 1;
  div.appendChild(numRowsInputElm);

  numRowsInputElm.addEventListener("input", updateTable);

  function updateTable() {
    var numRows = parseInt(numRowsInputElm.value);
    var numCols = 2;
    var table = div.querySelector("table");
    if (numCols >= 2 && numRows >= 1) {
      // save existing input values
      var inputs = [];
      var rows = table.getElementsByTagName("tr");
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        inputs[i] = [];
        for (var j = 0; j < cells.length; j++) {
          try {
            inputs[i][j] = cells[j].querySelector("textarea").value;
          }catch(e) {
            inputs[i][j] = cells[j].querySelector("input").value
          }
        }
      }
      while (table.firstChild) {
        table.removeChild(table.firstChild);
      }

      // create new input boxes and set their values
      for (var i = 0; i < numRows; i++) {
        var row = document.createElement("tr");
        let count = 0;
        for (var j = 0; j < numCols; j++) {
          var cell = document.createElement("td");
          var input = document.createElement("textarea");

          input.id = "quill" + i.toString() + j.toString();
          if (i === 0 && j === 0) {
            input.innerText = "Marks per Item";
          } else if (i === 0 && j === 1) {
            input.innerText = "Item(s)";
          }
          if (i > 0 && count === 0) {
            input = document.createElement("input");
            input.type = "number";
            count ++;
          }
          // set value from saved inputs
          input.value = inputs[i] && inputs[i][j] ? inputs[i][j] : "";

          cell.appendChild(input);
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
    } else {
      return;
    }
  }
  quill.root.innerHTML = quillVal; // Modified line

  genBottomArea(div, inputContainer, point, sampleFeedback); // Modified line

  // Get the HTML content of the Quill editor
  function getQuillHtml() {
    return quill.root.innerHTML;
  }

  // Get the text content of the Quill editor
  function getQuillText() {
    return quill.getText();
  }
}

function addTable(title = "", point = 0, tableVal = "", sampleFeedback) {
  var inputContainer = document.getElementById("input-container");
  var div = document.createElement("div");

  genqAreaTop(div, title);

  var table = document.createElement("table");

  if (tableVal) {
    table.innerHTML = tableVal;
    var numRowsInput = table.rows.length;
    var numColsInput = 2;
  } else {
    var numRowsInput = 2;
    var numColsInput = 2;
  }

  for (var i = 0; i < numRowsInput; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < numColsInput; j++) {
      var cell = document.createElement("td");
      var input = document.createElement("input");
      input.type = "text";
      if (i === 0 && j === 0) {
        input.placeholder = "Marks";
      } else if (i === 0 && j === 1) {
        input.placeholder = "Item(s)";
      }
      if (tableVal) {
        input.value = table.rows[i].cells[j].innerHTML;
      }
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  // Check if table has tbody tags and delete them if present
  var tbody = table.querySelector("tbody");
  if (tbody) {
    table.removeChild(tbody);
  }

  div.appendChild(table);

  div.appendChild(document.createElement("br"));

  var numRowsLabel = document.createElement("label");
  numRowsLabel.innerHTML = "Number of Rows:";
  div.appendChild(numRowsLabel);

  var numRowsInputElm = document.createElement("input");
  numRowsInputElm.type = "number";
  numRowsInputElm.id = "num-rows";
  numRowsInputElm.value = numRowsInput;
  numRowsInputElm.min = 1;
  numRowsInputElm.step = 1;
  div.appendChild(numRowsInputElm);

  var numColsLabel = document.createElement("label");
  numColsLabel.innerHTML = "Number of Columns:";
  div.appendChild(numColsLabel);

  var numColsInputElm = document.createElement("input");
  numColsInputElm.type = "number";
  numColsInputElm.id = "num-cols";
  numColsInputElm.value = numColsInput;
  numColsInputElm.min = 1;
  numColsInputElm.step = 1;
  div.appendChild(numColsInputElm);

  numRowsInputElm.addEventListener("input", updateTable);
  numColsInputElm.addEventListener("input", updateTable);

  function updateTable() {
    var numRows = parseInt(numRowsInputElm.value);
    var numCols = parseInt(numColsInputElm.value);
    var table = div.querySelector("table");

    // save existing input values
    var inputs = [];
    var rows = table.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      inputs[i] = [];
      for (var j = 0; j < cells.length; j++) {
        inputs[i][j] = cells[j].querySelector("input").value;
      }
    }

    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }

    // create new input boxes and set their values
    for (var i = 0; i < numRows; i++) {
      var row = document.createElement("tr");
      for (var j = 0; j < numCols; j++) {
        var cell = document.createElement("td");
        var input = document.createElement("input");
        input.type = "text";
        if (i === 0 && j === 0) {
          input.placeholder = "Marks";
        } else if (i === 0 && j === 1) {
          input.placeholder = "Item(s)";
        }
        // set value from saved inputs
        input.value = inputs[i] && inputs[i][j] ? inputs[i][j] : "";
        cell.appendChild(input);
        row.appendChild(cell);
      }
      table.appendChild(row);
    }
  }
  genBottomArea(div, inputContainer, point, sampleFeedback); // Modified line
}

function addListElement(
  checklist,
  listItemValue = { text: "", padding: 0 },
  sampleFeedback
) {
  var item = document.createElement("li");
  var inputBox = document.createElement("textarea");
  inputBox.type = "text";
  inputBox.placeholder =
    "Item " + (checklist.getElementsByTagName("li").length + 1);
  let paddingLevel = listItemValue.padding;
  item.style.paddingLeft = `${paddingLevel}px`;
  inputBox.value = listItemValue.text;

  var btnContainer = document.createElement("div");
  btnContainer.classList.add("listQBtnContainer");
  btnContainer.style.display = "flex";

  var deleteItemBtn = document.createElement("button");
  deleteItemBtn.innerHTML = "Delete";
  deleteItemBtn.classList.add("delete-item-btn"); // add class name to button

  var indentBtn = document.createElement("button");
  indentBtn.innerHTML = "Indent";
  indentBtn.classList.add("indent-item-btn"); // add class name to button
  var unindentBtn = document.createElement("button");
  unindentBtn.innerHTML = "Unindent";
  unindentBtn.classList.add("unindent-item-btn"); // add class name to button
  unindentBtn.style.display = "none"; // make unindent button invisible by default

  btnContainer.append(deleteItemBtn, indentBtn, unindentBtn);
  item.appendChild(inputBox);
  item.appendChild(btnContainer);

  checklist.appendChild(item);
  deleteItemBtn.addEventListener("click", function () {
    item.remove();
  });

  indentBtn.addEventListener("click", function () {
    paddingLevel += 20;
    item.style.paddingLeft = paddingLevel + "px";
    unindentBtn.style.display = "inline-block";
  });

  unindentBtn.addEventListener("click", function () {
    if (paddingLevel >= 20) {
      paddingLevel -= 20;
      item.style.paddingLeft = paddingLevel + "px";
    }
    if (paddingLevel == 0) {
      unindentBtn.style.display = "none";
    }
  });
}

function addChecklist(title = "", point = "", listVal, sampleFeedback = "") {
  var inputContainer = document.getElementById("input-container");
  var div = document.createElement("div");
  div.className = "requirements";
  if (!title) {
    title = `Requirement`;
  }
  div.classList.add("checkList"); // add the class "checkList" to the div element
  genqAreaTop(div, title);
  var checklist = document.createElement("ul");

  if (listVal) {
    for (listItemValue of listVal) {
      addListElement(checklist, listItemValue);
    }
  } else {
    for (var i = 0; i < 5; i++) {
      addListElement(checklist);
    }
  }

  div.appendChild(checklist);
  var addLineButton = document.createElement("button");
  addLineButton.innerHTML = "Add Requirement";
  addLineButton.addEventListener("click", function () {
    addListElement(checklist);
  });
  div.appendChild(addLineButton);

  genBottomArea(div, inputContainer, -1, null); // Modified line

  checklist.addEventListener("click", function (event) {
    if (
      event.target.tagName === "BUTTON" &&
      event.target.innerHTML === "Delete"
    ) {
      var li = event.target.parentNode;
      li.parentNode.removeChild(li);
    }
  });
}

// Get all the question sections
const sections = document.querySelectorAll(".q_section");

// Loop through each section and add event listeners to the buttons
sections.forEach((section, index) => {
  const moveUpBtn = section.querySelector(".move-up-btn");
  const moveDownBtn = section.querySelector(".move-down-btn");

  // Add click event listeners to the buttons
  moveUpBtn.addEventListener("click", () => moveSectionUp(index));
  moveDownBtn.addEventListener("click", () =>
    moveSectionDown(index, sections.length)
  );
});

function moveSectionUp(index) {
  // Check if the section is already at the top
  if (index === 0) return;

  // Get the previous section and swap positions
  const previousSection = sections[index - 1];
  sections[index].parentNode.insertBefore(sections[index], previousSection);
}

function moveSectionDown(index, totalSections) {
  // Check if the section is already at the bottom
  if (index === totalSections - 1) return;

  // Get the next section and swap positions
  const nextSection = sections[index + 1];
  sections[index].parentNode.insertBefore(nextSection, sections[index]);
}

// Store a variable that indicates whether the modal is in dark mode
let isModalDarkMode = false;

// Get a reference to the "Delete All" button
var deleteAllBtn = document.getElementById("delete-all-btn");

// Add an event listener to the "Delete All" button
deleteAllBtn.addEventListener("click", function () {
  // Create a confirmation modal
  var modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML =
    '<div class="modal-content"> <h2>Are you sure you want to delete all your progress?</h2> <div class="modal-btn-container"> <button id="modal-confirm-btn">Yes</button> <button id="modal-cancel-btn">No</button> </div> </div>';
  document.body.appendChild(modal);
  // Get a reference to the modal content element
  var modalContent = modal.querySelector(".modal-content");

  if (isModalDarkMode) {
    modalContent.classList.add("dark-mode");
  } else {
    modalContent.classList.remove("dark-mode");
  }
  // Get references to the confirm and cancel buttons inside the modal
  var modalConfirmBtn = document.getElementById("modal-confirm-btn");
  var modalCancelBtn = document.getElementById("modal-cancel-btn");

  // Add event listeners to the confirm and cancel buttons
  modalConfirmBtn.addEventListener("click", function () {
    // Select all q_section elements
    var qSections = document.querySelectorAll(".q-section");
    // Loop through each q_section element and remove it from the DOM
    qSections.forEach(function (qSection) {
      qSection.remove();
    });

    toggleDeleteAllBtn(); // Call the toggleDeleteAllBtn function
    document.body.removeChild(modal); // Remove the modal from the DOM
  });
  modalCancelBtn.addEventListener("click", function () {
    document.body.removeChild(modal); // Remove the modal from the DOM
  });
});

function toggleDeleteAllBtn() {
  // Select all q_section elements
  var qSections = document.querySelectorAll(".q-section");
  // If there are q_section elements, show the "Delete All" button; otherwise, hide it
  if (qSections.length > 0) {
    document.getElementById("delete-all-btn").style.display = "block";
  } else {
    document.getElementById("delete-all-btn").style.display = "none";
  }
}

// Get the PDF button and file input elements
const pdfButton = document.getElementById("pdf-button");
const pdfFileInput = document.getElementById("pdf-file-input");

// Add a click event listener to the PDF button
pdfButton.addEventListener("click", () => {
  // Simulate a click on the file input element
  pdfFileInput.click();
});

// Add a change event listener to the file input element
pdfFileInput.addEventListener("change", () => {
  // Get the selected file
  const file = pdfFileInput.files[0];

  if (file) {
    // Create a new FileReader object
    const reader = new FileReader();

    // Set a callback function for when the file is loaded
    reader.onload = () => {
      // Get the PDF viewer iframe element
      const pdfViewer = document.getElementById("rubric-pdf-viewer");

      // Set the source of the PDF viewer to the loaded file data
      pdfViewer.src = reader.result;
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  }
});

function swapDivs() {
  let leftDiv = document
    .getElementById("rubric-mark-container")
    .querySelectorAll("td")[0];
  let rightDiv = document
    .getElementById("rubric-mark-container")
    .querySelectorAll("td")[1];

  if (leftDiv.style.float === "right") {
    leftDiv.style.float = "left";
    rightDiv.style.float = "right";
  } else {
    leftDiv.style.float = "right";
    rightDiv.style.float = "left";
  }
}

//adding a new course

var addCourseBtn = document.getElementById("addCourseBtn");
var coursePopup = document.getElementById("coursePopup");

var closeBtn = coursePopup.querySelector(".close");

addCourseBtn.addEventListener("click", function () {
  coursePopup.style.display = "block";
});

closeBtn.addEventListener("click", function () {
  coursePopup.style.display = "none";
});
var courseForm = document.getElementById("courseForm");
courseForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  var subject = document.getElementById("subject").value;
  var catalogNbr = document.getElementById("catalogNbr").value;
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;
  var course = {
    subject: subject,
    catalogNbr: catalogNbr,
    title: title,
    description: description,
  };
  addCourseToDatabase(course);
  // Log the course object (you can modify this part according to your requirement)
  courseForm.reset();
  coursePopup.style.display = "none";
  //update dropdown
  var dropdown = document.getElementById("courses");
  let option = document.createElement("option");
  option.innerText = subject + " " + catalogNbr;
  setTimeout(() => getCoursesFromDatabase(), 1000);
  dropdown.appendChild(option);
});
