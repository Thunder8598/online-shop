import React from "react";
import Navbar from "./../../components/navbar";
import Products from "./../../types/Products";
import NoServer from "./../../components/noserver";
import Api from "../../api";
import { Link, RouteComponentProps } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

interface State {
    //Vetor do tipo Products
    ProductsArray: Products[];
    QueryParams?: string | null,
    ServerOff: boolean,
}

class Home extends React.Component<RouteComponentProps, State> {

    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            //Inicializa productsArray
            ProductsArray: [],
            QueryParams: "",
            ServerOff: false,
        };
    }

    //Carrega produtos
    loadProducts = (search: string | null) => {

        //Recebe promessa do server
        const dataProducts = Api.get(`/products/?search=${search}`);

        dataProducts.catch(() => this.setState({ ServerOff: true }));

        //Espera promessa e então...
        dataProducts.then((response) => {
            this.setState({ ServerOff: false });

            this.setState({ ProductsArray: response.data }); // ... atribui valores no array
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

    componentWillMount() {
        this.search();
    }

    componentWillUpdate() {
        //Esta usando setTimeout porque o método executa antes da barra de endereço receber o valor
        setTimeout(() => this.search(), 32);
    }

    //Renderiza pagina
    render() {

        return (
            <>
                <Navbar />

                <main className="">

                    {
                        (this.state.ServerOff) ? (<NoServer />) : (<></>)
                    }

                    <div className="form-inline content">

                        {
                            //Para cada produto no vetor, um card é renderizado
                            this.state.ProductsArray.map((product: Products) =>
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