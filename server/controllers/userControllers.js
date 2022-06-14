const pool = require('../database/db-config');
const cloudinary = require('../helpers/cloudinary');
const elasticsearch = require('elasticsearch');
const user = {};
const client = new elasticsearch.Client({
    hosts: ['http://localhost:9200']
});

//Elastic search ile indicies oluşturma
// client.indices.create({
//     index: 'vue-elastic'
// }, function (error, response, status) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log("created a new index", response);
//     }
// });

//Ürün oluşturma
user.createProduct = async (req, res) => {
    const {
        id,
        title,
        description,
        price,
        category_id,
    } = req.body;
    const elastic = [];
    const imageFile = await cloudinary(req.files.imageFile.tempFilePath); //cloudunary ile depolanmış fotoğrafın çekilmesi
    req.body.file = imageFile;
    elastic.push(req.body);
    try {
        await pool.query('INSERT INTO products(p_id, title, description, price, file, c_id) VALUES($1,$2,$3,$4,$5,$6)', [id, title, description, price, imageFile, category_id]);
        const product = await (await pool.query('SELECT * FROM products ORDER BY id_p DESC LIMIT 1')).rows[0];
        //ürün girişi yapıldıktan sonra aynı zamanda ürünün bilgileri elasticsearch ile indexleniyor.
        bulkIndex('vue-elastic', 'products_list', elastic);
        res.status(200).json({
            message: 'ürün başarılı bir şekilde eklendi',
            product
        });

    } catch (error) {
        res.status(500).json({
            error: error.response,
            message: 'Bir hata meydana geldi'
        })
    }
}
//id ye göre ürün getirme
user.getByIdProduct = async (req, res) => {
    const id = req.params.id_p;
    try {
        const product = await (await pool.query('SELECT * FROM products WHERE id_p=$1', [id])).rows[0];
        res.status(200).json({
            message: 'successfuly',
            product
        })
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata meydana geldi',
            error
        })
    }
};

//Ürün güncelleme
user.updateProduct = async (req, res) => {
    const id = req.params.id_p;
    const {
        title,
        price,
        description,
        category_id
    } = req.body;
    const imageFile = await cloudinary(req.files.imageFile.tempFilePath);
    try {
        await pool.query("UPDATE products SET title=$1,description=$2,price=$3, file=$4, c_id=$5 WHERE id_p=$6", [title, description, price, imageFile, category_id, id]);
        res.status(200).json({
            message: 'Ürün başarılı bir şekilde güncellendi',
            product: {
                title,
                description,
                price,
                imageFile,
                category_id
            }

        })
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata meydana geldi',
            error: error
        })
    }
}

//ürün silme
user.deleteProduct = async (req, res) => {
    const id = req.params.id_p;
    try {
        await pool.query('DELETE FROM products WHERE id_p=$1', [id]);
        res.status(200).json({
            message: 'Product başarılı bir şekilde silindi...',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Bir hata meydana geldi',
            error
        });
    }
}

//eklenen ürünleri listele
user.getAllAddedProducts = async (req, res) => {
    const {
        id
    } = req.body;
    try {
        const products = await (await pool.query('SELECT * FROM products WHERE p_id=$1', [id])).rows;
        res.status(200).json({
            products
        })
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata meydana geldi',
            error
        })
    }
}
//tüm ürünleri listele
user.getAllProducts = async (req, res) => {
    try {
        const allProducts = (await pool.query('SELECT * FROM products')).rows;
        res.status(200).json({
            message: 'Tüm ürünler getirildi...',
            products: allProducts
        });

    } catch (error) {
        res.status(500).json({
            message: 'Bir hata meydana geldi',
            error: error
        })
    }
}
//elasticsearch ile oluşturulan ürünü indexe kaydetme
const bulkIndex = function bulkIndex(index, type, data) {
    let bulkBody = [];

    data.forEach(item => {
        bulkBody.push({
            index: {
                _index: index,
                _type: type
            }
        });
        bulkBody.push(item);
    });
    client.bulk({
            body: bulkBody
        })
        .then(response => {
            let errorCount = 0;
            response.items.forEach(item => {
                if (item.index && item.index.error) {
                    console.log(++errorCount, item.index.error);
                }
            });
            console.log(
                `Successfully indexed ${data.length - errorCount} out of ${data.length} items`
            );
        })
        .catch(console.err);
};

module.exports = user;