const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const path = require('path');
const authRouter = require('./routers/authRouters');
const userRouter = require('./routers/userRouters');
const categoryRouters = require('./routers/categoryRouters');
const pool = require('./database/db-config');
const fileUpload = require('express-fileupload');
const elasticsearch = require('elasticsearch');

//Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//ROUTER
app.use('/', authRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouters);


//Vue middlewares
app.use(history()); //otomatik olarak tek sayfayı bulur
app.use(express.static(path.join(__dirname, 'public')));

//elasticsearch
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    // pingTimeout: 3000,
    // log: 'trace'
});
client.ping({}, async function (error) {
    if (error) {
        console.log("hata", error);
    } else {
        console.log('Elasticsearch connected');
    }
    //Delete index elasticsearch
    // const deleteRecord = await client.delete({
    //     index: 'vue-elastic',
    //     id: "InAe1X8BcpqzgzjVsulP"
    // })
    // console.log(deleteRecord, "deleteRecord");
});

//Server Settings
app.listen(3000, () => {
    console.log("server 3000 portunda çalışıyor...");
    pool.connect(err => {
        if (err) {
            console.log('connection error', err.stack);
        } else {
            console.log('Veritabanı bağlantısı başarılı...');
        }
    })
})