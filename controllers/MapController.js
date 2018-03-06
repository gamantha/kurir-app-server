import { MapService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class MapController {

  constructor() {
    this.service = new MapService();
  }

  async getDistance(req, res) {
    const { origin, destination, weight } = req.body;
    if (typeof origin == 'undefined' ||
      typeof destination == 'undefined' ||
      typeof weight == 'undefined') {
      res.status(422).json(
        new ResponseBuilder()
          .setSuccess(false)
          .setMessage('Invalid payload')
          .build()
      );
      return;
    }
    try {
      const distance = await this.service.calculateDistance(origin, destination);
      const result = this.service.calculatePrice(distance, weight);
      res.status(200).json(
        new ResponseBuilder()
          .setData(result)
          .setMessage('Distance calculated')
          .build()
      );
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setSuccess(false)
          .setMessage('Some error occured in our system, please try again later')
          .build()
      );
    }
  }
}
