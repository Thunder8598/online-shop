import React from "react";
import "./noserver.css";

class NoServer extends React.Component {
    render() {
        return (
            <div className="noserver shadow">
                <h1>404 - Servidor indisponível</h1>
                <h3>Por favor tente mais tarde</h3>
            </div>
        );
    }
}

export default NoServer;