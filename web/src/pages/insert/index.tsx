import React, { FormEvent, ChangeEvent, useState } from "react";
import Navbar from "./../../components/navbar";
import Alert from "./../../components/alert";
import Api from "./../../api";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./index.css";

const Insert = () => {

    const [alert, setAlert] = useState(0);

    const [formData, setFormData] = useState({
        ProductsName: "",
        ProductsManufactory: "",
        ProductsDescription: "",
        ProductsPrice: "",
    });

    const [formImg, setFormImg] = useState<any | null>()

    const upload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null)
            setFormImg(event.target.files[0]);
    }

    const formHandle = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    const submitForm = async (event: FormEvent) => {

        const data = new FormData();

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        data.append("ProductsName", formData.ProductsName);
        data.append("ProductsManufactory", formData.ProductsManufactory);
        data.append("ProductsDescription", formData.ProductsDescription);
        data.append("ProductsPrice", formData.ProductsPrice);
        data.append("ProductsImg", formImg);

        await Api.post("/products", data, config).then((response) => {
            if (response.data) {
                setAlert(1);

                setTimeout(() => setAlert(0), 4000);

                setFormData({
                    ProductsName: "",
                    ProductsManufactory: "",
                    ProductsDescription: "",
                    ProductsPrice: "",
                });

                document.getElementById("btn-reset")?.click();
            }
            else {
                setAlert(2);
                setTimeout(() => setAlert(0), 4000);
            }
        });
    }


    return (
        <>
            <Navbar />

            {
                (alert === 1) ? (<Alert message="Produto cadastrado" error={false}/>) : 
                (alert === 2) ? (<Alert message="Erro no cadastro" error={true}/>) : (<></>)
            }

            <main className="container form-content shadow">


                <form>
                    <div className="form-group">
                        <label>Nome do produto:</label>
                        <input type="text" className="form-control" name="ProductsName" onChange={formHandle}></input>
                    </div>

                    <div className="form-group">
                        <label>Fabricante do produto:</label>
                        <input type="text" className="form-control" name="ProductsManufactory" onChange={formHandle}></input>
                    </div>

                    <div className="form-group">
                        <label>Descrição do produto:</label>
                        <input type="text" className="form-control" name="ProductsDescription" onChange={formHandle}></input>
                    </div>

                    <div className="form-group">
                        <label>Preço do produto:</label>
                        <input type="text" className="form-control" name="ProductsPrice" onChange={formHandle}></input>
                    </div>

                    <div className="form-group">
                        <label>Imagem do produto:</label>
                        <input type="file" className="form-control-file" name="ProductsImg" onChange={upload}></input>
                    </div>

                    <button type="button" className="btn btn-success" style={{ marginRight: "1%" }} onClick={submitForm}>Enviar</button>
                    <button type="reset" className="btn btn-danger" id="btn-reset">Limpar campos</button>

                </form>
            </main>
        </>
    );

}

export default Insert;