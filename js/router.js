import{initializeRiderTable} from "./ridertable.js";
import {initializeAddRider} from "./addrider.js";


//Hashchange betyder at når noget efter # ændre sig i url, kalder den handleViewChange metoden
function initializeViewNavigation() {
    window.addEventListener("hashchange", handleViewChange);
    handleViewChange();// set initial view

}

//Mapper URL hash til en specifik funktion, her en initilize funktion, kaldt fra den respektive js klasse
const viewInitializers = {
    "#ridertable": () => initializeRiderTable(),
    "#addrider" : () => initializeAddRider(),



}

//Sætter ridertable som det defaultView, så hvis der ikke er nogle #, så sætter den ridertable som default
function handleViewChange() {
    let defaultView = "#ridertable"; // default view

    //Tager Hashet fra URL og sætter det til default view, dvs hvis det er #addRider der er i URL,
    // bliver det nu defaultview
    if (location.hash) {
        defaultView = location.hash; // extract the hash from the URL
    }

    //Fjerner active class
    hideAllViews();

    // Set the selected view to active
    //Active er en styling der highligther
    document.querySelector(defaultView)?.classList.add("active");
    updateNavbarActiveLink(defaultView); // update active link in navbar


    //Checker om der er initilizer funktion på det default view, hvis der er det, kalder den
    const initialzeView = viewInitializers[defaultView];
    if (initialzeView) {
        initialzeView();
    }
}

function updateNavbarActiveLink(view) {
    // Set the corresponding navbar link to active

    // finder det <a> element i navigation baren, der har den samme href, som det current view
    const navbarLink = document.querySelector(`a.view-link[href="${view}"]`); // Get navbar element with href equal to view
    if (navbarLink) {
        navbarLink.classList.add("active"); // Add active class to the navbar element
    }
}

function hideAllViews() {
    // Remove 'active' class from all views and nav links
    document
        .querySelectorAll(".view-content")
        .forEach(content => content.classList.remove("active"));
    document
        .querySelectorAll(".view-link")
        .forEach(link => link.classList.remove("active"));
}

export { initializeViewNavigation };
