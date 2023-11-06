//TODO: AI
//TODO fix bug: can both get tie and win
let squares = document.querySelectorAll('.square');
let squaresArray = [...squares]; //Convert NodeListOf<Element> to an Array
let currentPlayer = 1;
let victory = false;
let winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
squares.forEach(function (div) {
    //players
    div.addEventListener('click', function () {
        if (div.innerText.trim() === "") {

            if (currentPlayer === 1) {
                div.innerText = 'X';
                currentPlayer = 2;
                victory = checkVictory(squares);


            } else {
                div.innerText = 'O';
                currentPlayer = 1;
                victory = checkVictory(squares);

            }
        }
        if (victory) {
            //Stops further clicks
            document.addEventListener('click', function (event) {
                event.stopPropagation();
            }, true);

            document.getElementById('victoryBox').style.display = 'block';
            let blink = document.getElementById('blink2');
            setInterval(function () {
                blink.style.opacity = (blink.style.opacity === 0 ? 1 : 0);
            }, 1000);

            document.addEventListener('keydown', function (event) {
                if (event.key === 'r') {
                    reloadPage();
                }
            });
            document.getElementById('restartText').style.display = 'block';

        }
        let allFilled = squaresArray.every(square => square.innerText.trim() !== '');
        if (allFilled) {
            document.getElementById('tieBox').style.display = 'block';
            let blink = document.getElementById('blink');
            setInterval(function () {
                blink.style.opacity = (blink.style.opacity === 0 ? 1 : 0);
            }, 1000);

            document.addEventListener('keydown', function (event) {
                if (event.key === 'r') {
                    reloadPage();
                }
            });
            document.getElementById('restartText').style.display = 'block';
        }

    })

});

function checkVictory(squares) {
    for (let i = 0; i < winningConditions.length; i++) {
        let [a, b, c] = winningConditions[i];
        if (squares[a].innerText === squares[b].innerText && squares[b].innerText === squares[c].innerText && squares[c].innerText !== '') {
            return true;
        }
    }
    return false;
}

function reloadPage() {
    location.reload();
}
