import {fillTeamsDropdown, ObjectAsJson} from "./module.js";

const urlPostRider = "http://localhost:8080/riders"
const getTeamsUrl = "http://localhost:8080/teams"

console.log("Jeg er i addrider")


const addRiderHtml = () => {
    return `
    <h2>Add Rider</h2>
    <form id="postRider">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required/><br/><br/>

        <label htmlFor="age">Age:</label>
        <input type="number" id="age" name="age" required/><br/><br/>

        <label htmlFor="totalTime">Total Time (in seconds):</label>
        <input type="number" step="0.01" id="totalTime" name="totalTime" required/><br/><br/>

        <label htmlFor="sprintPoints">Sprint Points:</label>
        <input type="number" id="sprintPoints" name="sprintPoints" required/><br/><br/>

        <label htmlFor="mountainPoints">Mountain Points:</label>
        <input type="number" id="mountainPoints" name="mountainPoints" required/><br/><br/>

        <label htmlFor="team">Team:</label>
        <select id="team" name="teamid">
            <option value="">Select a team</option>
            <!-- Team options will be populated here -->
        </select><br/><br/>

        <button id="pbPostRider" type="submit">Add Rider</button>
    </form> `
}


async function postFormDataAsJson(url, formData) {
    console.log("Jeg er i postFormDataAsJson")
    console.log(url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.team = {}
    plainFormData.team.teamid = plainFormData.teamid
    const resp = await ObjectAsJson(url, plainFormData, "POST")
    return resp;
}

async function handleFormSubmit(event) {
    event.preventDefault()

    const form = document.getElementById("postRider");
    const url = urlPostRider
    console.log("Dette er form i handleFormSubmit" + form)
    console.log("Dette er url i handleFormSubmit" + url)
    try {
        const formData = new FormData(form)
        console.log("Dette er formData" + formData)
        const responseData = await postFormDataAsJson(url, formData)
        form.reset();
    } catch (error) {
        alert(error.message)
        console.error(error)
    }

}

let isEventListenerAdded = false

function addRiderSetup() {
    if (!isEventListenerAdded) {
        console.log("Tilføjer en eventlistener til submit button")

        document.getElementById("addrider").innerHTML = addRiderHtml()

        const ddteam = document.getElementById("team")

        fillTeamsDropdown(ddteam, getTeamsUrl)

        const submit = document.getElementById("pbPostRider")
        submit.addEventListener("click", handleFormSubmit)
        isEventListenerAdded = true
    }

}

export function initializeAddRider() {
    addRiderSetup()
}



