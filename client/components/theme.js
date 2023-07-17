const toggleBtn = document.getElementById("toggle-btn");
  const body = document.body;
  const nav = document.querySelector("nav");
  const qSections = document.querySelectorAll('.q-section');
  const modal = document.querySelector('.modal');
  const viewContainer = document.querySelector('#rubric-view-container');
  const viewMarkContainer = document.querySelector('#rubric-mark-container');
  const homepages = document.querySelector("#homepageText-container");
  const footer = document.querySelector('.footer');
  const toolbar1 = document.querySelector('#toolbar');
  const selectMenus = document.querySelectorAll('.dropdown-content');
  const loginregisterbutton = document.querySelector('#loginRegisterBtn');
  const aboutbtn = document.querySelector('#about-btn');
  const togglethemebutton = document.querySelector('#toggle-btn');
  const navbarline = document.querySelector('#seperator-bar');
  let toggleDark = () => {

    body.classList.toggle("dark-mode");
    nav.classList.toggle("dark-mode");
    viewMarkContainer.classList.toggle('dark-mode');
    viewContainer.classList.toggle('dark-mode');
    homepages.classList.toggle('dark-mode');
    footer.classList.toggle('dark-mode');
    toolbar1.classList.toggle('dark-mode');
    loginregisterbutton.classList.toggle('dark-mode');
    aboutbtn.classList.toggle('dark-mode');
    togglethemebutton.classList.toggle('dark-mode');
    navbarline.classList.toggle('dark-mode');
    isModalDarkMode = !isModalDarkMode;
    selectMenus.forEach((menu)=> {
      menu.classList.toggle('dark-mode')
    })

    




    const qSections = document.querySelectorAll('.q-section');
    qSections.forEach((qSection) => {
      qSection.classList.toggle('dark-mode');
    });
  }

  toggleBtn.addEventListener("click", () => {
   store.setDarkMode(!store.darkMode);
   toggleDark()
  });


  
window.addEventListener('load', (ev)=> 
 store.darkMode? toggleDark(): null
)
