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
        response.setData({}).setMessage('fail to create receiver').setSuccess(false).build();
      } else {
        response.setData(result).setMessage('success').setSuccess(true).build();
      }
      Response.respond(res, response);
    });
  }
}
