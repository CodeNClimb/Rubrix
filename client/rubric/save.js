
const saveButton = document.getElementById('download-rubrix-button');
saveButton.addEventListener('click', saveRubricToRubrixFile);

let rubricHtml = '';

function saveRubricToRubrixFile() {
    const fileName = store.user.username + '.rubrix';
    let rubricHtml = '<qrubric>\n';
    let selectedCourseId = $('#courses option:selected').text();
    rubricHtml += `<qrubriccourse>${selectedCourseId}</qrubriccourse>\n`
    var rubricTitle = document.getElementById("rubric-title");
    rubricTitle = Quill.find(rubricTitle).getText();
    rubricHtml += `<qrubrictitle>${rubricTitle}</qrubrictitle> \n`;
    let rubricDescription = document.getElementById("rubric-description");
    rubricDescription = Quill.find(rubricDescription).getText();
    rubricHtml += `<qrubricdescription>${rubricDescription}</qrubricdescription>\n`;
    let notes = document.getElementById("rubric-notes");
    notes = Quill.find(notes).getText();
    rubricHtml += `<qrubricnotes>${notes}</qrubricnotes>\n`;

    const qSections = document.querySelectorAll('#q_section');
    qSections.forEach((qSection) => {
        const qTitle = qSection.querySelector('#title').value;
        rubricHtml += `<qsection>\n`;
        rubricHtml += `<qtitle>${qTitle}</qtitle>\n`;

        const textArea = qSection.querySelector('.textarea');
        const ul = qSection.querySelector('ul');
        const quillText = qSection.querySelector('.ql-editor');
        const sampleFeedback = qSection.querySelector('#sampleFeedbackTextArea');

        if (ul && (!quillText || !quillText.contains(ul))) { // Check if ul is not inside quillText
            rubricHtml += `<listq>\n`;
            const lis = ul.querySelectorAll('li');
            lis.forEach((li) => {
                const padding = li.style.paddingLeft;
                const textBox = li.querySelector('textarea');
                const textBoxValue = textBox.value;
                rubricHtml += `<li><pad>${padding}</pad><txt>${textBoxValue}</txt></li>\n`;
            });
            rubricHtml += `</listq>\n`;
        } else if (quillText) {
            const quillTextValue = quillText.innerHTML;
            rubricHtml += `<quilltxt>${quillTextValue}</quilltxt>\n`;
        } 
        
        if (textArea) {
            const textAreaValue = textArea.value;
            rubricHtml += `<textareaq>${textAreaValue}</textareaq>\n`;
        }

        if (sampleFeedback) {
            const sampleFeedbackValue = sampleFeedback.value;
            rubricHtml += `<sampleFeedback>${sampleFeedbackValue}</sampleFeedback>\n`;
        }
            const table = qSection.querySelector('table');
            if (table) {
                rubricHtml += `<tableq>\n`;
                rubricHtml += `<table>\n`;
                const rows = table.querySelectorAll('tr');
                rows.forEach((row) => {
                    rubricHtml += '<tr>\n';
                    const cells = row.querySelectorAll('td');
                    cells.forEach((cell) => {
                        var cellValue = cell.querySelector('textarea');
                        if (cellValue === null) {
                            cellValue = cell.querySelector("input").value;

                        }
                        else {
                            cellValue = cellValue.value
                        }

                        rubricHtml += `<td>${cellValue}</td>\n`;
                    });
                    rubricHtml += '</tr>\n';
                });
                rubricHtml += `</table>\n`;
                rubricHtml += `</tableq>\n`;
                const pointVal = qSection.querySelector('#pointVal').value;
                rubricHtml += `<pointVal>${pointVal}</pointVal>\n`;
            }



        rubricHtml += `</qsection>\n`;
    });
    rubricHtml += `</qrubric>`

    const fileBlob = new Blob([rubricHtml], { type: 'text/html' });
    const fileUrl = URL.createObjectURL(fileBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;
    downloadLink.click();
}



const saveHTMLButton = document.getElementById('save-html-button');
saveHTMLButton.addEventListener('click', saveRubricHtml);


function saveRubricHtml() {
    const fileName = 'rubric.html';
    let rubricHtml = '';
    let selectedCourseId = $('#courses option:selected').text()
    var rubricTitle = document.getElementById("rubric-title");
    rubricTitle = Quill.find(rubricTitle).getText();
    rubricHtml += `<h1>${selectedCourseId + ": " + rubricTitle}</h1>`;
    let rubricDescription = document.getElementById("rubric-description");
    rubricDescription = Quill.find(rubricDescription).getText();
    rubricHtml += `<p><u><b>Rubric Description</b></u></p>\n`
    rubricHtml += `<p>${rubricDescription}</p>\n`;
    let notes = document.getElementById("rubric-notes");
    notes = Quill.find(notes).getText();
    rubricHtml += `<p><u><b>Notes to markers</b></u></p>\n`;
    rubricHtml += `<p>${notes}</p>`;
    rubricHtml +=`<hr>`;


    const qSections = document.querySelectorAll('#q_section');
    qSections.forEach((qSection) => {
        const qTitle = qSection.querySelector('#title').value;
        rubricHtml += `<qsection>\n`;
        rubricHtml += `<h4>${qTitle}</h4>\n`;

        const textArea = qSection.querySelector('.textarea');
        const ul = qSection.querySelector('ul');
        const quillText = qSection.querySelector('.ql-editor');
        const sampleFeedback = qSection.querySelector('#sampleFeedbackTextArea');

        if (ul && (!quillText || !quillText.contains(ul))) { // Check if ul is not inside quillText
            rubricHtml += `<ul>\n`;
            const lis = ul.querySelectorAll('li');
            lis.forEach((li) => {
                const padding = li.style.paddingLeft;
                const textBox = li.querySelector('textarea');
                var textBoxValue = textBox.value;
                if (textBoxValue === "") {
                    textBoxValue = parseInt(li.querySelector("input").value);
                }
                rubricHtml += `<li style="padding-left: ${padding};"><txt>${textBoxValue}</txt></li>\n`;
            });
            rubricHtml += `</ul>\n`;
        } else if (quillText) {
            const quillTextValue = quillText.innerHTML;
            rubricHtml += `<div>${quillTextValue}</div>\n`;
        }

        if (textArea) {
            const textAreaValue = textArea.value;
            rubricHtml += `<p>${textAreaValue}</p>\n`;
        }

      // Add code to handle tables
        const table = qSection.querySelector('table');
        if (table) {
                rubricHtml += `<table>\n`;
                const rows = table.querySelectorAll('tr');
                rows.forEach((row) => {
                    rubricHtml += '<tr>\n';
                    const cells = row.querySelectorAll('td');
                    cells.forEach((cell) => {
                        var cellValue = cell.querySelector('textarea');
                        if (cellValue === null) {
                            cellValue = parseInt(cell.querySelector("input").value);
                        }
                        else {
                            cellValue = cellValue.value
                        }
                        rubricHtml += `<td>${cellValue}</td>\n`;
                    });
                    rubricHtml += '</tr>\n';
                });
                rubricHtml += `</table>\n`;

        }
        if (sampleFeedback) {
            const sampleFeedbackValue = sampleFeedback.value;
            rubricHtml += `<h4>Sample Feedback:</h4>\n`;
            rubricHtml += `<p>${sampleFeedbackValue}</p>\n`;
        }
        const pointVal = qSection.querySelector('#pointVal').value;
        rubricHtml += `<p>This criteria is worth ${pointVal} mark(s).</p>\n`;
        rubricHtml += "</br>";

        rubricHtml += `</qsection>\n`;
        rubricHtml +=`<hr>`;
    });

    rubricHtml +=
        `<style>
/* Make list dots follow padding */
ul {
  list-style-position: inside;
}

/* Set a modern font */
body {
font-family: 'Helvetica Neue', Arial, sans-serif;
}

/* Add some padding to the page */
body {
padding: 20px;
}

/* Center the content */
.container {
max-width: 800px;
margin: 0 auto;
}

/* Add a subtle shadow to elements */
.box {
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Add a border-radius to soften edges */
.box {
border-radius: 4px;
}

/* Add some basic table styling */
table {
  border-collapse: collapse;
}

/* Add border to all cells */
table, th, td {
  border: 1px solid black;
}

/* Add padding to cells */
th, td {
  padding: 8px;
}


</style>
`;


    const fileBlob = new Blob([rubricHtml], { type: 'text/html' });
    const fileUrl = URL.createObjectURL(fileBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;
    downloadLink.click();
}
