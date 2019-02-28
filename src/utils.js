/**
 * Get the difference of the numbers,
 * Pick a random point along this difference
 * Be sure to add the min number back to keep us within range
 * Inspired by https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
import {DOWN, LEFT, RIGHT, UP} from "./state/actions";
import {SIZE} from "./state/reducers";

export default function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function buildNextPiece(head, direction) {
    head = Object.assign({}, head);
    switch (direction) {
        case UP:
            head.x--;
            break;
        case DOWN:
            head.x++;
            break;
        case LEFT:
            head.y--;
            break;
        case RIGHT:
            head.y++;
            break;
    }
    if (head.x > SIZE && direction === DOWN) {
        head.x = 0;
    }
    if (head.x < 0 && direction === UP) {
        head.x = SIZE - 1;
    }

    if (head.y > SIZE && direction === RIGHT) {
        head.y = 0;
    }

    if (head.y < 0 && direction === LEFT) {
        head.y = SIZE - 1;
    }
    return head
}
