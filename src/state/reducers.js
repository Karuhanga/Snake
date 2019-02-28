import getRandomInt, {buildNextPiece} from '../utils'
import {combineReducers} from "redux";
import {DIRECT, DOWN, FEED, GROW, LEFT, MOVE, RESET, RIGHT, UP} from "./actions";

export const SIZE = 15;

function buildInitialBoardState() {
    let initialBoardState = [];
    for (let x = 0; x < SIZE; x++) {
        let row = [];
        for (let y = 0; y < SIZE; y++) {
            row.push({
                x,
                y,
            })
        }
        initialBoardState.push(row);
    }
    return initialBoardState;
}

function buildRandomFoodLocation() {
    let initialFoodX = getRandomInt(0, SIZE-1);
    let initialFoodY = getRandomInt(0, SIZE-1);

    return {
        x: initialFoodX,
        y: initialFoodY
    }
}

function boardReducer(boardState, action) {
    if (typeof boardState === 'undefined'){
        return buildInitialBoardState();
    }

    if (action.type === RESET){
        return buildInitialBoardState();
    }

    return boardState;
}

function foodReducer(foodState, action) {
    if (typeof foodState === 'undefined'){
        return buildRandomFoodLocation();
    }

    if (action.type === GROW){
        return buildRandomFoodLocation();
    }

    if (action.type === RESET){
        return buildRandomFoodLocation();
    }

    return foodState;
}

function buildInitialSnakeSpan() {
    let x = getRandomInt(0, SIZE-1);
    let y = getRandomInt(0, SIZE-1);

    const snake = [];
    snake.push({
        x,
        y
    });
    return snake;
}

function snakeReducer(snakeState, action){
    if (typeof snakeState === 'undefined'){
        return buildInitialSnakeSpan();
    }

    switch (action.type){
        case GROW: return [action.payload.food].concat(snakeState);
        case MOVE: return [buildNextPiece(snakeState[0], action.payload.direction)].concat(snakeState.slice(0, snakeState.length - 1));
        case RESET: return buildInitialSnakeSpan();
    }

    return snakeState;
}

function directionReducer(directionState, action){
    if (typeof directionState === 'undefined'){
        return [UP, DOWN, LEFT, RIGHT][getRandomInt(0, 3)];
    }

    switch (action.type){
        case DIRECT: return action.payload.direction;
        case RESET: return [UP, DOWN, LEFT, RIGHT][getRandomInt(0, 3)];
    }

    return directionState;
}

const gameReducer = combineReducers({
    board: boardReducer,
    food: foodReducer,
    snake: snakeReducer,
    direction: directionReducer,
});

export default gameReducer;
