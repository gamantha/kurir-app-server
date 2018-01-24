import UserController from './UserController';
import ReceiverController from './ReceiverController';
import GoogleController from './GoogleController';

/**
 * Controller singleton initialization
 */
export const userController = new UserController();
export const googleController = new GoogleController();
export const receiverController = new ReceiverController();
