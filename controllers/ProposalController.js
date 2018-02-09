import { CourierProposalService, UserService } from '../services/index';
import ResponseBuilder from '../helpers/ResponseBuilder';

export default class ProposalController {
  /**
   * Courier Proposal Controller
   */
  constructor() {
    this.service = new CourierProposalService();
    this.userService = new UserService();
  }

  async proposeToCourier(req, res) {
    // link from aws s3
    // const { idLink, photoLink }

    try {
      // make sure sender not double request
      const checkUser = await this.service.findOne({ userId: res.locals.user.id });
      // first proposal from user
      // TODO: send email to user in this first attempt
      if (checkUser === null || checkUser.status === null) {
        const response = await this.service.create({
          status: 'waiting',
          userId: res.locals.user.id,
          proposeDate: new Date(),
        });
        res.status(201).json(
          new ResponseBuilder()
            .setData(response)
            .setMessage('We are reviewing your process. Thank you.')
            .setSuccess(true)
            .build()
        );
        // user that rejected send another request
      } else if (checkUser.status === 'rejected') {
        // TODO: send email to user
        await this.service.update(
          { status: 'waiting' },
          { where: { userId: res.locals.user.id } }
        );
        res.status(200).json(
          new ResponseBuilder()
            .setSuccess(true)
            .setMessage('We are reviewing your process. Thank you.')
            .build()
        );
      } else if (checkUser.status === 'verified') {
        res.status(200).json(
          new ResponseBuilder()
            .setMessage('You are already registered as courier')
            .setSuccess(false)
            .build()
        );
      } else {
        res.status(200).json(
          new ResponseBuilder()
            .setMessage('You already submit upgrade proposal. Please wait for our team to reach you.')
            .setSuccess(false)
            .build()
        );
      }
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('unknown error occured, contact our technical support.')
          .setSuccess(false)
          .build()
      );
    }
  }

  // sysadmin method
  async updateSenderProposal(req, res) {
    const { status, userId, rejectReason } = req.body;
    if (
      status === 'verified' ||
      status === 'rejected' ||
      status === 'waiting'
    ) {
      try {
        if (status === 'verified') {
          // TODO: send email to user to inform
          await this.service.update(
            {
              status,
              acceptDate: new Date(),
              rejectDate: null,
              rejectReason: null,
            },
            { userId: parseInt(userId) });
          await this.userService.update(
            {
              role: 'sender+kurir',
            },
            { id: userId });
          res.status(200).json(new ResponseBuilder().setSuccess(true).build());
        } else if (status === 'rejected') {
          // TODO: send email to user to inform
          await this.service.update(
            { status, rejectDate: new Date(), acceptDate: null, rejectReason },
            { userId: parseInt(userId) }
          );
          await this.userService.update({ role: 'sender' }, { id: userId });
          res.status(200).json(new ResponseBuilder().setSuccess(true).build());
        } else {
          // TODO: send email to user to inform
          // status:waiting
          await this.service.update(
            { status, rejectDate: null, acceptDate: null, rejectReason: null },
            { userId: parseInt(userId) }
          );
          await this.userService.update({ role: 'sender' }, { id: userId });
          res.status(200).json(new ResponseBuilder().setSuccess(true).build());
        }
      } catch (error) {
        res.status(400).json(
          new ResponseBuilder()
            .setMessage(error.message)
            .setSuccess(false)
            .build()
        );
      }
    } else {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage('invalid request body on status')
          .setSuccess(false)
          .build()
      );
    }
  }

}
