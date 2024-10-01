'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Capitulo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Capitulo.belongsTo(models.Temporadas, {
        foreignKey: 'temporadaId',
        as: 'season'
      })
    }
  }
  Capitulo.init({
    nombre: DataTypes.STRING,
    duracion: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Capitulo',
    timestamps: false
  });
  return Capitulo;
};