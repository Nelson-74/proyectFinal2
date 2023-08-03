import MongoStore from "connect-mongo";
import { connectMongo } from "../utils";
import { Store } from "express-session";
import { Types } from "mongoose";
import cartsDAO from "./class/carts.dao";

usersDAO(){
    return new UsersDAO(this.db);

}

productsDAO(){
    return new ProductsDAO(this.db)

}
cartsDAO(){
    return  new CartsDAO ( this.db ) ;
}

ticketsDAO(){
    return   new TicketsDAO ( this.db );
}