import React from "react";
import {connect} from "react-redux";

class SnakeBoard extends React.Component{
    render() {

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
