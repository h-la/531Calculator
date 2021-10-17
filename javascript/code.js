let traininglist = document.getElementById("trainingslist");;
let trSets
let trReps

function Movement(name, trainingMax) {
    this.name = name;
    this.trainingMax = trainingMax;
}
Movement.prototype.addWeight = function () {
    if (this.name === "Squat" || "Deadlift")
        this.trainingMax += 5;
    else
        this.trainingMax += 2.5
}

const countValues = () => {
    let rounds = document.getElementById("rounds").value;
    let squat = document.getElementById("squat").value || null;
    let = benchpress = document.getElementById("benchpress").value || null;
    let deadlift = document.getElementById("deadlift").value || null;
    let press = document.getElementById("press").value || null;

    console.log(`Weeks ${rounds}`);

    let movements = [];

    if (squat !== null) {
        movements.push(new Movement("Squat", squat * 0.90))
    }
    if (benchpress !== null) {
        movements.push(new Movement("Bench press", benchpress * 0.90))
    }
    if (deadlift !== null) {
        movements.push(new Movement("Deadlift", deadlift * 0.90))
    }
    if (press !== null) {
        movements.push(new Movement("Press", press * 0.90))
    }

    traininglist.innerHTML = '';

    for (let i = 1; i <= rounds; i++) {
        showWeeksElement(i)
        showRepsElement();
        movements.forEach((movement) => {
            trSets = document.createElement("tr");
            traininglist.appendChild(trSets);
            let movementName = document.createElement("th");
            movementName.innerText = movement.name;
            trSets.appendChild(movementName);
            // Wave 1. Warmup, 75%x5, 80%x5, 85%x5
            countRoundValues(movement, 0.75, 0.80, 0.85);
            countRoundValues(movement, 0.80, 0.85, 0.90);
            countRoundValues(movement, 0.75, 0.85, 0.95);
            countRoundValues(movement, 0.60, 0.65, 0.70);
            movement.addWeight();
        })
        // Empty row
        let brEmpty = document.createElement("br");
        traininglist.appendChild(brEmpty);
    }
}

const countRoundValues = (movement, firstSetProsent, secondSetProsent,
    thirdSetProsent) => {
    let set1 = document.createElement("th");
    set1.innerText = `${toFixedValue(movement.trainingMax, firstSetProsent)}`;
    trSets.appendChild(set1);
    let set2 = document.createElement("th");
    set2.innerText = `${toFixedValue(movement.trainingMax, secondSetProsent)}`;
    trSets.appendChild(set2);
    let set3 = document.createElement("th");
    set3.innerText = `${toFixedValue(movement.trainingMax, thirdSetProsent)}`;
    trSets.appendChild(set3);
}

const toFixedValue = (trainingMax, firstSetProsent) => {
    let setWeight = (trainingMax * firstSetProsent).toFixed(1);
    setWeight = 2.5 * Math.round(setWeight / 2.5)
    return setWeight + " kg";
}

const showWeeksElement = (i) => {
    let trRound = document.createElement("tr");
    traininglist.appendChild(trRound);
    let round = document.createElement("th");
    round.innerText = `Round ${i}`;
    trRound.appendChild(round);

    for (let x = 1; x <= 4; x++) {
        let thWeek = document.createElement("th");
        thWeek.innerText = `Week ${x}`;
        trRound.appendChild(thWeek);
        let thEmpty = document.createElement("th");
        trRound.appendChild(thEmpty);
        thEmpty = document.createElement("th");
        trRound.appendChild(thEmpty);
    }
}

const showRepsElement = () => {
    trReps = document.createElement("tr");
    traininglist.appendChild(trReps);
    let reps = document.createElement("th");
    reps.innerText = `Reps`;
    trReps.appendChild(reps);
    showReps(5, 5, 5);
    showReps(3, 3, 3);
    showReps(5, 3, 1);
    showReps(5, 5, 5);
}

const showReps = (firstSetReps, secondSetReps, thirdSetReps) => {
    let threps = document.createElement("th");
    threps.innerText = firstSetReps;
    trReps.appendChild(threps);
    threps = document.createElement("th");
    threps.innerText = secondSetReps;
    trReps.appendChild(threps);
    threps = document.createElement("th");
    threps.innerText = thirdSetReps;
    trReps.appendChild(threps);
}

const clearValues = () => {
    traininglist.innerHTML = '';
    document.getElementById("rounds").value = 1;
    document.getElementById("squat").value = "";
    document.getElementById("benchpress").value = "";
    document.getElementById("deadlift").value = "";
    document.getElementById("press").value = "";
}
