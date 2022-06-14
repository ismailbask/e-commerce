const elasticsearch = require('elasticsearch');
//Elasticsearc client oluşturuldu
const client = new elasticsearch.Client({
    host: 'localhost:9200',
    pingTimeout: 3000,
    // log: 'trace'
});

//ping atılarak bağlantı sağlandı
client.ping({}, async function (error) {
    if (error) {
        console.log("hata", error);
    } else {
        console.log('Elasticsearch connected');
    }
});

//Elasticsearch ile arama yapma işlemi.
const elasticSearch = (req, res) => {
    let body = {
        size: 100,
        from: 0,
        query: {
            match: {
                title: {
                    query: req.query['q'],
                    fuzziness: 4
                }
            }
        }
    }
    client.search({
            index: 'vue-elastic',
            body: body,
            type: 'products_list'
        })
        .then(results => {
            res.send(results.hits.hits);
            // res.status(200).json({
            //     result: results.hits.hits
            // })
        })
        .catch(err => {
            console.log(err)
            res.send([]);
        });

}
module.exports = elasticSearch;