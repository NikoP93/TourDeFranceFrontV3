import {fetchAnyUrl, restDelete} from "./module.js";

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

async function fetchRiders() {
    const riderTableDiv = document.getElementById("ridertable")
    tblRiders.innerHTML = ""
    riderTableDiv.appendChild(tblRiders)
    const riders = await fetchAnyUrl(urlRiders)
    console.log(riders);
    riders.forEach(createTable)
}

    export function initializeRiderTable() {
        fetchRiders()
    }


