import TicketDAO from "../DAO/class/tickets.dao.js";
import { startLogger } from "../utils/logger.js";
import CartService from "./carts.service.js";

export class TicketService{

  async addTicket(purchaser, ticket, totalCart ){
    try {
      const dataTicket = {
        code: "",
        purchaser_datatime: new Date(),
        price : ticket? ticket[0] : null,
        amount: totalCart,
        purchaser: purchaser,
        products: ticket
      }
    const newTicket = await TicketDAO.addTicket(dataTicket);
    return newTicket;
    } catch (error){
    startLogger.error("Failed to add ticket");
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
        startLogger.error(e.message);
    }
}
}


