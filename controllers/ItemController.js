import { ItemService, ReceiverService } from '../services/index';
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
      originCoord,
      to,
      destinationCoord,
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
      ReceiverId,
    } = req.body;
    const userId = res.locals.user.id;
    const ticketNumber = this.service.generateTicketNumber();
    const status = 'stillWaitingCourier';
    try {
      const senderId = await this.service.returnSenderId(userId);
      const itemPayload = {
        address,
        ticketNumber,
        city,
        country,
        senderId,
        status,
        name: itemName,
        from,
        originCoord,
        to,
        destinationCoord,
        note,
        reward,
        category,
        type,
        weight,
        cost,
        ReceiverId,
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
      const include = this.service.returnInclude();
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
    const include = this.service.returnInclude();
    try {
      const response = await this.service.findOne(
        { ticketNumber: id },
        include
      );
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
      senderId,
      courierId,
      from,
      originCoord,
      to,
      destinationCoord,
      ReceiverId,
      itemName,
      note,
      reward,
      status,
      category,
      type,
      weight,
      cost,
      // receiver
      // receiverName,
      // email,
      // phone,
    } = req.body;
    try {
      // const receiverPayload = {
      //   name: receiverName,
      //   email,
      //   phone,
      // };
      const itemPayload = {
        address,
        city,
        country,
        senderId,
        courierId,
        status,
        name: itemName,
        from,
        originCoord,
        to,
        destinationCoord,
        note,
        reward,
        category,
        type,
        weight,
        cost,
        ReceiverId: ReceiverId,
      };
      // const receiver = await this.receiverService.update(
      //   receiverPayload,
      //   {
      //     id: ReceiverId,
      //   },
      //   {
      //     returning: true,
      //     plain: true,
      //   }
      // );
      const item = await this.service.update(
        itemPayload,
        { ticketNumber: id },
        {
          returning: true,
          plain: true,
        }
      );
      res.status(200).json(new ResponseBuilder().setData({ item }).build());
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
