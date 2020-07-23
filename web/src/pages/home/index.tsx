import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from "./../../components/navbar";
import Api from "../../api";
import Products from "./../../types/Products";

interface State {
    ProductsLoaded: boolean,
    QueryParams?: string | null,
}

class Home extends React.Component<RouteComponentProps, State> {

    //Vetor do tipo Products
    productsArray: Products[];

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            ProductsLoaded: false,
            QueryParams: "",
        };

        //Inicializa productsArray
        this.productsArray = [];
    }

    //Carrega produtos
    loadProducts = (search: string | null) => {
        let dataProducts = null;

        //Recebe promessa do server
        dataProducts = Api.get(`/products/?search=${search}`);

        //Espera promessa e então...
        dataProducts.then((response) => {
            this.productsArray = response.data; // ... atribui valores no array

            //Muda o estado indicando que o processo está concluído e obriga o react a atualizar a página
            this.setState({ ProductsLoaded: true });
        });
    }

    //Gerencia a pesquisa
    search = () => {
        const Query = new URLSearchParams(this.props.location.search);
        let search = Query.get("search");

        if ((search !== this.state.QueryParams)) {
            this.setState({ QueryParams: search });

            this.loadProducts(search);
        }
    }


    //Renderiza pagina
    render() {
        this.search();

        return (
            <>
                <Navbar />

                <main className="container">

                    <div className="form-inline alignContent" >

                        {
                            //Para cada produto no vetor, um card é renderizado
                            this.productsArray.map((product) =>
                                (
                                    <Link to={`/product/${product.ProductsId}`} key={product.ProductsId}>
                                        <div className="card cardFormat shadow-lg p-3 mb-5 bg-white rounded">
                                            <img src={product.ProductsImg}
                                                className="card-img-top" width="320px" height="160px" alt="..." />

                                            <div className="card-body">
                                                <h5 className="card-title">{product.ProductsName} - {product.ProductsManufactory}</h5>
                                                <h3 className="card-text price-lbl">R$ {product.ProductsPrice}</h3>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            )
                        }

                    </div>

                </main>
            </>
        );
    }
}

export default Home;