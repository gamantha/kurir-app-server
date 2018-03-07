import axios from 'axios';

export default class MapService {

  constructor() {
    this.apiKey = 'AIzaSyBOp_4S1bjUWaxisRIv51tgToK-sucebnE';
    this.baseUrl = 'https://maps.googleapis.com/maps/api/distancematrix/json?';
  }

  /**
   * Calculate Distance
   * @param {String} origin [origin coordinate]
   * @param {String} destination [destination coordinate]
   */
  async calculateDistance(origin, destination) {
    const url = `${this.baseUrl}origins=${origin}&destinations=${destination}`;
    try {
      const result = await axios.post(`${url}&key=${this.apiKey}`);
      return {
        destination: result.data.destination_addresses[0],
        origin: result.data.origin_addresses[0],
        distance: result.data.rows[0].elements[0].distance,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Calculate the price
   * @param {Float} weight 
   */
  calculatePrice(distance, weight) {
    const unitPrice = 100;
    const unitDistance = distance.distance.value / 1000;
    distance.price = unitPrice * unitDistance * weight;
    return distance;
  }
}
