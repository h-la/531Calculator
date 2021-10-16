let traininglist;
// new
let trSets

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

    console.log(`Weeks ${rounds}`);

    let movements = [
        new Movement("Benchpress", 80 * 0.90),
        new Movement("Deadlift", 150 * 0.90),
        new Movement("Press", 55 * 0.90),
    ];

    if (squat !== null) {
        movements.push(new Movement("Squat", squat * 0.90))
    }

    traininglist = document.getElementById("trainingslist");
    traininglist.innerHTML = '';

    for (let i = 1; i <= rounds; i++) {
        let trRound = document.createElement("tr");
        traininglist.appendChild(trRound);
        let round = document.createElement("th");
        round.innerText = `Round ${i}`;
        trRound.appendChild(round);

        showWaveElement(1);
        movements.forEach((movement) => {
            trSets = document.createElement("tr");
            traininglist.appendChild(trSets);
            let movementName = document.createElement("th");
            movementName.innerText = movement.name;
            trSets.appendChild(movementName);
            // Wave 1. Warmup, 75%x5, 80%x5, 85%x5
            countRoundValues(movement, 0.75, 0.80, 0.85, 5, 5, 5);
            countRoundValues(movement, 0.80, 0.85, 0.90, 3, 3, 3);
            countRoundValues(movement, 0.75, 0.85, 0.95, 5, 3, 1);
            countRoundValues(movement, 0.60, 0.65, 0.70, 5, 5, 5);
            movement.addWeight();
        })

        // Empty row
        let brEmpty = document.createElement("br");
        traininglist.appendChild(brEmpty);
        /*for (let i = 1; i <= rounds; i++) {
            let trRound = document.createElement("tr");
                traininglist.appendChild(trRound);
                let round = document.createElement("th");
                round.innerText = `Round ${i}`;
                trRound.appendChild(round);
    
                showWaveElement(1);
                movements.forEach((movement) => {       
                // Wave 1. Warmup, 75%x5, 80%x5, 85%x5
                    countRoundValues(movement, 0.75, 0.80, 0.85, 5, 5, 5);
                })
                showWaveElement(2);
                movements.forEach((movement) => {       
                // Wave 2. Warmup, 80%x3, 85%x3, 90%x3
                    countRoundValues(movement, 0.80, 0.85, 0.90, 3, 3, 3);
                })
                showWaveElement(3);
                movements.forEach((movement) => {       
                // Wave 3. Warmup, 75%x5, 85%x3, 95%x1
                    countRoundValues(movement, 0.75, 0.85, 0.95, 5, 3, 1);
                })
                showWaveElement(4);
                movements.forEach((movement) => {       
                // Wave 4. (deload) - 60%x5, 65%x5, 70%x5
                    countRoundValues(movement, 0.60, 0.65, 0.70, 5, 5, 5);
                    movement.addWeight();
                })            
                // Empty row
                let brEmpty = document.createElement("br");
                traininglist.appendChild(brEmpty);              */
    }
}

const countRoundValues = (movement, firstSetProsent, secondSetProsent,
    thirdSetProsent, firstSetReps, secondSetReps, thirdSetReps) => {

    let set1 = document.createElement("th");
    set1.innerText = `${firstSetReps} * ${toFixedValue(movement.trainingMax, firstSetProsent)}`;
    trSets.appendChild(set1);
    let set2 = document.createElement("th");
    set2.innerText = `${secondSetReps} * ${toFixedValue(movement.trainingMax, secondSetProsent)}`;
    trSets.appendChild(set2);
    let set3 = document.createElement("th");
    set3.innerText = `${thirdSetReps} * ${toFixedValue(movement.trainingMax, thirdSetProsent)}`;
    trSets.appendChild(set3);
}
/*
const countRoundValues = (movement, firstSetProsent, secondSetProsent, 
    thirdSetProsent, firstSetReps, secondSetReps, thirdSetReps) => {
    let trSets = document.createElement("tr");
    traininglist.appendChild(trSets);
    let movementName = document.createElement("th");
    movementName.innerText = movement.name;
    trSets.appendChild(movementName);
    let set1 = document.createElement("th");
    set1.innerText = `${firstSetReps} * ${toFixedValue(movement.trainingMax, firstSetProsent)}`;
    trSets.appendChild(set1);
    let set2 = document.createElement("th");
    set2.innerText = `${secondSetReps} * ${toFixedValue(movement.trainingMax, secondSetProsent)}`;
    trSets.appendChild(set2);
    let set3 = document.createElement("th");
    set3.innerText = `${thirdSetReps} * ${toFixedValue(movement.trainingMax, thirdSetProsent)}`;
    trSets.appendChild(set3);
}
*/

const toFixedValue = (trainingMax, firstSetProsent) => {
    let setWeight = (trainingMax * firstSetProsent).toFixed(1);
    setWeight = 2.5 * Math.round(setWeight / 2.5)
    return setWeight + " kg";
}

const showWaveElement = (i) => {
    let trWave = document.createElement("tr");
    traininglist.appendChild(trWave);
    let wave = document.createElement("th");
    wave.innerText = `Wave ${i}`;
    trWave.appendChild(wave);
}
