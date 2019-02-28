import React from "react";
import classNames from "classnames";

export default class Cell extends React.Component{
    render (){
        let classes = classNames({
            "box": true,
            "blank": !this.props.isPartOfSnake,
            "hasSnake": this.props.isPartOfSnake,
            "food": this.props.isFood
        });
        return <td className={classes}>{}</td>
    }
}
