# Rubrix Front End Dev Notes:

## File layout / information
This is a breif explanation of what each file does:
* index.html: This is the html page that is loaded for the user, this includes all tabs that are stored as DIVs that are hidden and shown using JS
* script.js: This holds all the code for creating rubric question sections and handling them in the editor (note this also currently contains some code for the marker portion, this will be split into a separate file)
* nav.js: holds code for showing and hiding sections, any new page section should be added here
* theme.js: holds code for switching between light and dark theme, any element that has the "dark-mode" class must be referenced here
*load.js: holds all the code for loading .rubrix files into the viewer and marker panes, will also eventually hold code for loading from database
* rubricLoadEdit.js: holds all the code for loading .rubrix files into the rubric editor, will also eventually hold code for loading from database
*save.js: holds all the code for saving a rubric file from the editor to a .rubrix file
style.css: holds the style information for how rubric elements are displayed
* modal.css: holds the style information for how modals are displayed
* nav.css: holds the style information for how the navigation bar is displayed
* theme.css: holds the style information for what changes when darkmode / lightmode is toggled
