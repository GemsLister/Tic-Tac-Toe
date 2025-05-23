const GameBoard = (() => {
    let board = [];

    for(let i = 0; i < 9; i++){
        board.push('');
    }

    const getBoard = () => [...board];

    const cell = (index, mark) => {
        if (board[index] === ''){
            board[index] = mark;
            return true;
        } else if (board[index] === mark) {
            mark = board[index]; 
        } else {
            return false;
        }
    }

    const reset = () =>{
        board = ['', '', '', '', '', '', '', '', ''];
    }
    
    return{
        getBoard,
        cell,
        reset
    }
})();

const playerMove = () => {
    const playerX = 'X';
    const playerO = 'O';
}

const displayController = (() => {
    
})();