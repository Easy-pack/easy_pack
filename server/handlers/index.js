module.exports = {
    ...require('./auth'),
    ...require('./transaction'),
    ...require('./driver'),
    ...require('./user'),
    ...require('./notification'),
    ...require('./dashboardDriver'),
    ...require('./dashboardUser')
};