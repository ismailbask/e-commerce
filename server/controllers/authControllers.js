const pool = require('../database/db-config');
const register = {};
//Kullanıcı kayıt
register.signUp = async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;
    try {
        await pool.query('INSERT INTO users(fullname,email,password)VALUES($1,$2,$3)', [name, email, password]);
        res.status(200).json({
            message: 'Kayıt başarılı',
            user: {
                name,
                email,
                password
            }
        })
    } catch (error) {
        if (error.constraint == 'users_email_key') {
            res.status(500).json({
                message: 'Böyle bir kullanıcı zaten var',
                error
            })
        } else {
            res.status(500).json({
                message: 'kayıt oluşturulurken hata!',
                error
            });
        }
    }
};
//Kullanıcı giriş
register.signIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const {
            rows
        } = await pool.query('SELECT * FROM users WHERE email=$1 AND password=$2', [email, password]);
        if (!rows.length) {
            res.status(200).json({
                message: "Böyle bir kullanıcı bulunamadı",
                noUser: true
            })
        } else {
            res.status(200).json({
                id: rows[0].id_u,
                fullname: rows[0].fullname,
                email: rows[0].email
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Giriş yapılırken bir hata oluştu lütfen tekrar deneyiniz',
            error
        })
    }
}
module.exports = register;