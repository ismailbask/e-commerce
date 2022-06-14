const pool = require('../database/db-config');
//Tüm ürünlerin listelenmesi
getAllCategories = async (req, res) => {
    try {
        const catagories = (await pool.query("SELECT * FROM categories")).rows;
        res.status(200).json({
            catagories
        })
    } catch (error) {
        res.status(500).json({
            message: "bir hata meydana geldi",
            error
        })
    }
}

//Kategoriye göre ürünlerin listelenmesi
getAllShirts = async (req, res) => {
    try {
        const category_id = 1;
        const shirts = (await pool.query('SELECT * FROM products WHERE c_id=$1 ', [category_id])).rows;
        res.status(200).json({
            message: 'tüm gömlekler başarılı bir şekilde getirildi',
            shirts
        });

    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllPants = async (req, res) => {
    const category_id = 2;
    try {
        const pants = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm pantolonlar başarılı bir şekilde getirildi',
            pants
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllShoes = async (req, res) => {
    const category_id = 3;
    try {
        const shoes = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm pantolonlar başarılı bir şekilde getirildi',
            shoes
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllBags = async (req, res) => {
    const category_id = 4;
    try {
        const bags = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm Çantalar başarılı bir şekilde getirildi',
            bags
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllCoats = async (req, res) => {
    const category_id = 5;
    try {
        const coats = await (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        console.log(coats);
        res.status(200).json({
            message: 'tüm Kabanlar başarılı bir şekilde getirildi',
            coats
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllHats = async (req, res) => {
    const category_id = 6;
    try {
        const hats = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm Şapkalar başarılı bir şekilde getirildi',
            hats
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllSkirts = async (req, res) => {
    const category_id = 7;
    try {
        const skirts = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm Etekler başarılı bir şekilde getirildi',
            skirts
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllWatches = async (req, res) => {
    const category_id = 8;
    try {
        const watches = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm Saatler başarılı bir şekilde getirildi',
            watches
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllSweaters = async (req, res) => {
    const category_id = 9;
    try {
        const sweaters = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm Kazaklar başarılı bir şekilde getirildi',
            sweaters
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
getAllPajamas = async (req, res) => {
    const category_id = 10;
    try {
        const pajamas = (await pool.query('SELECT * FROM products WHERE c_id=$1', [category_id])).rows;
        res.status(200).json({
            message: 'tüm Pijamalar başarılı bir şekilde getirildi',
            pajamas
        });
    } catch (error) {
        res.status(500).json({
            message: 'Bir hata maydana geldi',
            error
        })
    }
}
module.exports = {
    getAllShirts,
    getAllPants,
    getAllShoes,
    getAllBags,
    getAllCoats,
    getAllHats,
    getAllSkirts,
    getAllWatches,
    getAllSweaters,
    getAllPajamas,
    getAllCategories

}