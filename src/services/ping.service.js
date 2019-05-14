const request = require('request');
const USER_AGENT = 'HealthPing.io monitoring ping';

module.exports = class PingService {
    pingUrl(url) {
        return new Promise((resolve, reject) => {
            const req = request(url, {
                method: 'HEAD',
                headers: {
                    'User-Agent': USER_AGENT
                }
            }).on('response', res => {
                return resolve({
                    request: req,
                    response: res
                });
            }).on('error', err => {
                return reject(err);
            });
        });
    }
}
