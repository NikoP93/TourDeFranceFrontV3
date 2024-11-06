import {fetchAnyUrl, restDelete} from "./module.js";

console.log("Jeg er i ridertable")

const urlRiders = "http://localhost:8080/riders"
const getTeamsUrl = "http://localhost:8080/teams"
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


}

async function fetchRiders() {
    const riderTableDiv = document.getElementById("ridertable")
    riderTableDiv.appendChild(tblRiders)
    const riders = await fetchAnyUrl(urlRiders)
    console.log(riders);
    riders.forEach(createTable)
}

    export function initializeRiderTable() {
        fetchRiders()
    }


