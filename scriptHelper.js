// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
}

/*validate user input to verify something was entered in every field and that
they entered text for names and numbers for fuel and cargo levels*/

function validateInput(testInput) {
    if (testInput === "") {
      return "Empty";
    } else if (isNaN(testInput)) {
      return "Not a Number";
    } else {
      return "Is a Number";
    }
  }

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const pilotNameInput = document.querySelector("input[name=pilotName]");
    const copilotNameInput = document.querySelector("input[name=copilotName]");
    const fuelLevelInput = document.querySelector("input[name=fuelLevel]");
    const cargoMassInput = document.querySelector("input[name=cargoMass]");

    if (validateInput(pilotNameInput.value) === "Empty" || 
    validateInput(copilotNameInput.value) === "Empty" ||
    validateInput(fuelLevelInput.value) === "Empty" || 
    validateInput(cargoMassInput.value) === "Empty") {
        alert("All fields are required. Please fill in all the information.");
        return;
    }
    
    if (validateInput(pilotNameInput.value) === "Is a Number" ||
    validateInput(copilotNameInput.value) === "Is a Number") {
        alert("Please enter a correct name for the pilots.")
        return;
    } 
    
    const fuelLevelNum = Number(fuelLevelInput.value);
    const cargoLevelNum = Number(cargoMassInput.value);

    if (isNaN(fuelLevelNum) || isNaN(cargoLevelNum)) {
        alert("Fuel Level and Cargo Mass must be numbers.");
        return;
    }

    const faultyItemsList = document.querySelector('[data-testid="faultyItems"]');
    
    const pilotName = pilotNameInput.value;
    const copilotName = copilotNameInput.value;

    faultyItemsList.querySelector("#pilotStatus").textContent = `Pilot ${pilotName} is ready for launch`;
    faultyItemsList.querySelector("#copilotStatus").textContent = `Co-pilot ${copilotName} is ready for launch`;

    if (fuelLevelNum < 10000) {
      faultyItemsList.querySelector("#fuelStatus").textContent = "Fuel level too low for launch";
      document.querySelector("#launchStatus").textContent = "Shuttle Not Ready for launch";
      document.querySelector("#launchStatus").style.color = "red";
      faultyItemsList.style.visibility= "visible";
    } else {
      faultyItemsList.querySelector("#fuelStatus").textContent = "Fuel level high enough for launch"
    }

    if (cargoLevelNum > 10000) {
      faultyItemsList.querySelector("#cargoStatus").textContent = "Cargo mass too heavy for launch"
      document.querySelector("#launchStatus").textContent = "Shuttle Not Ready for launch";
      document.querySelector("#launchStatus").style.color = "#C7254E";
      faultyItemsList.style.visibility = "visible";
    } else {
      faultyItemsList.querySelector("#cargoStatus").textContent = "Cargo mass low enough for launch"
    }

    if (fuelLevelNum > 10000 && cargoLevelNum < 10000) {
      document.querySelector("#launchStatus").textContent = "Shuttle is Ready for Launch";
      document.querySelector("#launchStatus").style.color = "#419F6A";
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch().then( function(response) {
        });

    return planetsReturned;
}

function pickPlanet(planets) {
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
