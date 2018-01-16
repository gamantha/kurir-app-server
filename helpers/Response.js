export default class Response {
  /**
   * Base controller class
   */

  static respond(res, payload, code = 200) {
    res.status(code).json(payload);
  }
}
