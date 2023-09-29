import {TicketModel} from "../models/tickets.models.js";
import {startLogger, devLogger, prodLogger} from "../../utils/logger.js";
class TicketDAO {
  async addTicket( dataTicket){
    try{
      const newTicket = await TicketModel(dataTicket);
      const createdTicket = await newTicket.save();
      return createdTicket;  
        }catch (error) {
          startLogger.error("failed to add ticket");
        }
  }
}
export default TicketDAO;
