import { ReceiverService } from '../services/index';
import Response from '../helpers/Response';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class ReceiverController {
  /**
   * Receiver Controller
   */
  constructor() {
    this.service = new ReceiverService();
  }

  create(req, res) {
    const {
      name, address, phone, city,
    } = req.body;
    const payload = {
      name, address, phone, city,
    };
    this.service.create(payload, (result) => {
      const response = new ResponseBuilder();
      if (!result) {
        response.setData({}).setMeta({
          message: 'fail to create receiver',
          success: false,
        }).build();
      } else {
        response.setData(result).setMeta({ message: 'success', success: true }).build();
      }
      Response.respond(res, response);
    });
  }
}
