import Api from "../../../socket/Api"

/*---------------------------------- Sockets Actions ----------------------------------------------------*/

/*
** Get room List
*/

export const getRooms = () => {
    return (dispatch) => {
        Api()
            .get("/rooms")
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: "SET_ROOMS",
                    rooms: res.data
                })
            })
            .catch((err) => {
                console.log(err);
            });
    }
}


export const StartGame = (tetriminos) => {
    return (dispatch) => {
        console.log(tetriminos);
        dispatch({
            type: 'START_GAME',
            tetriminos
        })
    }
}

/* 
** Get new Tetriminos in startred game
*/
export const newTetriminos = (tetris, tetriminos) => {
    return (dispatch) => {
        let newTetris = []
        dispatch({
            type: 'NEW_TETRIMINOS',
            tetriminos: newTetris.concat(tetriminos, tetris),
        })
    }
}