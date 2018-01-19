// ini seharusnya models nya ke akses, tapi di saya ga bisa
import models from '../models';

export default (modelName, field) => (value, next) => {
  const selectedModel = models.modelName;
  const query = {};
  query.field = value;
  selectedModel
    .find({
      where: query,
      attributes: ['id'],
    })
    .then((obj) => {
      if (obj) {
        next(`${field} ${value} is already in use`);
      } else {
        next();
      }
    });
};
