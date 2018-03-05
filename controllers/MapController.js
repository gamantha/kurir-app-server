import { MapService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class MapController {

  constructor() {
    this.service = new MapService();
  }

  getDistance(req, res) {
    const { origin, destination } = req.body;
    if (typeof origin == 'undefined' ||
      typeof destination == 'undefined') {
      res.status(422).json(
        new ResponseBuilder()
          .setSuccess(false)
          .setMessage('Invalid payload')
          .build()
      );
      return;
    }
    this.service
      .calculateDistance(origin, destination, (result) => {
        console.log('success', result);
        res.status(200).json(
          new ResponseBuilder()
            .setData(JSON.parse(result))
            .setMessage('Distance calculated')
            .build()
        );
      }
      );
  }
}
