/*function getCurrentRequirements() {
    var checklists = document.getElementsByClassName("requirements");
    var inputs = [];

    for (var i = 0; i < checklists.length; i++) {
        var requirement = [];
        var checklist = checklists[i];
        var textareas = checklist.getElementsByTagName("textarea");

        for (var j = 0; j < textareas.length; j++) {

            requirement.push(textareas[j].value);
        }
        inputs.push(requirement);
    }
    return inputs;
}
*
 */
function getCurrentRequirements() {
    var checklists = document.getElementsByClassName("requirements");
    var inputs = [];

    for (var i = 0; i < checklists.length; i++) {
        var checklist = checklists[i];
        var textareas = checklist.getElementsByTagName("textarea");
        var items = [];
        for (var j = 0; j < textareas.length; j++) {
            j !== 0? items.push(textareas[j].value): null
        }

        var checklistData = {
            requirementIndex: i,
            items: items
        };

        inputs.push(checklistData);
    }

    return inputs;
}

async function sendNewRequirementToDatabase(rubricId) {
    let requirements = getCurrentRequirements();
    for (let i = 0; i < requirements.length; i ++) {
        let requirement = requirements[i];
        const response = fetch(`${API_URL}/AddNewRequirement`, {
                    method: "POST",
                    headers: {
                        accept: "text/plain",
                        "Content-Type": "application/json"
                    },
            body: JSON.stringify({
                "description": JSON.stringify(requirement),
                "rubricId": rubricId
            })
        });

    }

}