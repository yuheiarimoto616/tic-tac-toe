const CIRCLE = "◯";
const CROSS = "✕";

const Gameboard = () => {
    const dimension = 3;
    const board = [];

    for (let i = 0; i < dimension; i++) {
        board[i] = [];
        for (let j = 0; j < dimension; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const fillCell = (row, column, player) => {
        board[row][column].addPlayer(player);
    };

    const displayBoard =  () => {
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                let sign = board[i][j];

                let cell = document.getElementById(`${i}${j}`);
                cell.textContent = sign;
            }
        }
    };

    return {displayBoard, getBoard, fillCell};
};

const Cell = () => {
    let player = null;

    const addPlayer = (p) => {
        player = p;
    } 

    const getPlayer = () => player;

    return {addPlayer, getPlayer};
}

const Player = (playerName, Token) => {
    const getName = () => playerName;
    const getToken = () => Token;

    return {getName, getToken};
};

const GameController = (() => {
    let playerOne;
    let playerTwo;
    let gameBoard = Gameboard();

    const setPlayerOne = (player) => {
        playerOne = player;
    };

    const setPlayerTwo = (player) => {
        playerTwo = player;
    };

    let activePlayer = playerOne;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };

    const getActivePlayer = () => activePlayer;

    const playRound = (row, column) => {
        gameBoard.fillCell(row, column, activePlayer);
        switchPlayerTurn();
    }

    return {setPlayerOne, setPlayerTwo, switchPlayerTurn, getActivePlayer, playRound};
})();

const DisplayController = (() => {
    
})();

Gameboard.displayBoard();