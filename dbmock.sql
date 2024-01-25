CREATE TABLE produk (
    id_produk INT PRIMARY KEY AUTO_INCREMENT,
    foto_produk VARCHAR(255),
    foto_id VARCHAR(255),
    nama_produk VARCHAR(255) NOT NULL,
    harga INT NOT NULL,
    tanggal_ditambahkan TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE keranjang (
    id_keranjang INT PRIMARY KEY AUTO_INCREMENT,
    id_produk INT,
    pembelian BOOLEAN DEFAULT 0,
    FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE
);

-- INSERT data produk
-- INSERT INTO Produk (nama_produk, harga)
-- VALUES ('Produk A', 50.00),
--        ('Produk B', 75.00);

-- INSERT data keranjang
-- INSERT INTO Keranjang (id_produk)
-- VALUES (1);






