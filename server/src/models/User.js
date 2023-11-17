const { DataTypes } = require("sequelize");

module.exports = (dataBase) => {
    
    dataBase.define(
        'User', {

        uid:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        address: {
            type: DataTypes.STRING,   
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.NUMERIC
        },

        is_Admin:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_Delete:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        isBlocked:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        payment_code:{
            type:DataTypes.STRING,
            allowNull:true,
        },
        image: {
            type: DataTypes.STRING,
            // defaultValue: "https://res.cloudinary.com/dkgeccpz4/image/upload/v1699475288/profileDefault_haxmxb.jpg",
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        timestamps: false,
        createdAt:false,
        updatedAt:false
    })
}