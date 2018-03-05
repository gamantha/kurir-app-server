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
   * @param {Func} callback [callback function]
   */
  calculateDistance(origin, destination, callback) {
    const url = `${this.baseUrl}origins=${origin}&destinations=${destination}`;
    axios.post(`${url}&key=${this.apiKey}`)
      .then((result) => callback(result))
      .catch((err) => console.log('error', err));
  }
}
