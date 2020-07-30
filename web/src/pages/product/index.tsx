import React from "react";
import Navbar from "./../../components/navbar";
import Alert from "./../../components/alert";
import ShopCar from "./../../components/ShopCar";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";
import Api from "../../api";
import { match } from "react-router-dom";
import Products from "./../../types/Products";

//Formato do parametro da barra de endereço
interface RouterProps {
    id: string,
}

interface Props {
    match?: match<RouterProps>,
}

interface State {
    AlertCarShop: number,
    ProductInfo: Products,
    BtnAddCar: boolean,
}

class Product extends React.Component<Props, State> {

    shopCar: ShopCar;

    constructor(props: Props) {
        super(props);

        this.shopCar = new ShopCar();

        this.state = {
            AlertCarShop: 0,
            BtnAddCar: true,

            ProductInfo: {
                ProductsId: 0,
                ProductsName: "",
                ProductsManufactory: "",
                ProductsDescription: "",
                ProductsPrice: 0,
                ProductsImg: ""
            }
        };
    }

    setBtnAddCar = (data: any) => {
        (data) ? this.setState({ BtnAddCar: false }) : this.setState({ BtnAddCar: true });
    }

    loadProducts = () => {
        const ProductId = this.props.match?.params.id;

        Api(`/products/${ProductId}`).then((response) => {
            this.setState({ ProductInfo: response.data });

            this.shopCar.selectIDB(this.state.ProductInfo.ProductsId).then((data: any) => {
                this.setBtnAddCar(data);
            });
        });
    }

    insertShopCarIndexedDB = () => {
        this.shopCar.insertIDB(this.state.ProductInfo);
        this.shopCar.selectIDB(this.state.ProductInfo.ProductsId).then((data: any) => {
            this.setBtnAddCar(data);
            this.setState({ AlertCarShop: 1 });

            setTimeout(() => this.setState({ AlertCarShop: 0 }), 3000);
        });
    }

    deleteShopCarIndexedDB = () => {
        this.shopCar.deleteIDB(this.state.ProductInfo.ProductsId);
        this.shopCar.selectIDB(this.state.ProductInfo.ProductsId).then((data: any) => {
            this.setBtnAddCar(data);
            this.setState({ AlertCarShop: 2 });

            setTimeout(() => this.setState({ AlertCarShop: 0 }), 3000);
        });
    }

    componentWillMount() {
        this.loadProducts();
    }

    componentDidUpdate() {
        if (this.state.ProductInfo.ProductsId !== Number(this.props.match?.params.id))
            this.loadProducts();
    }

    render() {

        return (
            <>
                <Navbar />
                {
                    (this.state.AlertCarShop === 1) ? (<Alert message="Produto adicionado no carrinho" class="alert alert-success container" />) :
                        (this.state.AlertCarShop === 2) ? (<Alert message="Produto removido do carrinho" class="alert alert-success container" />) : (<></>)
                }

                <main className="container">

                    <div className="">

                        <div className="title">
                            <h3>{this.state.ProductInfo.ProductsName} - {this.state.ProductInfo.ProductsManufactory}</h3>
                            <div className="img">
                                <img src={this.state.ProductInfo.ProductsImg} alt="Imagem do produto" />
                            </div>
                        </div>

                        <div className="price">
                            <h1>R$ {this.state.ProductInfo.ProductsPrice}</h1>
                            <button type="button" className="btn btn-success btn-block">Comprar</button>
                            {
                                (this.state.BtnAddCar) ?
                                    (<button type="button" className="btn btn-primary btn-block" onClick={this.insertShopCarIndexedDB}>Colocar no Carrinho</button>) :
                                    (<button type="button" className="btn btn-danger btn-block" onClick={this.deleteShopCarIndexedDB}>Remover do Carrinho</button>)
                            }

                        </div>

                        <div className="description">
                            <p>{this.state.ProductInfo.ProductsDescription}</p>
                        </div>

                    </div>

                </main>
            </>
        );
    }
}

export default Product;