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

    const checkWin = () => {
        for (let i = 0; i < dimension; i++) {
            let win = true;
            for (let j = 1; j < dimension; j++) {
                if ((board[i][j].getPlayer() == null) || (board[i][j].getPlayer() !== board[i][j-1].getPlayer())) {
                    win = false;
                    break;
                }
            }

            if (win) {
                return true;
            }
        }

        for (let i = 0; i < dimension; i++) {
            let win = true;
            for (let j = 1; j < dimension; j++) {
                if ((board[j][i].getPlayer() == null) || (board[j][i].getPlayer() !== board[j-1][i].getPlayer())) {
                    win = false;
                    break;
                }
            }

            if (win) {
                return true;
            }
        }

        let winLR = true;
        let winRL = true;
        for (let i = 1; i < dimension; i++) {
            if ((board[i][i].getPlayer() == null) || board[i][i].getPlayer() !== board[i-1][i-1].getPlayer()) {
                winLR = false;
            }

            if ((board[i][dimension - 1 - i].getPlayer() == null) || board[i][dimension - 1 - i].getPlayer() !== board[i-1][dimension - 1 - (i - 1)].getPlayer()) {
                winRL = false;
            }
        }

        return winLR || winRL;
    };

    return {checkWin, getBoard, fillCell};
};

const Cell = () => {
    let player = null;

    const addPlayer = (p) => {
        player = p;
    } 

    const getPlayer = () => player;

    const getToken = () => {
        if (player == null) {
            return "";
        } else {
            return player.getToken();
        }
    }

    return {addPlayer, getPlayer, getToken};
}

const Player = (playerName, Token) => {
    const getName = () => playerName;
    const getToken = () => Token;

    return {getName, getToken};
};

const GameController = (() => {
    let playerOne = Player("Yuhei", CIRCLE);
    let playerTwo = Player("Arimoto", CROSS);
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
        if (gameBoard.checkWin()) {
            console.log(gameBoard.checkWin());
        };
        switchPlayerTurn();
    }

    const getBoard = () => gameBoard.getBoard();

    return {setPlayerOne, setPlayerTwo, switchPlayerTurn, getActivePlayer, playRound, getBoard};
})();

const DisplayController = (() => {
    let cells = document.querySelectorAll('.cell');

    const updateScreen =  () => {
        const board = GameController.getBoard();

        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board.length; j++) {
                let sign = board[i][j].getToken();

                let cell = document.getElementById(`${i}${j}`);
                cell.textContent = sign;
            }
        }
    };

    const updateCell = (e) => {
        let cellID = e.target.id;
        GameController.playRound(parseInt(cellID[0]), parseInt(cellID[1]));
        e.target.removeEventListener('click', updateCell);
        updateScreen();
    }

    cells.forEach(cell => {
        cell.addEventListener('click', updateCell);
    });

    updateScreen();
})();