import React from "react";
import "./alert.css";

interface Props {
    message: string,
    error: boolean,
}

class Alert extends React.Component<Props, any> {

    render() {
        return (
            <div className={(this.props.error)?"alert alert-danger container":"alert alert-success container"} role="alert">
                {this.props.message}
            </div>
        );
    }
}

export default Alert;