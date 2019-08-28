const logic = require('../logic')

module.exports = function (req, res) {
    const { body: { number, verify } } = req

    try {
        logic.registerCard(number, verify)
            .then(() => res.status(201).json({ message: 'card correctly uploaded' }))
            .catch(({ message }) => res.status(400).json({ error: message }))
    } catch ({ message }) {
        res.status(400).json({ error: message })
    }
}