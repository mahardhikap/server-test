const pool = require('../config/db');

const postCart = async (id_product) => {
  return new Promise((resolve, reject) => {
    console.log('Model: add product to cart', id_product);
    pool.query(
      `INSERT INTO keranjang (id_produk) VALUES (${id_product})`,
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

const getCart = async () => {
    return new Promise((resolve, reject) => {
      console.log('Model: all product in cart');
      pool.query(
        `SELECT p.id_produk, p.foto_produk, p.nama_produk, p.harga, k.pembelian FROM keranjang k JOIN produk p ON k.id_produk = p.id_produk WHERE pembelian = 0`,
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


  const deleteProductInCart = async (id_product) => {
    return new Promise((resolve, reject) => {
      console.log('Model: delete product in cart', id_product);
      pool.query(
        `DELETE FROM keranjang WHERE id_produk = ${id_product}`,
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

  const putStatusProduct = async (id_produk) => {
    return new Promise((resolve, reject) => {
      console.log('Model: update status product', id_produk);
      pool.query(
        `UPDATE keranjang SET pembelian = 1 WHERE id_produk = ${id_produk}`,
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

  const myBoughtProduct = async () => {
    return new Promise((resolve, reject) => {
      console.log('Model: my bought product');
      pool.query(
        `SELECT p.id_produk, p.foto_produk, p.nama_produk, p.harga, k.pembelian FROM keranjang k JOIN produk p ON k.id_produk = p.id_produk WHERE pembelian = 1`,
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

module.exports =  {
    postCart,
    getCart,
    deleteProductInCart,
    putStatusProduct,
    myBoughtProduct
}