const {
  postProduct,
  getProduct,
  getProductById,
  putProduct,
  deleteProductById
} = require('../model/produkModel');
const cloudinary = require('../config/cloudinary');

const produkController = {
  addProduct: async (req, res) => {
    try {
      const { nama_produk, harga } = req.body;
      let post = {
        nama_produk: nama_produk,
        harga: harga,
      };
      if (req.file) {
        const result_up = await cloudinary.uploader.upload(req.file.path, {
          folder: 'ssgroup',
        });
        post.foto_produk = result_up.secure_url;
        post.foto_id = result_up.public_id;
      } else {
        post.foto_produk = null;
        post.foto_id = null;
      }

      const result = await postProduct(post);
      if (result.insertId > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Post product success!',
          data: result.insertId,
        });
      }
    } catch (error) {
      console.error('Post product error!', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Post product failed!' });
    }
  },
  showProduct: async (req, res) => {
    try {
      const result = await getProduct();
      if (result.length > 0) {
        return res.status(200).json({
          status: 200,
          message: 'Get product success!',
          data: result,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get all product', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Get product failed!' });
    }
  },
  spesificProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await getProductById(id);
      if (result[0]) {
        return res.status(200).json({
          status: 200,
          message: 'Get product detail success!',
          data: result,
        });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: 'Data not found!' });
      }
    } catch (error) {
      console.error('Error when get detail product', error.message);
      return res
        .status(500)
        .json({ status: 500, message: 'Get detail product failed!' });
    }
  },
    editProduct: async (req, res) => {
      try {
        const { id } = req.params;
        const { nama_produk, harga } = req.body;

        const data = await getProductById(id);
        if (!data[0]) {
          return res
            .status(404)
            .json({ status: 404, message: 'Data not found!' });
        }
        let result_up = null;

        if (req.file) {
          result_up = await cloudinary.uploader.upload(req.file.path, {
            folder: 'ssgroup',
          });
          await cloudinary.uploader.destroy(data[0].foto_id);
        }

        let post = {
          id_produk: id,
          nama_produk: nama_produk || data[0].nama_produk,
          harga: harga || data[0].harga,
        };

        if (result_up) {
          // Jika gambar baru diupload, update properti photo
          post.foto_produk = result_up.secure_url;
          post.foto_id = result_up.public_id;
        } else {
          post.foto_produk = data[0].foto_produk;
          post.foto_id = data[0].foto_id;
        }

        const result = await putProduct(post);
        if (result.changedRows > 0) {
          return res
            .status(200)
            .json({
              status: 200,
              message: 'Edit product success!',
              data: result.changedRows,
            });
        }
      } catch (error) {
        console.error('Error when update product', error.message);
        return res
          .status(500)
          .json({ status: 500, message: 'Update product failed!' });
      }
    },
    deleteProduct: async (req, res) => {
        try {
          const { id } = req.params;
          const data = await getProductById(id);
          if (data[0]) {
            await cloudinary.uploader.destroy(data[0].foto_id);
          }
    
          const result = await deleteProductById(id);
          if (result.affectedRows > 0) {
            return res.status(200).json({
              status: 200,
              message: 'Delete product success!',
              data: result.affectedRows,
            });
          } else {
            return res
              .status(404)
              .json({ status: 404, message: 'Data not found!' });
          }
        } catch (error) {
          console.error('Error when delete product', error.message);
          return res
            .status(500)
            .json({ status: 500, message: 'Delete product failed!' });
        }
      },
};

module.exports = produkController;
