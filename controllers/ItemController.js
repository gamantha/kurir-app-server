import { ItemService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class ItemController {
  /**
   * Item Controller
   */
  constructor() {
    this.service = new ItemService();
  }

  async create(req, res) {
    const {
      address, city, country, phone,
      courierId, from, to, ReceiverId,
      name, note, reward,
      status, category, type, weight, cost
    } = req.body;
    const senderId = res.locals.user.id;
    const ticketNumber = this.service.generateTicketNumber();
    const payload = {
      address, ticketNumber, city, country, phone,
      senderId, courierId, from, to, ReceiverId,
      name, note, reward,
      status, category, type, weight, cost
    };
    try {
      const response = await this.service.create(payload);
      res.status(201).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(400).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
    }
  }

  async get(req, res) {
    try {
      const {
        page, limit, fields, order,
      } = req.query;
      const response = await this.service.paginate(req, page, limit, order, fields);
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
      const response = await this.service.findOne({ ticketNumber: id });
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

  async destroy(req, res) {
    const { id } = req.params;
    try {
      await this.service.destroy({ id });
      res.status(200).json(new ResponseBuilder().setData({}).build());
    } catch (error) {
      res.status(404).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      address, ticketNumber, city, country, phone,
      senderId, courierId, from, to, ReceiverId,
      name, note, reward, deadline,
      status, category, type, weight, cost
    } = req.body;
    const payload = {
      address, ticketNumber, city, country, phone,
      senderId, courierId, from, to, ReceiverId,
      name, note, reward, deadline,
      status, category, type, weight, cost
    };
    try {
      const response = await this.service.update(payload, { id });
      res.status(200).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(404).json(new ResponseBuilder()
        .setMessage(error.message)
        .setSuccess(false)
        .build());
    }
  }
}
