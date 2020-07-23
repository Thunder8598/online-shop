import React from "react";
import { Link, match } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Navbar from "./../../components/navbar";
import Api from "../../api";

interface RouterProps{
    search:string,
}

interface Props{
    match?:match<RouterProps>,
}

interface State {
    ProductsLoaded: boolean,
}

interface Products {
    ProductsId?: number,
    ProductsName?: string,
    ProductsManufactory?: string,
    ProductsDescription?: string,
    ProductsPrice?: number,
    ProductsImg?:string
}

class Home extends React.Component<Props, State> {

    //Vetor do tipo Products
    productsArray: Products[];

    constructor(props: Props) {
        super(props);

        this.state = { ProductsLoaded: false };

        //Inicializa productsArray
        this.productsArray = [];
    }

    //Carrega os produtos
    loadProducts = () => {

        let dataProducts = null;
        let serverRequests = 0;

        //Recebe promessa da api
        while (dataProducts === null || serverRequests < 10) {
            dataProducts = Api.get("/products");

            serverRequests++;

            //setInterval(serverRequests => serverRequests++, 3000);
        }

        if (serverRequests >= 10) console.log("No server");

        //Espera promessa e então...
        dataProducts.then((response) => {
            this.productsArray = response.data; // ... atribui valores no array

            //Muda o estado indicando que o processo está concluído e obriga o react a atualizar a página
            this.setState({ ProductsLoaded: true });
        });
    }

    componentDidMount() {
        //Carrega os produtos
        this.loadProducts();
        console.log(this.props.match?.params.search);
    }

    //Renderiza pagina
    render() {

        return (
            <>
                <Navbar />

                <main className="container">

                    <div className="form-inline alignContent" >

                        {
                            //Para cada produto no vetor, um card é renderizado
                            this.productsArray.map((product) =>
                                (
                                    <>
                                        <button type="button" className="btn btn-link">
                                            <Link to={`/product/${product.ProductsId}`}>
                                                <div key={product.ProductsId} className="card cardFormat shadow-lg p-3 mb-5 bg-white rounded">
                                                    <img src={product.ProductsImg}
                                                        className="card-img-top" width="320px" height="160px" alt="..." />

                                                    <div className="card-body">
                                                        <h5 className="card-title">{product.ProductsName} - {product.ProductsManufactory}</h5>
                                                        <h3 className="card-text price-lbl">R$ {product.ProductsPrice}</h3>
                                                    </div>
                                                </div>
                                            </Link>
                                        </button>
                                    </>
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