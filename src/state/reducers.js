function buildInitialState() {
    let initialBoardState = [];
    for (let x = 0; x < 9; x++) {
        let row = [];
        for (let y = 0; y < 9; y++) {
            row.push({
                x,
                y,
                inSnake: false
            })
        }
        initialBoardState.push(row);
    }
    return {
        board: initialBoardState
    }
}

export default function snakeReducer(state, action){
    if (typeof state === 'undefined') {
        return buildInitialState()
    }

    return state;
}
