import shortid from "shortid";
import { logger} from "../utils/logger.js";
import CartService from "./carts.service.js";
import { TicketModel } from "../DAO/models/tickets.models.js";
export class TicketService{

  async addTicket(purchaser, ticket, totalCart ){
    try {
       // Genera un código del boleto único utilizando shortid
      const code = shortid.generate();
       // Obtiene los productos válidos del carrito
      const { cartStock, cartOutStock } = await this.stockForTicket(cartId);
      const dataTicket = {
        code,
        purchaser_datatime: new Date(),
        price : ticket? ticket[0] : null,
        amount: totalCart,
        purchaser,
        products: cartStock
      }
    const newTicket = await TicketModel.create(dataTicket);
    if(cartOutStock.length > 0){
      await CartService.updateProductQuantity(cartId, cartOutStock);
    }
    return newTicket;
    } catch (error){
    logger.error("Failed to add ticket");
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
            const quantityInCart = parseInt(item.quantity);
            const availableStock = parseInt(idProduct.stock);
            const ticketAmount = parseInt(idProduct.price);
            if (quantityInCart <= availableStock) {
              const totalPriceProduct = ticketAmount * quantityInCart;
              cartStock.push({ idProduct, quantity: quantityInCart, totalPrice: totalPriceProduct });
              totalPriceTicket += totalPriceProduct;
            } else {
              cartOutStock.push({ idProduct, quantity: quantityInCart });
            }
        }
        return { cartStock, cartOutStock, totalPriceTicket };
    } catch (error) {
        logger.error(error.message);
    }
}
}


