import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./navbar.css";
import Products from "./../types/Products";
import ShopCar from "./../components/ShopCar";
//import path from "path";

//Para inserir propriedades/estados no state do react utilizando typescript
interface State {
    toggleSideBar: boolean,
    toggleShopCar: boolean,
    search?: String,
    shopCarProducts: Products[],
};

class Navbar extends React.Component<any, State> {

    shopCar: ShopCar;

    constructor(props: any) {
        super(props);

        this.state = { toggleSideBar: false, toggleShopCar: false, shopCarProducts: [] };

        this.shopCar = new ShopCar();

    }

    loadShopCar = () => {
        //Armazena em um vetor para ser utilizado na renderização
        this.shopCar.selectIDB().then((data: any) => {
            this.setState({shopCarProducts: data});
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

    componentWillMount(){
        this.loadShopCar();
    }

    render() {

        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-lg mb-5 sticky-top rounded">

                    <button type="button" onClick={() => this.setState({ toggleSideBar: true })}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link to="/">
                        <button className="btn btn-link navbar-brand">Online Shop</button>
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#Navbar" aria-controls="Navbar"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="Navbar">

                        <form className="form-inline my-2 my-lg-0" id="form">
                            <input className="form-control" type="search" onChange={(event: ChangeEvent<HTMLInputElement>) => this.setState({ search: event.target.value })} placeholder="Pesquisar" id="searchBar" aria-label="Search" />

                            <Link to={`/?search=${this.state.search}`}>
                                <button className="btn btn-outline-success my-0 my-sm-0" id="btnSearch" type="submit"><span
                                    className="glyphicon glyphicon-search"></span>Pesquisar</button>
                            </Link>

                        </form>

                        <button className="btn btn-link shop-car-btn" type="button" onClick={this.toggleShopCarModal}>Carrinho</button>

                        <button className="btn btn-link "><Link to="/insert">Inserir produtos</Link></button>

                    </div>
                </nav>


                <div className={this.state.toggleShopCar ? "shop-car-show shadow" : "shop-car-off"}>

                    {this.state.toggleShopCar ?

                        this.state.shopCarProducts.map((product: Products) =>
                            (
                                <div key={product.ProductsId}>
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

                            )
                        ) : (<></>)}

                </div>

                <div id="Filters" className={this.state.toggleSideBar ? "filters bg-light" : "filtersOff"}>

                    {this.state.toggleSideBar ?
                        (<>
                            <button type="button" className="btn btn-danger" onClick={() => this.setState({ toggleSideBar: false })}>
                                X
                            </button>
                            <a href="/">Eletronicos</a>
                            <a href="/">Informática</a>
                            <a href="/">Entretenimento</a>
                            <a href="/">a</a>
                        </>) : (<></>)
                    }
                </div>

            </>
        )
    }
}


export default Navbar;