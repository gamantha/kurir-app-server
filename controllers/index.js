import UserController from './UserController';
import ReceiverController from './ReceiverController';
import MailController from './MailController';
import GoogleController from './GoogleController';

/**
 * Controller singleton initialization
 */
export const userController = new UserController();
export const googleController = new GoogleController();
export const receiverController = new ReceiverController();
export const mailController = new MailController();
