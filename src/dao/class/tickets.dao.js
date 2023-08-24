import {TicketModel} from "../models/tickets.models.js";

class TicketDAO {
  async addTicket( dataTicket){
    try{
      const newTicket = await TicketModel(dataTicket);
      const createdTicket = await newTicket.save();
      return createdTicket;  
        }catch (error) {
          throw new Error("failed to add ticket");
        }
  }
}
export default TicketDAO;
