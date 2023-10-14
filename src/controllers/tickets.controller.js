import  cartService  from "../services/carts.service.js";
import { TicketService } from "../services/tickets.service.js";
import TicketDAO  from "../DAO/class/tickets.dao.js";

class TicketsController {
    async addTicket(req, res) {
      try {
          const user = req.session.user;
          const userCartId = user.idCart;
          const purchaser = user.email;
          const { cartStock, totalPriceTicket, cartOutStock } =
          await TicketService.stockForTicket(userCartId);
          await cartService.updateProductQty(userCartId, cartOutStock);
          await TicketService.addTicket(purchaser, cartStock, totalPriceTicket);
          return res.render("finaltickets", { ticket: cartStock, totalCart: totalPriceTicket, purchaser });
        } catch (err) {
          res.status(500).json({ Error: `${err}` });
        }
    }

    async checkOut(req, res) {
        try {
          const user = req.session.user;
          const userCartId = user.idCart;
          const cartProducts = await cartService.getProductsByCartId(userCartId);
          const { cartStock, totalPriceTicket } = await TicketService.stockCartProductsForTicket(userCartId);
          return res.render("ticket", { user, cartProducts, cartStock, totalPriceTicket });
        } catch (err) {
          res.status(500).json({ Error: `${err}` });
        }
    }
}
export const ticketsController = new TicketsController();

