import React from "react";
import "./alert.css";

interface Props {
    message: string,
    class: string,
}

class Alert extends React.Component<Props, any> {

    render() {
        return (
            <div className={this.props.class} role="alert">
                {this.props.message}
            </div>
        );
    }
}

export default Alert;