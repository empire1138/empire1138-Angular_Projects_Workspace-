const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_KEY;

module.exports = {
    issue(payload, expiresIn) {
        {
            return jwt.sign(payload, secret), {
                expiresIn: expiresIn()
            }
        }

    },
    verify(token){
            return jwt.verify(token, secret)
    }
}