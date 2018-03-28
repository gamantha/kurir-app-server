import BaseService from './BaseService';
import CourierService from './CourierService';
import models from '../models';

export default class ItemService extends BaseService {
  /**
   * Item specific service class
   */
  constructor() {
    super(models.Item);
    this.courierService = new CourierService();
  }

  generateTicketNumber() {
    return Date.now();
  }

  returnInclude() {
    return [
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
      {
        model: models.Courier,
        include: [
          {
            model: models.User,
            attributes: { exclude: ['password', 'forgotPassVeriCode'] },
          },
        ],
      },
    ];
  }

  async returnSenderId(userId) {
    try {
      const sender = await models.Sender.findOne({ where: { UserId: userId } });
      return sender.dataValues.id;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * Get courier item history
   * @param {Request} req
   * @param {Integer} page
   * @param {Integer} limit
   * @param {Array} fields
   * @param {String} order
   * @param {Integer} courierId
   */
  async getCourierHistory(req, page, limit, fields, order, userId, senderId) {
    return await this.paginate(req, page, limit, order, fields, undefined, {
      $or: [
        {
          courierId: userId,
        },
        {
          senderId: senderId,
        },
      ],
    });
  }

  /**
   * Get sender item history
   * @param {Request} req
   * @param {Integer} page
   * @param {Integer} limit
   * @param {Array} fields
   * @param {String} order
   * @param {Integer} senderId
   */
  async getSenderHistory(req, page, limit, fields, order, senderId) {
    return await this.paginate(req, page, limit, order, fields, undefined, {
      senderId: senderId,
    });
  }

  /**
   * Assign item to courier
   * @param {integer} userId
   * @param {string} ticketNumber
   */
  async assignItemToCourier(userId, ticketNumber) {
    try {
      const foundCourier = await this.courierService.findOne(
        { userId },
        undefined
      );
      const foundTicketNumber = await this.findOne({ ticketNumber }, undefined);
      if (foundTicketNumber === null) {
        throw Error('Ticket number doesn\'t exist');
      } else if (foundCourier === null) {
        throw Error('You\'re not a courier');
      } else {
        const updatedItem = await this.update(
          { courierId: foundCourier.id },
          { ticketNumber },
          {
            returning: true,
            plain: true,
          }
        );
        return updatedItem.dataValues;
      }
    } catch (error) {
      throw Error(error.message);
    }
  }
}
