const {
  postCart,
  getCart,
  deleteProductInCart,
  putStatusProduct,
  myBoughtProduct
} = require('../model/keranjangModel');

const keranjangController = {
  addCart: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: 400, message: 'Need an id product!' });
      }
      const result = await postCart(id);
      if (result.insertId > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Add to cart success!',
          data: result.insertId,
        });
      }
    } catch (error) {
      console.error('Add to cart error!', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Add to cart failed!' });
    }
  },
  showCart: async (req, res) => {
    try {
      const result = await getCart();
      if (result.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get cart success!',
          data: result,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get product in cart', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Get product in cart failed!' });
    }
  },
  deleteCartProduct: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: 400, message: 'Need an id product in cart!' });
      }

      const result = await deleteProductInCart(id);
      if (result.affectedRows > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Delete product in cart success!',
          data: result.affectedRows,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when delete product in cart', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Delete product in cart failed!' });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ status: 400, message: 'Need an id product in cart!' });
      }
      const result = await putStatusProduct(id);
      if (result.changedRows > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Update status product success!',
          data: result.changedRows,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when update status product!', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Update status product failed!' });
    }
  },
  showMyBought: async (req, res) => {
    try {
      const result = await myBoughtProduct();
      if (result.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get history buy success!',
          data: result,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get history buy', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Get history buy failed!' });
    }
  }
};

module.exports = keranjangController;
