const mongoose = require('mongoose');
const SiteModel = require('./models/site.model');
const ActivityModel = require('./models/activity.model');
const PingService = require('./services/ping.service');
const schedule = require('node-schedule');

mongoose.connect('mongodb://localhost/pingbot', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected!')

//   schedule.scheduleJob('* * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
    const pingService = new PingService();
    
    SiteModel.find((err, sites) => {
        sites.forEach(async site => {
            const ping = await pingService.pingUrl(site.url);
            
            createActivity(site, ping);
        });
    });
//   });
});


const createActivity = (site, ping) => {
    const { request, response } = ping;

    const activity = new ActivityModel({
        site: site._id,
        request: {
            host: request.host
        },
        response: {
            statusCode: response.statusCode,
            headers: {
                host: response.request.headers.host,
                server: response.headers.server,
                'content-type': response.headers['content-type'],
                'content-length': response.headers['content-length']
            },
        },
        createdAt: new Date().toLocaleString("en-US", {timeZone: "UTC"})
    });

    activity.save();
}