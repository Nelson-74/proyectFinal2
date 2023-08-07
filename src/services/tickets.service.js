import {ticketsDAO} from "../DAO/class/tickets.dao.js";
import {CartService} from "./carts.service.js";

export class TicketService{

  async addTicket(purchaser, ticket, totalCart ){
    try {
      const dataTicket = {
        code: "",
        purchaser_datatime: new Date(),
        price : ticket? ticket["price"] : null,
        amount: totalCart,
        purchaser: purchaser,
        products: ticket
      }
    const newTicket = await ticketsDAO.addTicket(dataTicket);
    return newTicket;
    } catch (error){
    throw("falla en el servicio")
  }
  }

  async stockForTicket(cartId) {
    try {
        const cartProductsTicket = await CartService.getProductsByCartId(cartId);
        let cartStock = [];
        let cartOutStock = [];
        let totalPriceTicket = 0;
        for (const item of cartProductsTicket.cartProducts) {
            const idProduct = item.idProduct;
            const qtyInCart = parseInt(item.qty);
            const availableStock = parseInt(idProduct.stock);
            const ticketAmount = parseInt(idProduct.price);
            if (qtyInCart <= availableStock) {
              const totalPriceProduct = ticketAmount * qtyInCart;
              cartStock.push({ idProduct, qty: qtyInCart, totalPrice: totalPriceProduct });
              totalPriceTicket += totalPriceProduct;
            } else {
              cartOutStock.push({ idProduct, qty: qtyInCart });
            }
        }
        return { cartStock, cartOutStock, totalPriceTicket };
    } catch (error) {
        throw new Error(`ERROR. ${error}`);
    }
}
}


