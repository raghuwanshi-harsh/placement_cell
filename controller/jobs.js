module.exports.jobPage = async function (req, res) {
    const env = require('../config/environment');
    const { default: fetch } = await import('node-fetch');
    
    const response = await fetch(env.api_path);
    const jobsData = await response.json();
    return res.render('placementCell', {
        title: "Placement Cell",
        body: jobsData.jobs
    });
};
