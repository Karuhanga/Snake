import React from "react";
import classNames from "classnames";

export default class Cell extends React.Component{
    render (){
        let classes = classNames({
            "box": true,
            "blank": this.props.dataCell.inSnake !== true,
            "hasSnake": this.props.dataCell.inSnake === true
        });
        return <td className={classes}>{}</td>
    }
}
