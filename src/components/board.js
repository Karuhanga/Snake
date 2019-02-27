import React from "react";
import {connect} from "react-redux";

import Cell from './cell';

class SnakeBoard extends React.Component{
    render() {
        return <table className={"board"}>
                    <tbody>
                        {this.props.board.map(row => <tr key={row[0].x}>{row.map(cell => <Cell key={cell.x.toString() + cell.y.toString()} dataCell={cell}/>)}</tr>)}
                    </tbody>
                </table>
    }
}

const mapStateToProps = state => {
    return {
        board: state.board
    }
};

export default connect(
    mapStateToProps
)(SnakeBoard);
