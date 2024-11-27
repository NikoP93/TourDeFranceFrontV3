import {fetchAnyUrl, fillTeamsDropdown, ObjectAsJson} from "./module.js";

const urlRiders = "http://localhost:8080/riders"
const urlPutRider = "http://localhost:8080/riders"
const getTeamsUrl = "http://localhost:8080/teams"

console.log("Jeg er i editrider")

const editRiderHtml = () => {
    return `
    <h2>Redigere Rider</h2>
    <form id="putRider">
        <input type="hidden" id="id" name="id" required/><br/><br/>
    
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

        <button id="pbPutRider" type="submit">Redigere Rider</button>
    </form> `
}



async function putFormDataAsJson(url,formData){
    console.log("Jeg er i postFormDataAsJson")
    console.log(url)
    console.log(formData)
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData.team = {}
    plainFormData.team.teamid = plainFormData.teamid
    const resp = await ObjectAsJson(url,plainFormData,"PUT")
    return resp;
}

async function handleFormSubmit(event){
    event.preventDefault()

    const form = document.getElementById("putRider");
    const url = urlPutRider
    console.log("Dette er form i handleFormSubmit" + form)
    console.log("Dette er url i handleFormSubmit" + url)
    try{
        const formData = new FormData(form)
        console.log("Dette er formData" + formData)
        const responseData = await putFormDataAsJson(url,formData)
        form.reset();
    }catch (error){
        alert(error.message)
        console.error(error)
    }

}

let riders = []
async function fillFormWithInformation() {

    riders = await fetchAnyUrl(urlRiders)

    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has("id")) {
        const riderID = searchParams.get("id")

        riders.forEach(function(rider) {
            if (rider.id == riderID) {
                console.log(rider);
                document.getElementById("id").value = rider.id
                document.getElementById("name").value = rider.name
                document.getElementById("age").value = rider.age
                document.getElementById("totalTime").value = rider.totalTime
                document.getElementById("sprintPoints").value = rider.sprintPoints
                document.getElementById("mountainPoints").value = rider.mountainPoints
                document.getElementById("team").value = rider.team.teamid
            }
        })
    }

}

let isEventListenerAdded = false

function editRiderSetup(){
    if(!isEventListenerAdded){
        console.log("Tilføjer en eventlistener til submit button")

        document.getElementById("editrider").innerHTML = editRiderHtml()

        const ddteam = document.getElementById("team")

        fillTeamsDropdown(ddteam,getTeamsUrl)

        const submit = document.getElementById("pbPutRider")
        submit.addEventListener("click", handleFormSubmit)
        isEventListenerAdded = true


        fillFormWithInformation();
    }

}

export function initializeEditRider(){
    editRiderSetup()
}



