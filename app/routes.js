const router = require('express').Router();
const myRoute = require('../routes/ticket');

router.use('/api/v1/tickets', myRoute)

router.get('/health', (_req, res) => {
    res.status(200).json({ message: 'Success' });
})

module.exports = router;



// localhost:4444/api/v1/tickets/