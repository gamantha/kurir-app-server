import { AirportService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class AirportController {
  /**
   * Airport Controller
   */
  constructor() {
    this.service = new AirportService();
  }

  async get(req, res) {
    try {
      const {
        page, limit, fields, order
      } = req.query;
      let response = null;

      const name = typeof req.query.name === 'undefined' ? ''
        : req.query.name;
      const iso_country = typeof req.query.iso_country === 'undefined' ? 'ID'
        : req.query.iso_country;

      response = await this.service.paginate(req, page, limit, order, fields,
        undefined,
        {
          name: {
            ilike: `%${name}%`,
          },
          iso_country
        }
      );
      res.status(200).json(new ResponseBuilder()
        .setData(response.data)
        .setTotal(response.total)
        .setCount(response.count)
        .setLinks(response.links)
        .build());
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
    }
  }

  async find(req, res) {
    const { id } = req.params;
    try {
      const response = await this.service.findOne({ id });
      if (response !== null) {
        res.status(200).json(new ResponseBuilder().setData(response).build());
      } else {
        res.status(404).json(
          new ResponseBuilder()
            .setMessage('data not found')
            .setSuccess(false)
            .build()
        );
      }
    } catch (error) {
      res.status(404).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
    }
  }
}
