export default class ResponseBuilder {
  /**
   * Response builder class
   */
  constructor() {
    this.meta = {
      message: 'operations success',
      success: true,
    };
    this.links = null;
    this.data = {};
    this.includes = null;
  }

  /**
   * data setter
   * @param {Object} data
   */
  setData(data) {
    this.data = data;
    return this;
  }

  /**
   * links setter
   * @param {Object} links
   */
  setLinks(links) {
    this.links = links;
    return this;
  }

  /**
   * include setter
   * @param {Object} includes
   */
  setIncludes(includes) {
    this.includes = includes;
    return this;
  }

  /**
   * success setter
   * @param {Boolean} success
   */
  setSuccess(success) {
    this.meta.success = success;
    return this;
  }

  /**
   * message setter
   * @param {String} message 
   */
  setMessage(message) {
    this.meta.message = message;
    return this;
  }

  build() {
    return {
      meta: this.meta,
      data: this.data,
      links: this.links,
      include: this.includes,
    };
  }
}
