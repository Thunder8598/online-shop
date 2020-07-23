import Products from "./../types/Products";

class ShopCar {

    private static onUpgradeFunction = (event: any) => {

        if (event.target === null) return;

        const DB = event.target.result;

        //Caso não exista uma tabela, cria.
        if (!DB.objectStoreNames.contains("Products"))
            DB.createObjectStore("Products", { keyPath: "ProductsId" });
    }

    insertIDB = (ProductInfo: Products) => {

        const promise = new Promise((resolve, reject) => {

            //Cria DB caso não exista. Caso exita abre uma conexão
            const request = window.indexedDB.open("ShopCar", 1);

            //Atualiza DB com a "Tabela" Products
            request.onupgradeneeded = ShopCar.onUpgradeFunction;

            request.onsuccess = (event: any) => {

                //Encerra aqui se não inserir os dados
                if (event.target === null) return;

                //Recebe DB através do event
                const DB = event.target.result;

                //Cria transaction da DB
                const transaction = DB.transaction('Products', 'readwrite');

                //Pega objectStore ("Tabela") da transaction
                const productsStore = transaction.objectStore('Products');

                if (ProductInfo) {

                    const productsInsert = productsStore.add(ProductInfo);

                    productsInsert.onsuccess = () => {
                        resolve();
                    }
                }
            }
        });

        return promise;

    }

    selectIDB = (ProductId?: number) => {

        const promise = new Promise((resolve, reject) => {

            //Cria DB caso não exista. Caso exita abre uma conexão
            const request = window.indexedDB.open("ShopCar", 1);

            //Atualiza DB com a "Tabela" Products
            request.onupgradeneeded = ShopCar.onUpgradeFunction;

            request.onsuccess = (event: any) => {
                //Encerra aqui se não inserir os dados
                if (event.target === null) return;

                //Recebe DB através do event
                const DB = event.target.result;

                //Cria transaction da DB
                const transaction = DB.transaction('Products', 'readwrite');

                //Pega objectStore ("Tabela") da transaction
                const productsStore = transaction.objectStore('Products');

                let productsGet: any;

                if (ProductId)
                    productsGet = productsStore.get(ProductId);

                else productsGet = productsStore.getAll();

                productsGet.onsuccess = (event: any) => {
                    resolve(event.target.result);
                }
            }
        });

        return promise;
    }

    deleteIDB = (ProductId?: number) => {
        const promise = new Promise((resolve, reject) => {

            //Cria DB caso não exista. Caso exita abre uma conexão
            const request = window.indexedDB.open("ShopCar", 1);

            request.onupgradeneeded = ShopCar.onUpgradeFunction;

            request.onsuccess = (event: any) => {
                //Encerra aqui se não inserir os dados
                if (event.target === null) return;

                //Recebe DB através do event
                const DB = event.target.result;

                //Cria transaction da DB
                const transaction = DB.transaction('Products', 'readwrite');

                //Pega objectStore ("Tabela") da transaction
                const productsStore = transaction.objectStore('Products');

                if (ProductId) {
                    const productsDel = productsStore.delete(ProductId);

                    productsDel.onsuccess = () => {
                        resolve();
                    }
                }
            }
        });

        return promise;
    }
}

export default ShopCar;