const player = (playerName, sign) => {
    const getName = () => playerName;
    const getSign = () => sign;

    return {getName, getSign};
};

const Gameboard = (() => {
    const dimension = 3;
    const board = [["◯", "✕", "✕"], 
                  ["◯", "✕", "✕"], 
                  ["◯", "✕", "✕"]];
    const player1 = player("Yuhei", 'O');
    const player2 = player("Arimoto", 'X');

    const displayBoard =  () => {
        console.log("started");
        for (let i = 0; i < dimension; i++) {
            for (let j = 0; j < dimension; j++) {
                let sign = board[i][j];

                let cell = document.getElementById(`${i}${j}`);
                cell.textContent = sign;
            }
        }
    };

    return {displayBoard};
})();

Gameboard.displayBoard();