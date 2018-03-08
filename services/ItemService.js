import BaseService from './BaseService';
import models from '../models';

export default class ItemService extends BaseService {
  /**
   * Item specific service class
   */
  constructor() {
    super(models.Item);
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
}
