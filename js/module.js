function fetchAnyUrl(url){
    return fetch(url).then(response => response.json());
}

async function ObjectAsJson(url,object,httpVerbum){
    const objectAsJsonString = JSON.stringify(object);
    console.log(objectAsJsonString);
    const fetchOptions = {
        method: httpVerbum,
        headers: {
            "Content-Type": "application/json",
        },
        body: objectAsJsonString
    }
    const response = await fetch(url, fetchOptions);
    return response;
}

async function restDelete(url){
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    }
    const response = await fetch(url, fetchOptions);
    return response;
}

async function fillTeamsDropdown(ddTeam,getTeamsUrl) {
    ddTeam.innerHTML = '';

    const teams = await fetchAnyUrl(getTeamsUrl)
    console.log("Fetched teams",teams)
    teams.forEach(team => {
        const option = document.createElement("option");
        option.value = team.teamid;
        option.textContent = team.teamName;
        ddTeam.appendChild(option);
    })
}

export{fetchAnyUrl,ObjectAsJson,restDelete,fillTeamsDropdown};