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
    try {
      // make sure sender not double request
      const checkUser = await this.service.findOne({
        // where must provided, otherwise won't work
        UserId: res.locals.user.id,
      });
      // first proposal from user
      // TODO: send email to user in this first attempt
      if (checkUser === null) {
        const response = await this.service.create({
          status: 'waiting',
          UserId: res.locals.user.id,
          proposeDate: new Date(),
        });
        res.status(201).json(
          new ResponseBuilder()
            .setData(response)
            .setMessage(
              'We\'ll be reviewing your proposal \
              and respond very soon. Thank you'
            )
            .setSuccess(true)
            .build()
        );
        // user that rejected send another request
      } else if (checkUser.status === 'rejected') {
        // TODO: send email to user
        await this.service.update(
          {
            status: 'waiting',
          },
          {
            UserId: res.locals.user.id,
          }
        );
        res.status(200).json(
          new ResponseBuilder()
            .setSuccess(true)
            .setMessage(
              'We\'ll be reviewing your proposal and \
              respond very soon. Thank you'
            )
            .build()
        );
      } else if (checkUser.status === 'verified') {
        res.status(401).json(
          new ResponseBuilder()
            .setMessage('You already a courier')
            .setSuccess(false)
            .build()
        );
      } else {
        res.status(200).json(
          new ResponseBuilder()
            .setMessage(
              'You already submit upgrade proposal.\
              Please wait for our team to reach you.'
            )
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
    const { status, UserId, rejectReason } = req.body;
    if (
      status === 'verified' ||
      status === 'rejected' ||
      status === 'waiting'
    ) {
      try {
        if (status === 'verified') {
          // TODO: send email to user to inform
          const updated = await this.service.proposalAccepted(
            status,
            rejectReason,
            UserId
          );
          res.status(200).json(
            new ResponseBuilder()
              .setData({ UserId: parseInt(UserId), updated: updated })
              .setSuccess(true)
              .build()
          );
        } else if (status === 'rejected') {
          // TODO: send email to user to inform
          const updated = await this.service.proposalRejected(
            status,
            rejectReason,
            UserId
          );
          res.status(200).json(
            new ResponseBuilder()
              .setData({ UserId: parseInt(UserId), updated: updated })
              .setSuccess(true)
              .build()
          );
        } else {
          // TODO: send email to user to inform
          // status:waiting
          const updated = await this.service.proposalWaiting(
            status,
            rejectReason,
            UserId
          );
          res.status(200).json(
            new ResponseBuilder()
              .setData({ UserId: parseInt(UserId), updated: updated })
              .setSuccess(true)
              .build()
          );
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

  async getSenderProposals(req, res) {
    try {
      // must include service.model to work
      const result = await this.service.model.findAll({
        include: [
          {
            model: this.userService.model,
            attributes: {
              exclude: ['password', 'forgotPassVeriCode'],
            },
          },
        ],
      });
      res.status(200).json(
        new ResponseBuilder()
          .setData(result)
          .setSuccess(true)
          .build()
      );
    } catch (error) {
      res.status(400).json(
        new ResponseBuilder()
          .setMessage(error)
          .setSuccess(false)
          .build()
      );
    }
  }
}
