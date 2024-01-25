const pool = require('../config/db');

const postProduct = async (data) => {
  return new Promise((resolve, reject) => {
    console.log('Model: add product', data);
    const { foto_produk, foto_id, nama_produk, harga } = data;
    pool.query(
      `INSERT INTO produk (foto_produk, foto_id, nama_produk, harga ) VALUES ('${foto_produk}', '${foto_id}', '${nama_produk}', ${harga})`,
      (err, results) => {
        if (!err) {
          resolve(results);
        } else {
          reject(err);
        }
      }
    );
  });
};

const getProduct = async () => {
    return new Promise((resolve, reject) => {
      console.log('Model: get all product');
      pool.query(
        `SELECT * FROM produk ORDER BY tanggal_ditambahkan DESC`,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    });
  };
const getProductById = async (id_produk) => {
    return new Promise((resolve, reject) => {
      console.log('Model: get spesific product');
      pool.query(
        `SELECT * FROM produk WHERE id_produk = ${id_produk}`,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    });
  };

  const putProduct = async (data) => {
    return new Promise((resolve, reject) => {
      console.log('Model: update product');
      const {foto_produk, foto_id, nama_produk, harga, id_produk} = data
      pool.query(
        `UPDATE produk SET foto_produk = '${foto_produk}', foto_id = '${foto_id}', nama_produk='${nama_produk}', harga=${harga} WHERE id_produk = ${id_produk}`,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    });
  };

  const deleteProductById = async (id_produk) => {
    return new Promise((resolve, reject) => {
      console.log('Model: delete spesific product');
      pool.query(
        `DELETE FROM produk WHERE id_produk = ${id_produk}`,
        (err, results) => {
          if (!err) {
            resolve(results);
          } else {
            reject(err);
          }
        }
      );
    });
  };

module.exports = {
  postProduct,
  getProduct,
  getProductById,
  putProduct,
  deleteProductById
};
