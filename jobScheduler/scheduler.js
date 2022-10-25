const agenda = require('agenda');

const jobScheduler = new agenda({
  db: {
    address: 'mongodb://127.0.0.1/',
    collection: 'agendaJobs',
  },
});
jobScheduler.define('testing job', async (job)=>{
  console.log('Testing job called');
  console.log(job.attrs.data.message);
});
jobScheduler.start();
module.exports = jobScheduler;
