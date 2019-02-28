import React from "react";
import {connect} from "react-redux";
import {
    buildDirectionAction, buildGrowAction, buildMoveAction, buildResetAction, DOWN, LEFT, RIGHT,
    UP
} from "../state/actions";
import ArrowKeysReact from 'arrow-keys-react';

import Cell from './cell';
import {buildNextPiece} from "../utils";

let heartBeat;

class SnakeBoard extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            gameInProgress: false,
            speed: 500,
            score: 0
        };

        ArrowKeysReact.config({
            left: () => {
                if (this.props.direction === RIGHT){
                    return;
                }
                this.props.changeDirection(LEFT);
            },
            right: () => {
                if (this.props.direction === LEFT){
                    return;
                }
                this.props.changeDirection(RIGHT);
            },
            up: () => {
                if (this.props.direction === DOWN){
                    return;
                }
                this.props.changeDirection(UP);
            },
            down: () => {
                if (this.props.direction === UP){
                    return;
                }
                this.props.changeDirection(DOWN);
            }
        });
    }

    componentDidMount(){
        this.boardHolder.focus();
    }

    render() {
        return <div className={"boardHolder"} {...ArrowKeysReact.events} tabIndex="1" autoFocus ref={ref => this.boardHolder = ref}>
                    <span className={"score"}>Score: {this.state.score}</span>
                    <table className={"board"}>
                        <tbody>
                        {this.props.board.map(row => <tr key={row[0].x}>{row.map(cell => <Cell key={cell.x.toString() + cell.y.toString()} dataCell={cell} isPartOfSnake={this.cellIsPartOfSnake(cell)} isFood={this.cellIsFood(cell)}/>)}</tr>)}
                        </tbody>
                    </table>
                    <button onClick={() => this.toggleGamePlay()}>
                        {this.getButtonText()}
                    </button>
                    <button disabled={!this.state.gameInProgress} onClick={() => this.faster()}>
                        Faster
                    </button>
                    <button disabled={!this.state.gameInProgress} onClick={() => this.slower()}>
                        Slower
                    </button>
                </div>
    }

    cellIsFood(cell) {
        return cell.x === this.props.food.x && cell.y === this.props.food.y
    }

    cellIsPartOfSnake(cell) {
        for (let index in this.props.snake){
            if (this.props.snake[index].x === cell.x && this.props.snake[index].y === cell.y){
                return true;
            }
        }
        return false;
    }

    toggleGamePlay(end=false) {
        if (this.state.gameInProgress !== true && this.state.gameInProgress !== false){
            this.props.reset();
            this.setState({
                gameInProgress: false
            });
            this.setState({
                score: 0
            });
            return;
        }

        if (this.state.gameInProgress === true){
            clearInterval(heartBeat);
            this.setState({
                gameInProgress: false
            });
            if (end){
                this.setState({
                    gameInProgress: null
                });
            }
        }
        else{
            clearInterval(heartBeat);
            heartBeat = setInterval(() => this.move(this.props.direction, this.props.snake, this.props.food), this.state.speed);
            this.setState({
                gameInProgress: true
            })
        }
    }

    getButtonText() {
        if (this.state.gameInProgress === true){
            return "Pause";
        }
        else if (this.state.gameInProgress === false){
            return "Play!";
        }
        else{
            return "Restart";
        }
    }

    move(direction, snake, food) {
        let nextPiece = buildNextPiece(snake[0], direction);

        if (this.isOnTheSnake(nextPiece)){
            this.toggleGamePlay(true);
            return;
        }

        if (nextPiece.x === food.x && nextPiece.y === food.y){
            this.props.doEat(food);
            this.setState({
                score: this.state.score + 10
            })
        }
        else{
            this.props.doMove(direction, snake, food)
        }
        this.boardHolder.focus();
    }

    isOnTheSnake(nextPiece) {
        return this.cellIsPartOfSnake(nextPiece)
    }

    slower() {
        let speed = this.state.speed + 100;
        this.setState({
            speed: speed > 3000 ? 3000 : speed
        });
        clearInterval(heartBeat);
        heartBeat = setInterval(() => this.move(this.props.direction, this.props.snake, this.props.food), this.state.speed);
    }

    faster() {
        let speed = this.state.speed - 100;
        this.setState({
            speed: speed < 100 ? 100 : speed
        });
        clearInterval(heartBeat);
        heartBeat = setInterval(() => this.move(this.props.direction, this.props.snake, this.props.food), this.state.speed);
    }
}

const mapStateToProps = state => {
    return {
        board: state.board,
        food: state.food,
        snake: state.snake,
        direction: state.direction
    }
};

const mapDispatchToProps = dispatch => {
    return {
        doMove: (direction, snake, food) => {
            dispatch(buildMoveAction(direction));
        },
        doEat: (food) => {
            dispatch(buildGrowAction(food));
        },
        changeDirection: (direction) => {
            dispatch(buildDirectionAction(direction));
        },
        reset: () => {
            dispatch(buildResetAction());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SnakeBoard);
