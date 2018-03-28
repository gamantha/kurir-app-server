import moment from 'moment';
import { ItemService, ReceiverService, MailService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class ItemController {
  /**
   * Item Controller
   */
  constructor() {
    this.service = new ItemService();
    this.receiverService = new ReceiverService();
    this.reservetime = 30;
    this.mailService = new MailService();
  }

  async get_history(req, res) {
    const { page, limit, fields, order } = req.query;
    if (res.locals.user.role !== 'sender') {
      try {
        const result = await this.service.getCourierHistory(
          req,
          page,
          limit,
          fields,
          order,
          res.locals.user.id,
          res.locals.user.senderId
        );
        res.status(200).json(
          new ResponseBuilder()
            .setMessage('history retrieved')
            .setData(result)
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
      return;
    } else {
      try {
        const result = await this.service.getSenderHistory(
          req,
          page,
          limit,
          fields,
          order,
          res.locals.user.senderId
        );
        res.status(200).json(
          new ResponseBuilder()
            .setMessage('history retrieved')
            .setData(result)
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
      return;
    }
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
      // ReceiverId,
    } = req.body;
    const ticketNumber = this.service.generateTicketNumber();
    const status = 'stillWaitingCourier';
    const senderEmail = res.locals.user.email;
    try {
      // const senderId = await this.service.returnSenderId(userId);
      // const receiverPayload = {
      //   name: receiverName,
      //   email,
      //   phone,
      // };
      const senderId = res.locals.user.senderId;

      // const receiver = await this.receiverService.create(receiverPayload);
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
        // ReceiverId,
      };
      const item = await this.service.create(itemPayload);
      await this.mailService.onUpdateItemStatus(
        {
          senderEmail,
          ticketNumber: item.dataValues.ticketNumber,
        },
        'stillWaitingCourier'
      );
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
        include,
        {
          $or: [
            {
              reserved: {
                $lt: moment()
                  .subtract(this.reservetime, 'minutes')
                  .toDate(),
              },
            },
            {
              reserved: {
                $eq: null,
              },
            },
          ],
        }
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

  async get_current_trip(req, res) {
    const { page, limit, fields, order } = req.query;
    const { from, to } = req.body;
    if (typeof from === 'undefined' || typeof to === 'undefined') {
      res.status(422).json(
        new ResponseBuilder()
          .setMessage('invalid payload')
          .setSuccess(false)
          .build()
      );
      return;
    }
    try {
      const response = await this.service.paginate(
        req,
        page,
        limit,
        order,
        fields,
        undefined,
        {
          from,
          to,
          $or: [
            {
              reserved: {
                $lt: moment()
                  .subtract(this.reservetime, 'minutes')
                  .toDate(),
              },
            },
            {
              reserved: {
                $eq: null,
              },
            },
          ],
        }
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
        {
          ticketNumber: id,
          $or: [
            {
              reserved: {
                $lt: moment()
                  .subtract(this.reservetime, 'minutes')
                  .toDate(),
              },
            },
            {
              reserved: {
                $eq: null,
              },
            },
          ],
        },
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

  async reserve(req, res) {
    const { id } = req.params;
    try {
      const itemPayload = {
        courierId: res.locals.user.id,
        reserved: Date.now(),
      };
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

  async assignItemToCourier(req, res) {
    const { ticketNumber } = req.params;
    const userId = res.locals.user.id;
    const senderEmail = res.locals.user.email;
    try {
      const result = await this.service.assignItemToCourier(
        userId,
        ticketNumber
      );
      await this.mailService.onUpdateItemStatus(
        { senderEmail, ticketNumber },
        'pickedByCourier'
      );
      res.status(200).json(
        new ResponseBuilder()
          .setData({ assignedItem: result })
          .setMessage(
            `Item with ticket number of ${ticketNumber} successfully assigned to this courier.`
          )
          .build()
      );
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
