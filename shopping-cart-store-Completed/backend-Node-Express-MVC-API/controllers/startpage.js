const StartPage = require('../models/startpage');

exports.loadAllProducts = async (req, res, next) => {
    try{
        const [products] = await StartPage.loadStartPage();
        res.status(200).json(products); 
    }catch(err){
        res.json({
            data: null,
            error: true,
            msg: 'Error, loading the products'
        });
        console.log('Error, loading the products', err)
    }
}