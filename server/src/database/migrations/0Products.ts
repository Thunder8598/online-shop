import knex from "knex";
import Knex from "knex";

export async function up(knex:Knex){
    return knex.schema.createTable("products",(table)=>{
        table.increments("ProductsId").primary();
        table.string("ProductsName").notNullable();
        table.string("ProductsManufactory").notNullable();
        table.string("ProductsDescription").notNullable();
        table.float("ProductsPrice").notNullable();
        table.string("ProductsImg").notNullable();
    });
}

export async function down(knex:Knex){
    return knex.schema.dropTable("products");
}