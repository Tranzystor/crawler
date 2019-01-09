const tvs = require('./tv.route');

const setupRoutes = app => {
    app.use('/tvs', tvs);
}


module.exports = setupRoutes;