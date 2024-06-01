let count = 1;
let mode = 'player'; // Default mode is Player vs Player

function setMode(selectedMode) {
    mode = selectedMode;
    reset();
}

function myFun(data) {
    if (data.innerHTML === "") {
        if (mode === 'player') {
            playerMove(data);
        } else if (mode === 'ai') {
            playerMove(data);
            if (!win() && count <= 9) {
                setTimeout(aiMove, 500); // Delay AI move for better UX
            }
        }
    }
}

function playerMove(data) {
    if (count % 2 === 0) {
        data.innerHTML = "O";
    } else {
        data.innerHTML = "X";
    }
    count++;
    if (win()) {
        setTimeout(() => {
            alert("Winner: " + (count % 2 === 0 ? "X" : "O"));
            reset();
        }, 100);
    } else if (count > 9) {
        setTimeout(() => {
            alert("Match Draw");
            reset();
        }, 100);
    }
}

function aiMove() {
    let emptyDivs = [];
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById("div" + i).innerHTML === "") {
            emptyDivs.push("div" + i);
        }
    }
    if (emptyDivs.length > 0) {
        let aiChoice = emptyDivs[Math.floor(Math.random() * emptyDivs.length)];
        document.getElementById(aiChoice).innerHTML = "O";
        count++;
        if (win()) {
            setTimeout(() => {
                alert("Winner: O");
                reset();
            }, 100);
        } else if (count > 9) {
            setTimeout(() => {
                alert("Match Draw");
                reset();
            }, 100);
        }
    }
}

function win() {
    return check("div1", "div2", "div3") || check("div1", "div4", "div7") || check("div1", "div5", "div9")
        || check("div3", "div6", "div9") || check("div3", "div5", "div7") || check("div4", "div5", "div6")
        || check("div7", "div8", "div9") || check("div2", "div5", "div8");
}

function check(div1, div2, div3) {
    return getData(div1) !== "" && getData(div1) === getData(div2) && getData(div2) === getData(div3);
}

function getData(div) {
    return document.getElementById(div).innerHTML;
}

function reset() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById("div" + i).innerHTML = "";
    }
    count = 1;
}
