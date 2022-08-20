const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id_db: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.TEXT,
      defaultValue: 'not img',
    },
    veryHealthy: {
      type: DataTypes.BOOLEAN,
    },
    cheap: {
      type: DataTypes.BOOLEAN,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    creditsText: {
      type: DataTypes.STRING,
      defaultValue: 'null database',
    },
    aggregateLikes: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    readyInMinutes: {
      type: DataTypes.INTEGER,
      defaultValue: 9999,
    },
    servings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sourceUrl: {
      type: DataTypes.TEXT,
      defaultValue: 'not url',
    },
    analyzedInstructions: {
      // type: DataTypes.ARRAY(DataTypes.STRING)
      type: DataTypes.JSON
    },
    created_DB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },{
    timestamps: false
  });
};
