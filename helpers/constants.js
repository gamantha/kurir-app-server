export const buildEmailValidationUri = email =>
  `https://api.mailgun.net/v3/address/validate?address=${email}&api_key=${
    process.env.mailgunPublicValidationKey
  }`;
