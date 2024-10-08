'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Actor.belongsToMany(models.Series, {through: 'SerieActor'})
    }
  }
  Actor.init({
    nombre: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATEONLY,
    nombreArtistico: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Actor',
    timestamps: false
  });
  return Actor;
};