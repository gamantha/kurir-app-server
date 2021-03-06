module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      defaultValue: '',
      validate: {
        min: {
          args: 3,
          msg:
            'Username must start with a letter, have no spaces, and be at least 3 characters.',
        },
        max: {
          args: 40,
          msg:
            'Username must start with a letter, have no spaces, and be at less than 40 characters.',
        },
        is: {
          args: /^[A-Za-z][A-Za-z0-9-]+$/i, // must start with letter and only have letters, numbers, dashes
          msg:
            'Username must start with a letter, have no spaces, and be 3 - 40 characters.',
        },
        notEmpty: { msg: 'Please input username' },
      },
    },
    email: {
      type: DataTypes.STRING,
      isUnique: true,
      allowNull: false,
      defaultValue: '',
      validate: {
        isEmail: {
          msg: 'Please input an email address',
        },
        notEmpty: { msg: 'Please input email address' },
      },
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
      allowNull: true,
    },
    password: DataTypes.STRING,
    forgotPassVeriCode: DataTypes.STRING,
    role: DataTypes.STRING, // @param {String} sender, sender+kurir, sysadmin, siteadmin
    isEmailValidated: DataTypes.BOOLEAN,
    photoLink: DataTypes.STRING,
  });
  User.associate = function(models) {
    User.hasOne(models.Sender);
    User.hasMany(models.Token, { foreignKey: 'userId' });
    User.hasOne(models.Courier, { foreignKey: 'userId' });
    User.hasOne(models.Droppoint, { foreignKey: 'userId' });
    // for hasOne and belongsTo, should not have foreignKey config
    User.hasOne(models.CourierProposal);
  };
  User.prototype.toJSON = function() {
    let values = Object.assign({}, this.get());
    delete values.forgotPassVeriCode;
    delete values.password;
    return values;
  };
  return User;
};
