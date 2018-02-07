import AWS from 'aws-sdk';
import base64Img from 'base64-img';
import base64 from 'base-64';

export default class S3Service {
  constructor() {
    this.client = new AWS.S3({
      params: {
        Bucket: 'kurir-backend',
      },
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    this.idBucket = 'id-user';
    this.photoBucket = 'photo-user';
  }

  async convertToBase64(path) {
    try {
      const result = base64Img.base64Sync(path);
      return result;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async convertToRawBytes(source) {
    try {
      const rawBytes = base64.encode(source);
      return rawBytes;
    } catch (error) {
      throw Error(error);
    }
  }
}
