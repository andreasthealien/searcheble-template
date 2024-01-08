const words = [
    {
        word: "test-1-word",
        explanation: "test-1-explanation"
    },
    {
        word: "test-2-word",
        explanation: "test-2-explanation"
    },
    {
        word: "test-3-word",
        explanation: "test-3-explanation"
    },
    {
        word: "test-4-word",
        explanation: "test-4-explanation"
    }
];


const normallyPlaced = document.getElementById("word-table");
const noMatchWord = document.querySelector("#noMatch")

function showNoResultMessage(trueOrFalse) {
    if (trueOrFalse === true) {
        document.querySelector(".ikke-funnet").classList.remove("hidden");
    } else {
        document.querySelector(".ikke-funnet").classList.add("hidden");
    }
}

function changeNoResultWord(wordToReplace) {
    noMatchWord.innerText = wordToReplace;
}

function MakeBlock(theWord, theExplanation, placement) {
    const newWordRow = document.createElement("tr");
    const newWordDataWord = document.createElement("td");
    const newWordDataExplanation = document.createElement("td");

    newWordRow.classList.add("true-element-exists");
    newWordDataWord.classList.add("word-table-part", "table-collon");
    newWordDataExplanation.classList.add("explanation-table-part", "table-collon");

    newWordDataWord.innerText = theWord;
    newWordDataExplanation.innerText = theExplanation;

    newWordRow.appendChild(newWordDataWord);
    newWordRow.appendChild(newWordDataExplanation);

    placement.appendChild(newWordRow);
};

function PlaceBlocksList(list) {
    list.forEach((currWord, index, array) => {
        MakeBlock(currWord.word, currWord.explanation, normallyPlaced);
    });
}

function DeleteAllBlocks() {
    i = true;
    while (i === true) {
        const elementCheck = document.querySelector(".true-element-exists");
        if (elementCheck !== null) {
            normallyPlaced.removeChild(elementCheck);
        } else {
            i = false;
        };
    };
};

function search(searchWord) {

    const subSearchList = [];

    words.forEach((word, index, array) => {
        if (word.word.toLowerCase().includes(searchWord.toLowerCase())) {
            subSearchList.push(array[index])
        };
    });

    if (subSearchList.length === 0) {
        DeleteAllBlocks();
        changeNoResultWord(searchWord);
        showNoResultMessage(true);
    } else {
        DeleteAllBlocks();
        changeNoResultWord("");
        showNoResultMessage(false);
        PlaceBlocksList(subSearchList);
    };
}


const searchInputElement = document.querySelector("#search-input");
const searchButtonElement = document.querySelector("#søk-button");
const resetButton = document.querySelector("#reset-button");

searchInputElement.addEventListener("keydown", (e) => {
    const value = searchInputElement.value;
    const keyHit = e.key;
    
    if (keyHit === "Enter") {
        search(value);
    };
});

searchButtonElement.addEventListener("click", () => {
    const value = searchInputElement.value;
    search(value);
});

resetButton.addEventListener("click", () => {
    changeNoResultWord("");
    showNoResultMessage(false);
    DeleteAllBlocks();
    searchInputElement.value = "";
    PlaceBlocksList(words);
});


PlaceBlocksList(words);