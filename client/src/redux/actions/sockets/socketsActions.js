

/*---------------------------------- Sockets Actions ----------------------------------------------------*/

export const StartGame = (tetriminos) => {
    return (dispatch) => {
        console.log(tetriminos);
        dispatch({
            type: 'START_GAME',
            tetriminos
        })
    }
}


export const newTetriminos = (tetris, tetriminos) => {
    return (dispatch) => {
        let bi = []
        console.log("--------------------tetriminos---------------------", tetriminos);
        console.log("--------------------tetris---------------------",  tetris);
        console.log("--------------------Solana---------------------", bi.concat(tetriminos, tetris));
        dispatch({
            type: 'NEW_TETRIMINOS',
            tetriminos: bi.concat(tetriminos, tetris),
        })
    }
}