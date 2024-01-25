Change .env.example with your api
```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```

then,
```
npm install
```

also dont forget to create table in database,
```
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
```

enjoy
```
node index.js
```