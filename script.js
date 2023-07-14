const Gameboard = (() => {
    const board = [];
    const player1 = player("Yuhei", 'O');
    const player2 = player("Arimoto", 'X');
})();

const player = (playerName, sign) => {
    const getName = () => playerName;
    const getSign = () => sign;

    return {getName, getSign};
};