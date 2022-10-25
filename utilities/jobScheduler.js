const agenda = require('agenda');
const jobScheduler = new agenda({
  db: {
    address: 'mongodb://127.0.0.1/',
    collection: 'agendaJobs',
  },
});
jobScheduler.start();

module.exports = jobScheduler;
