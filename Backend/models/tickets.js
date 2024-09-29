const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickets', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: "SET('PENDING','CONFIRMED','CANCELLED')",
      allowNull: false,
      defaultValue: "pending"
    },
    tripid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'trips',
        key: 'idtrips'
      }
    }
  }, {
    sequelize,
    tableName: 'tickets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "user_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
      {
        name: "tripid_idx",
        using: "BTREE",
        fields: [
          { name: "tripid" },
        ]
      },
    ]
  });
};
