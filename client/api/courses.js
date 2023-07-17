/*
async function populateCoursesDatabase() {
    try {
        const response = await fetch("https://cws.auckland.ac.nz/QZ36C/Courses", {
            mode: "cors",
            method: "GET",
            headers: {
                "accept": "text/plain",
            }
        } );
        let output = response.json();
        output.then(data =>{
            data = data.data;
            data.forEach(element => addCourseToDatabase(element));
        })
    }
    catch(err) {
        console.log(err)
    }
}
*/

async function getCoursesFromDatabase() {
    try {
        const response = await fetch (`${API_URL}/GetAllCourses`, {
            mode: "cors",
            method: "GET",
            headers: {
                "accept": "text/plain",

            },
        } )
        let output = await response.json();
        output = output.sort((a, b) => {
            if (a.catalogNbr < b.catalogNbr) {
                return -1;
            }
        });

        //load courses into dropdown -- only available for compsci courses so far
        let dropdown = document.getElementById("courses");
        for (let i = 0; i < output.length; i++) {
            let option = document.createElement("option");
            option.setAttribute("value", output[i].title);
            option.innerText = output[i].subject + " " + output[i].catalogNbr;
            option.id = output[i].courseId;
            dropdown.appendChild(option);
        }

        return output


    }
    catch (err) {
        console.log(err);
    }
}

async function addCourseToDatabase(element)//expects JSON input
{
    let data = {
        "subject": element.subject,
        "catalogNbr": element.catalogNbr,
        "title": element.title,
        "description":element.description
    }
    data = JSON.stringify(data);
    try {
        const response = await fetch (`${API_URL}/AddNewCourse`, {
            mode: "cors",
            method: "POST",
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json"
            },
            body: data
        } )
        let output = await response.text();
        console.log(output);
    }
    catch (err) {
        console.log(err);
    }
}