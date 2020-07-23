import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import Product from "./pages/product";
import Insert from "./pages/insert";

class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Route component={Home} exact path="/" />
                <Route component={(props: any) => <Product {...props} />} exact path="/product/:id" />
                <Route component={Insert} path="/insert" />
            </BrowserRouter>
        );
    }
}

export default Routes;