import { ItemService, ReceiverService } from '../services/index';
import models from '../models';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class ItemController {
  /**
   * Item Controller
   */
  constructor() {
    this.service = new ItemService();
    this.receiverService = new ReceiverService();
  }

  async create(req, res) {
    const {
      from,
      to,
      weight,
      country,
      city,
      address,
      itemName,
      note,
      reward,
      category,
      type,
      cost,
      // receiver
      receiverName,
      email,
      phone,
    } = req.body;
    const senderId = res.locals.user.id;
    const ticketNumber = this.service.generateTicketNumber();
    const status = 'stillWaitingCourier';
    try {
      const receiverPayload = {
        name: receiverName,
        email,
        phone,
      };
      const receiver = await this.receiverService.create(receiverPayload);
      const itemPayload = {
        address,
        ticketNumber,
        city,
        country,
        senderId,
        status,
        name: itemName,
        from,
        to,
        note,
        reward,
        category,
        type,
        weight,
        cost,
        ReceiverId: receiver.id,
      };
      const item = await this.service.create(itemPayload);
      res.status(201).json(new ResponseBuilder().setData(item).build());
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  async get(req, res) {
    try {
      const { page, limit, fields, order } = req.query;
      const include = [
        {
          model: models.Sender,
          include: [
            {
              model: models.User,
              attributes: { exclude: ['password', 'forgotPassVeriCode'] },
            },
          ],
        },
        { model: models.Receiver },
        { model: models.Courier },
      ];
      const response = await this.service.paginate(
        req,
        page,
        limit,
        order,
        fields,
        include
      );
      res.status(200).json(
        new ResponseBuilder()
          .setData(response.data)
          .setTotal(response.total)
          .setCount(response.count)
          .setLinks(response.links)
          .build()
      );
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
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
      res.status(404).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    try {
      await this.service.destroy({ ticketNumber: id });
      res.status(200).json(new ResponseBuilder().setData({}).build());
    } catch (error) {
      res.status(404).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const {
      address,
      city,
      country,
      phone,
      senderId,
      courierId,
      from,
      to,
      ReceiverId,
      name,
      note,
      reward,
      deadline,
      status,
      category,
      type,
      weight,
      cost,
    } = req.body;
    const payload = {
      address,
      city,
      country,
      phone,
      senderId,
      courierId,
      from,
      to,
      ReceiverId,
      name,
      note,
      reward,
      deadline,
      status,
      category,
      type,
      weight,
      cost,
    };
    try {
      const response = await this.service.update(payload, { ticketNumber: id });
      res.status(200).json(new ResponseBuilder().setData(response).build());
    } catch (error) {
      res.status(404).json(
        new ResponseBuilder()
          .setMessage(error.message)
          .setSuccess(false)
          .build()
      );
    }
  }
}
