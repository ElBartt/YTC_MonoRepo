const lists = [
    [2, 3, 4, 1, 2, 1, 1, 3, 3, 1, 3, 1, 2, 3, 1, 2, 3, 4, 2, 4, 4, 1, 1, 5, 1, 4, 1, 5, 3, 5, 1, 4, 2, 3, 2, 5, 5, 1, 5, 5, 2, 2, 4, 5, 2, 5, 2, 3, 5, 1, 4, 3, 4, 1, 5, 2, 5, 5, 5, 5, 1],
    [1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 3, 2, 3, 4, 4, 1, 4, 1, 5, 1, 5, 4, 1, 3, 5, 3, 5, 4, 3, 1, 4, 1, 5, 4, 4, 4, 3, 1, 4, 2, 3, 1, 3, 5, 1, 5, 5, 5, 2, 5, 5, 1, 1, 5, 5, 2, 1, 5, 1, 1],
    [1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 3, 2, 3, 4, 3, 1, 1, 5, 1, 5, 1, 5, 1, 3, 4, 1, 2, 1, 3, 5, 1, 5, 5, 2, 1, 5, 5, 3, 2, 3, 1, 5, 5, 5, 2, 3, 1, 5, 2, 1, 5, 5, 5, 2, 5, 1],
    [2, 3, 4, 1, 2, 1, 1, 3, 3, 1, 3, 1, 2, 3, 1, 2, 3, 4, 2, 4, 4, 1, 3, 1, 5, 1, 4, 3, 1, 5, 3, 2, 4, 3, 2, 4, 5, 1, 5, 2, 4, 5, 2, 5, 2, 4, 5, 2, 1, 3, 5, 5, 1, 5, 3, 5, 5, 1, 5, 5, 5, 1, 5],
    [1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 3, 4, 2, 4, 3, 1, 5, 1, 2, 4, 3, 5, 4, 3, 1, 5, 3, 2, 1, 5, 1, 3, 2, 5, 5, 1, 4, 2, 3, 3, 5, 4, 5, 3, 2, 1, 2, 5, 4, 5, 1, 5, 5, 2, 5],
    [3, 2, 4, 1, 2, 1, 1, 3, 3, 1, 3, 1, 2, 3, 1, 2, 3, 2, 5, 2, 4, 1, 3, 1, 5, 1, 5, 1, 5, 3, 4, 3, 2, 3, 5, 2, 5, 2, 2, 5, 1, 2, 3, 5, 5, 3, 1, 3, 2, 5, 3, 1, 2, 3, 5, 1, 1, 5, 5, 1, 5, 5, 1], 
    [2, 3, 4, 1, 2, 1, 1, 3, 4, 1, 3, 1, 2, 3, 1, 2, 3, 4, 2, 4, 4, 1, 2, 1, 5, 1, 4, 3, 1, 5, 4, 2, 5, 4, 3, 2, 4, 5, 5, 1, 5, 2, 3, 5, 4, 5, 2, 5, 3, 4, 5, 3, 1, 4, 5, 2, 4, 5, 1, 5, 1, 5],
    [2, 3, 4, 1, 2, 1, 1, 3, 3, 1, 3, 1, 2, 3, 1, 2, 3, 2, 5, 2, 4, 1, 1, 5, 1, 5, 2, 5, 3, 4, 2, 5, 3, 4, 3, 2, 5, 2, 4, 5, 5, 4, 3, 2, 5, 2, 3, 1, 5, 4, 5, 2, 3, 5, 5, 2, 5, 5, 5, 1, 2, 5, 1, 1]
];

const listContainer = document.getElementById("list-container");
const listDatas = document.getElementById("list-datas");
const listCompacted = document.getElementById("list-compacted");

let totalSame = 0;
let totalDifferent = 0;

// Get the common numbers for all lists
const commonNumbers = lists.reduce((acc, curr) => {
    curr.forEach((num, index) => {
    if (acc[index] === undefined) {
        acc[index] = num;
    } else if (acc[index] !== num) {
        acc[index] = ".";
    }
    });
    return acc;
}, []);

// Create the compacted list
const compactedList = document.createElement("div");
compactedList.innerHTML = "<h3>Liste des reponses communes a toutes</h3>";
const commonNumbersList = document.createElement("span");
commonNumbersList.textContent = commonNumbers.join("");
compactedList.appendChild(commonNumbersList);

// Add the number of digits in the common list, the number of different digits and the number of similar digits
const numDigits = commonNumbers.filter(num => typeof num === "number").length;
const numDifferent = commonNumbers.filter(num => num === ".").length;
const numDigitsElement = document.createElement("p");
numDigitsElement.textContent = `Nombre de similitude dans la liste commune : ${numDigits}`;
const numDifferentElement = document.createElement("p");
numDifferentElement.textContent = `Nombre de chiffres differents : ${numDifferent}`;
const numSameElement = document.createElement("p");
numSameElement.textContent = `Nombre total : ${numDigits + numDifferent}`;
compactedList.appendChild(numDigitsElement);
compactedList.appendChild(numDifferentElement);
compactedList.appendChild(numSameElement);

listCompacted.appendChild(compactedList);

for (let i = 0; i < lists.length - 1; i++) {
    const currentList = lists[i];
    const nextList = lists[i + 1];
    const listDifferences = getDifferences(currentList, nextList);

    const listElement = document.createElement("div");
    listElement.innerHTML = `<h3>Liste ${i + 1} vs Liste ${i + 2}</h3>`;

    for (let j = 0; j < currentList.length; j++) {
        const listItem = document.createElement("span");

        if (listDifferences.includes(j)) {
            listItem.classList.add("red");
            totalDifferent++;
        } else {
            listItem.classList.add("green");
            totalSame++;
        }

        listItem.textContent = currentList[j];
        listElement.appendChild(listItem);
    }

    listContainer.appendChild(listElement);
}

const averageDifference = totalDifferent / (totalSame + totalDifferent);
const averageSimilarity = totalSame / (totalSame + totalDifferent);
listDatas.innerHTML = `<br> Average difference: ${averageDifference.toFixed(2)} <br> Average similarity: ${averageSimilarity.toFixed(2)}`;

function getDifferences(list1, list2) {
    const differences = [];

    for (let i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i]) {
            differences.push(i);
        }
    }

    return differences;
}
