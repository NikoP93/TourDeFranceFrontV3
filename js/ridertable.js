import {fetchAnyUrl, ObjectAsJson, restDelete} from "./module.js";

console.log("Jeg er i ridertable")

const urlRiders = "http://localhost:8080/riders"
const tblRiders = document.createElement("table")


function createTable(rider) {
    let cellcount = 0
    let rowCount = tblRiders.rows.length

    let row = tblRiders.insertRow(rowCount)
    row.id = rider.id

    let cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.name;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.age;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.totalTime;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.sprintPoints;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.mountainPoints;

    cell = row.insertCell(cellcount++)
    cell.innerHTML = rider.team.teamName

    const pbDelete = document.createElement("input")
    pbDelete.type = "button"
    pbDelete.setAttribute("value", "Slet rytter")
    pbDelete.className = "btn1"
    pbDelete.onclick = function () {
        document.getElementById(rider.id).remove()
        deleteRider(rider)

    }
    row.appendChild(pbDelete)

    const linkEdit = document.createElement("a")
    linkEdit.setAttribute("href", "?id=" + rider.id + "#editrider")
    linkEdit.setAttribute("class", "view-link")
    linkEdit.innerHTML = "Redigere rytter"
    row.appendChild(linkEdit)


}

function sortRiders(riders){
    return riders.sort((rid1,rid2) =>{
        if(rid1.totalTime > rid2.totalTime){
            return 1
        } else if (rid2.totalTime > rid1.totalTime){
            return -1
        } else if(rid1.sprintPoints < rid2.sprintPoints){
            return 1
        } else {return -1}
    })
}

async function deleteRider(rider){
    try{
        const url = urlRiders + "/" + rider.id
        const resp = await restDelete(url)
        const body = await resp.text()
        alert(body)
    } catch(error){
        alert(error.message)
        console.log(error)
    }
}

let riders = []

async function fetchRiders() {
    const riderTableDiv = document.getElementById("ridertable")
    tblRiders.innerHTML = ""

    const headerRow = tblRiders.insertRow(0);
    const headers = ["Name", "Age", "Time", "Sprint Points", "Mountain Points", "Team", "Actions"];

    headers.forEach(headerText => {
        const headerCell = document.createElement("th");
        headerCell.innerText = headerText;
        headerRow.appendChild(headerCell);
    });

    riderTableDiv.appendChild(tblRiders)
    riders = await fetchAnyUrl(urlRiders)
    riders = sortRiders(riders)
    console.log(riders);
    riders.forEach(createTable)
}

export function initializeRiderTable() {
    fetchRiders()
}


