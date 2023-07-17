/**
 * @typedef {Object} User
 * @property {string} fname - First name of the user
 * @property {string} lname - Last name of the user
 * @property {string} username - Username of the user
 * @property {string} email - Email of the user
 * @property {Array<string>} roles - Roles of the user
 * @property {string} token - Token of the user
 */

/**
 * @typedef {Object} Store
 * @property {User} user - User object
 * @property {Array<Object>} rubrics - Array of rubric objects
 * @property {Array<Object>} courses - Array of course objects
 */

/**
 * @type {Store} store
 */
let store = {
  user: JSON.parse(localStorage.getItem('user')) || { fname: "", lname: "", username: "", email: "", roles: [], token: "" },
  rubrics: [],
  currentRubric: null,
  courses: [],
  darkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
  searchCourses: (partialString) => {
    //return an array of course objects that match the partial string
    return courses.filter((course) => course.name.includes(partialString));
  },
  setUser: (paritalUser) => {
    user = Object.assign({ fname: "", lname: "", username: "", email: "", roles: [], token: null}, paritalUser)
    localStorage.setItem('user', JSON.stringify(user));
  },
  setDarkMode: (isDark) => {
    darkMode = isDark;
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }
};
