import knex from "knex";
import path from "path";

const DBConnection=knex({
    client:"sqlite3",
    connection:{
        filename:path.resolve(__dirname, "DBShop.sqlite"),
    },

    useNullAsDefault:true,
});

export default DBConnection;