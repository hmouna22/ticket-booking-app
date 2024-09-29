const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trips', {
    idtrips: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    departure: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    destination: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(4,3),
      allowNull: false
    },
    transid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'transportation',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'trips',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idtrips" },
        ]
      },
      {
        name: "transid_idx",
        using: "BTREE",
        fields: [
          { name: "transid" },
        ]
      },
    ]
  });
};
