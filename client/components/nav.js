let routes = {
        "#about": document.getElementById('about'),
        "#viewer": document.getElementById('rubric-viewer'),
        "#marker": document.getElementById('marker'),
        "#tutorial": document.getElementById('tutorial'),
        "#creator": document.getElementById('rubric-creator'),
        '#home': document.getElementById('homepage'),
        '#auth': document.getElementById("loginRegisterContainer"),
        '#authSuccess': document.getElementById("successfulRegistrationCard"),
        "#rubrics":document.getElementById("rubrics"),
}


function showPage(pageId) {


        if (pageId != "homepage" && pageId != "loginRegisterContainer" && pageId != "successfulRegistrationCard"){
                document.body.style.backgroundSize = 0;
        }else{
                document.body.style.backgroundSize = 'auto';
        }

        // Hide all pages
        Object.values(routes).forEach(page => {
                page.style.display = 'none';
        })
        // Show the selected page
        document.getElementById(pageId).style.display = "block";
}


function router () {
        document.getElementById("homepage").style.display = "none";
        let hash = window.location.hash
        
        Object.values(routes).forEach(page => {
                page.style.display = 'none';
        })
        
        if (routes.hasOwnProperty(hash)) {
                routes[hash].style.display = 'block';
              }
        else {
                // If the hash doesn't match any route, show a default page
                routes['#home'].style.display = 'block';
        }



}

window.addEventListener('hashchange', router)

window.addEventListener('load', ()=> router())

document.onreadystatechange = function() {
        if (document.readyState !== "complete") {
            document.querySelector("body").style.visibility = "hidden";
            document.querySelector("#spinner").style.visibility = "visible";
        } else {
            document.querySelector("#spinner").style.display = "none";
            document.querySelector( "body").style.visibility = "visible";
        }
    };

function backButton() {
        window.history.back();
}

