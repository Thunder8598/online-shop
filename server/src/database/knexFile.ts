import path from "path";

module.exports = {
    client: "sqlite3",
    connection: {
        filename: path.resolve(__dirname, "DBShop.sqlite"),
    },

    migrations: {
        diretory: path.resolve(__dirname, "migrations"),
    },

    useNullAsDefault: true,
};