export const DIRECT = "direct";
export const LEFT = "left";
export const RIGHT = "right";
export const UP = "up";
export const DOWN = "down";

export const MOVE = "move";

export const GROW = "grow";

export const RESET = "reset";


export function buildDirectionAction(direction){
    return {
        type: DIRECT,
        payload: {
            direction
        }
    }
}

export function buildMoveAction(direction){
    return {
        type: MOVE,
        payload: {
            direction
        }
    }
}

export function buildGrowAction(food){
    return {
        type: GROW,
        payload: {
            food
        }
    }
}

export function buildResetAction() {
    return {
        type: RESET
    }
}