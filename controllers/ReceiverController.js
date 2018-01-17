import { ReceiverService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class ReceiverController {
  /**
   * Receiver Controller
   */
  constructor() {
    this.service = new ReceiverService();
  }

  async create(req, res) {
    const {
      name, address, phone, city,
    } = req.body;
    const payload = {
      name, address, phone, city,
    };
    try {
      const response = await this.service.create(payload);
      res.status(201).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage(error.message).setSuccess(false).build());
    }
  }

  async get(req, res) {
    try {
      const {
        page,
        limit,
        attributes,
        order,
      } = req.query;
      const response = await this.service.paginate(req, page, limit, order, attributes);
      res.status(200).json(new ResponseBuilder()
        .setData(response.data)
        .setTotal(response.total)
        .setCount(response.count)
        .setLinks(response.links)
        .build());
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage(error.message).setSuccess(false).build());
    }
  }

  async find(req, res) {
    const { id } = req.params;
    try {
      const response = await this.service.findOne({ id });
      res.status(200).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(404).json(new ResponseBuilder()
        .setMessage(error.message).setSuccess(false).build());
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      await this.service.destroy({ id });
      res.status(200).json(new ResponseBuilder().setData({}).build());
    } catch (error) {
      res.status(404).json(new ResponseBuilder()
        .setMessage(error.message).setSuccess(false).build());
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      name, address, phone, city,
    } = req.body;
    const payload = {
      name, address, phone, city,
    };
    try {
      const response = await this.service.update(payload, { id });
      res.status(200).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(404).json(new ResponseBuilder()
        .setMessage(error.message).setSuccess(false).build());
    }
  }
}
