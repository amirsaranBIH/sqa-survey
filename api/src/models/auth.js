const db = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
    register: async (email, password) => {
        return new Promise((resolve, reject) => {
            const hashedPassword = bcrypt.hashSync(password, 10);

            db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], function (err, result) {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.insertId);
                }
            });
        });
    },
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT password FROM users WHERE email = ?`, [email], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    if (result.length > 0) {
                        bcrypt.compare(password, result[0].password, (err, res) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                    } else {
                        reject(err);
                    }
                }
            });
        });
    },
};