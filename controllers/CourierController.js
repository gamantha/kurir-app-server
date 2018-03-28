import { CourierService } from '../services/index';
// import ResponseBuilder from '../helpers/ResponseBuilder';

export default class CourierController {
  /**
   * Courier Controller
   */
  constructor() {
    this.service = new CourierService();
  }
}
