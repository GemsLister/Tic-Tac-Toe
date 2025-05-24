const GameBoard = (() => {
    let board = Array(9).fill('');

    const updateCell = (index, mark) => {
        if(index >= 0 && index < board.length && board[index] === ''){
            board[index] = mark;
            return true;
        }
        return false;
    }
 
    const resetBoard = () => {
        board = Array(9).fill('');
    }

    return{
        updateCell,
        resetBoard
    }
})();

const gameController = (() => {
    const gameStart = () => {

    }

    const playerTurn = (player1, player2) =>{
        
    }

    const checkWin = () => {

    }

    const switchTurns = () =>{

    }

    const resetGame = () =>{

    }

    return{
        gameStart,
        playerTurn,
        checkWin,
        switchTurns,
        resetGame
    }
})();

const displayController = (() => {
    
})();