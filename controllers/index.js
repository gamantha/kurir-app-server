import UserController from './UserController';
import ReceiverController from './ReceiverController';
import MailController from './MailController';
import GoogleController from './GoogleController';
import FacebookController from './FacebookController';
import ProposalController from './ProposalController';
import ItemController from './ItemController';

/**
 * Controller singleton initialization
 */
export const userController = new UserController();
export const googleController = new GoogleController();
export const facebookController = new FacebookController();
export const receiverController = new ReceiverController();
export const mailController = new MailController();
export const proposalController = new ProposalController();
export const itemController = new ItemController();
