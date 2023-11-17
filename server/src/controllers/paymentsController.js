const { Payment} = require("../db");
const { Sequelize, Op } = require("sequelize");

const getAllPaymentsController = async (param) => {
  if (param) {
    const isNumeric = !isNaN(param);
    console.log(isNumeric);

    if (isNumeric) {
      const paymentByID = await Payment.findAll({
        where: {
          id_paymentMp: {
            [Op.like]: `%${param}%`, // Búsqueda parcial para id_paymentMp
          },
        },
      });
      console.log(param);
      return paymentByID;

    } else {
      const paymentByName = await Payment.findAll({
        where: {
          user_name: {
            [Op.like]: `%${param}%`, // Búsqueda parcial para user_name
          },
        },
      });
      return paymentByName.length > 0 ? paymentByName : null;
    }
  } else {
    return await Payment.findAll();
  }
};

const getPaymentByIdController = async (id_payment) => {
  const response = await Payment.findByPk(id_payment);
  return response;
};

const deletePaymentController = async (id_payment) => {
  const paymentDelete = await Payment.findByPk(id_payment);

  await paymentDelete.destroy();

  return paymentDelete;
};

module.exports = {
  getAllPaymentsController,
  getPaymentByIdController,
  deletePaymentController
};
