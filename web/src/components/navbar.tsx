import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import Products from "./../types/Products";
import ShopCar from "./../components/ShopCar";
//import path from "path";

//Para inserir propriedades/estados no state do react utilizando typescript
interface State {
    //toggleSideBar: boolean,
    toggleShopCar: boolean,
    search?: String,
    shopCarProducts: Products[],
};

class Navbar extends React.Component<any, State> {

    shopCar: ShopCar;

    constructor(props: any) {
        super(props);

        this.state = { toggleShopCar: false, shopCarProducts: [] };

        this.shopCar = new ShopCar();
    }

    loadShopCar = () => {
        //Armazena em um vetor para ser utilizado na renderização
        this.shopCar.selectIDB().then((data: any) => {
            this.setState({ shopCarProducts: data });
        });
    }

    deleteShopCarItem = (ProductId?: number) => {
        this.shopCar.deleteIDB(ProductId);

        this.loadShopCar();
    }

    toggleShopCarModal = () => {
        this.loadShopCar();

        !this.state.toggleShopCar ?
            this.setState({ toggleShopCar: true }) :
            this.setState({ toggleShopCar: false });
    }

    componentWillMount() {
        this.loadShopCar();
    }

    render() {

        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg mb-5 sticky-top rounded">

                    <Link to="/">
                        <button className="btn btn-link navbar-brand">Online Shop</button>
                    </Link>

                    <form className="form-inline my-2 my-lg-0" id="form">
                        <input className="form-control" type="search" onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ search: event.target.value })} placeholder="Pesquisar" id="searchBar" aria-label="Search" />

                        <Link to={`/?search=${this.state.search}`}>
                            <button className="btn btn-outline-success my-0 my-sm-0" id="btnSearch" type="submit"><span
                                className="glyphicon glyphicon-search"></span>Pesquisar</button>
                        </Link>

                    </form>
                    <div className="btn-position">
                        <button className="btn btn-link" type="button" onClick={this.toggleShopCarModal}>Carrinho</button>
                        <Link to="/insert"><button className="btn btn-link">Inserir produtos</button></Link>
                    </div>

                </nav>


                <div className="shop-car shadow" style={this.state.toggleShopCar ? {width:"35%"} : {width:"0"}}>

                    {this.state.toggleShopCar ?

                        this.state.shopCarProducts.map((product: Products) =>
                            (
                                <Link to={`/product/${product.ProductsId}`} key={product.ProductsId}>
                                    <div>
                                        <div className="shop-car-item row">
                                            <div>
                                                <img src={product.ProductsImg} style={{ width: '120px', height: '80px' }} alt="Imagem" />
                                            </div>

                                            <div className="info">
                                                <h6>{product.ProductsName} - {product.ProductsManufactory}</h6>
                                                <h6>R$ {product.ProductsPrice}</h6>
                                                <button className="btn btn-link" onClick={() => { this.deleteShopCarItem(product.ProductsId) }}>Remover</button>
                                            </div>
                                        </div>

                                        <hr></hr>
                                    </div>
                                </Link>

                            )
                        ) : (<></>)}

                </div>

            </>
        )
    }
}


export default Navbar;