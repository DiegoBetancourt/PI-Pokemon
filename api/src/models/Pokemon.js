const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: true, // no es obligatorio, por eso lo pongo en true
    },
    attack:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sprite: {
      type: DataTypes.STRING,
    },
    createdInDb: { //para acceder más fácil al personaje que cree en DB (más eficiente)
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  });
};
