function buildInitialState() {
    let initialBoardState = [];
    for (let x = 0; i < 9; i++) {
        let row = [];
        for (let y = 0; j < 9; j++) {
            row.push({
                x,
                y
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
