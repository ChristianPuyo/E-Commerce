const { DataTypes } = require('sequelize');

module.exports = (dataBase) => {

    dataBase.define('Message', {
        id_message: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        text: {
            type: DataTypes.STRING,
            allowNull: true 
        },
        timestamp:{
            type:DataTypes.DATE, 
            allowNull: true 
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt:false,
        updatedAt:false
    })
}