
// Code to toggle display of login form and register form
let password = document.getElementById('registrationPasswordInput')
let passwordMatch = document.getElementById('matchPasswordInput');

passwordMatch.addEventListener("input", (event)=> {
    if (passwordMatch.value !== password.value){
        passwordMatch.setCustomValidity('Passwords Don\'t match ')
    }
    else{
        passwordMatch.setCustomValidity("")
    }
})

function toggleForm(formId){
    document.getElementById('loginBox').style.display = "none";
    document.getElementById('registerBox').style.display = "none";
    document.getElementById(formId).style.display = "block";
}

function logout(){
    showPage("homepage");
    document.getElementById("loginRegisterBtn").style.display = "block";
    store.setUser({});
    const navCollection = document.getElementsByClassName("nav-auth-left");
    for (let i = 0; i < navCollection.length; i++) {
        navCollection[i].style.display = "none";
    }
    let forms = document.getElementsByTagName('form')
    for(form of forms ){
        form.reset();
    }
    document.getElementById("logoutBtn").style.display = "none";
    document.getElementById("auth-response-message").innerText = ""
    document.getElementById("seperator-bar").style.display = "none"
    document.getElementById("about-btn").style.display = "block";

}



async function onLogin(){
    document.getElementById("about-btn").style.display = "none"
    document.getElementById("seperator-bar").style.display = "block"
    showPage("rubric-creator");
    document.getElementById("nav").style.display = "block";
    const navCollection = document.getElementsByClassName("nav-auth-left");
    for (let i = 0; i < navCollection.length; i++) {
        navCollection[i].style.display = "inline-block";
    }
    document.getElementById("loginRegisterBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
    getCoursesFromDatabase();
    getRubricsFromDatabase(store.user.username);
    addQuill("rubric-description");
    addQuill("rubric-notes");
    addQuill("rubric-title");
    store.courses = await getCoursesFromDatabase();
    store.rubrics = await getRubricsFromDatabase();

    window.location.assign("index.html#creator");
    reloadPage();


}

function reloadPage() {
    var currentDocumentTimestamp =
    new Date(performance.timing.domLoading).getTime();
    var now = Date.now();
    var tenSec = 10 * 1000;
    var plusTenSec = currentDocumentTimestamp + tenSec;
    if (now > plusTenSec) {
    location.reload();
    } else {}
    }


function addQuill(elementId) {
    var div = document.getElementById(elementId);
    div.classList.add("quill");
    var quill = new Quill(div, {
        modules: {
            toolbar: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { 'list': 'bullet' }],
                ["link", "image", "code-block"],
            ],
        },
        placeholder: "Enter question text here...",
        theme: "snow",
    });
}

window.onload = (ev)=> {
    if(!store.user.token){
        return
    }
    onLogin();

}
