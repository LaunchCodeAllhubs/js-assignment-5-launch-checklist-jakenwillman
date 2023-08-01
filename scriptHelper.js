// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}"> 
                `;
}
/* validate user input to verify text was entered in every field 
and that they entered text for names and numbers for fuel and cargo levels */
function validateInput(testInput) {
    if (testInput === "") {
      return "Empty";
    } else if (isNaN(testInput)) {
      return "Not a Number";
    } else {
      return "Is a Number";
    }
  }

/* declare new variables for the users input for each field on the form
using the corresponding id's */
function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const pilotNameInput = document.querySelector("input[name=pilotName]");
    const copilotNameInput = document.querySelector("input[name=copilotName]");
    const fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    const cargoMassInput = document.querySelector("input[name=cargoMass]");
     
    /* using the validateInput() function, validate that the 
    user fills in all fields on the form. Otherwise alert the user */
    if (validateInput(pilotNameInput.value) === "Empty" || 
      validateInput(copilotNameInput.value) === "Empty" ||
      validateInput(fuelLevelInput.value) === "Empty" || 
      validateInput(cargoMassInput.value) === "Empty") {
        alert("All fields are required. Please fill in all the information.");
        return;
    }
    
    /* validate that the user enters a valid "string" for pilot 
    and copilot fields on the form, otherwise alert the user*/
    if (validateInput(pilotNameInput.value) === "Is a Number" ||
    validateInput(copilotNameInput.value) === "Is a Number") {
        alert("Please enter a correct name for the pilots.")
        return;
    }
    
    // declare new variables for the users input that has been converted to a number
    const fuelLevelNum = Number(fuelLevelInput.value);
    const cargoMassNum = Number(cargoMassInput.value);

    /* validate that the user entered a valid Number for the Cargo Mass and 
    Fuel Level fields on the form. Otherwise alert the user */
    if (isNaN(fuelLevelNum) || isNaN(cargoMassNum)) {
        alert("Fuel Level and Cargo Mass must be numbers.");
        return;
    }
    
    // declare a new variable using the id for the faultyItems div
    const faultyItemsList = document.querySelector("[data-testid=faultyItems]");
    
    // declare new variables containing the value entered for pilot and copilot
    const pilotName = pilotNameInput.value;
    const copilotName = copilotNameInput.value;

    // update and display the pilot and copilot names in the faultyItems div
    faultyItemsList.querySelector("#pilotStatus").textContent = `Pilot ${pilotName} is ready for launch`;
    faultyItemsList.querySelector("#copilotStatus").textContent = `Co-pilot ${copilotName} is ready for launch`;

    /* if user input for fuelLevel is less than 10000, update the text in fuelStatus 
    to say "Fuel level too low for launch". Also update the h2 launchStatus to say 
    "Shuttle Not Ready for launch" and change it's color to "rgb(199, 37, 78)". The faultyItems div
    visibility also needs to be set to "visible". */
    if (fuelLevelNum < 10000) {
      faultyItemsList.style.visibility = "visible";
      faultyItemsList.querySelector("#fuelStatus").textContent = "Fuel level too low for launch";
      document.querySelector("#launchStatus").textContent = "Shuttle Not Ready for Launch";
      document.querySelector("#launchStatus").style.color = "rgb(199, 37, 78)";
    } else {
      faultyItemsList.querySelector("#fuelStatus").textContent = "Fuel level high enough for launch";
    }
    /* if user input for cargoMass is greater than 10000, update the text in cargoStatus 
    to say "Cargo mass too heavy for launch" Also update the h2 launchStatus to say
    "Shuttle Not Ready for launch" and change it's color to "rgb(199, 37, 78)" The faultyItems div
    visibility also needs to be set to "visible". */ 
    if (cargoMassNum > 10000) {
      faultyItemsList.style.visibility = "visible";
      faultyItemsList.querySelector("#cargoStatus").textContent = "Cargo mass too heavy for launch"
      document.querySelector("#launchStatus").textContent = "Shuttle Not Ready for Launch";
      document.querySelector("#launchStatus").style.color = "rgb(199, 37, 78)";
    } else {
      faultyItemsList.querySelector("#cargoStatus").textContent = "Cargo mass low enough for launch"
    }

    /* if user input for cargoMass and fuelLevel are sufficient, update the launchStatus to
    say "Shuttle is Ready for Launch" and change it's color to "rgb(65, 159, 106)" */
    if (fuelLevelNum > 10000 && cargoMassNum < 10000) {
      document.querySelector("#launchStatus").textContent = "Shuttle is Ready for Launch";
      document.querySelector("#launchStatus").style.color = "rgb(65, 159, 106)";
      faultyItemsList.style.visibility = "visible";
    }
}

// add the URL and return response.json
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
       return response.json() 
      });
        

    return planetsReturned;
} 


// using Math.random(), return one planet from the list with a randomly selected index
function pickPlanet(planets) {
  let randomIndex = Math.floor(Math.random() * planets.length);
  return planets[randomIndex];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
