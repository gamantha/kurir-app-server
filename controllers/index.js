import UserController from './UserController';
import ReceiverController from './ReceiverController';
import MailController from './MailController';

/**
 * Controller singleton initialization
 */
export const userController = new UserController();
export const receiverController = new ReceiverController();
export const mailController = new MailController();
