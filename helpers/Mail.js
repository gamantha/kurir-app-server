const config = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: 'bhirmbani@gmail.com',
    clientId: process.env.nodeMailerClientId,
    clientSecret: process.env.nodeMailerclientSecret,
    refreshToken: process.env.nodeMailerRefreshToken,
  },
};

export default config;
