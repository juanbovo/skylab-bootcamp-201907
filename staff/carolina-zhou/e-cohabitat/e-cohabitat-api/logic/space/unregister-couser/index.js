const { validate } = require('utils')
const { models: { User, Space } } = require('data')

/**
 * Unregisters a space co-user.
 * 
 * @param {string} spaceId space id
 * @param {string} coUserId co-user id
 * 
 * @throws {TypeError} - if space id or co-user id is not a string.
 * @throws {Error} - if space id or co-user id is empty or undefined, if co-user is not an actual co-user of the space.
 * 
 * @returns {Object} space object
*/

module.exports = function(spaceId, coUserId) {

    let _space

    validate.string(spaceId, 'space id')
    validate.string(coUserId, 'co-user id')

    return (async () => {
        const space = await Space.findOne({ _id: spaceId })
        if (!space) throw Error('wrong space id provided')

        _space = space

        const user = await User.findOne({ _id: coUserId })
        if (!user) throw Error('wrong co-user id provided')

        const match = _space.cousers.find(user => user.toString() === coUserId)
        if (!match) throw Error(`user with id ${coUserId} is not a co-user`)

        _space.cousers.splice(_space.cousers.indexOf(match))
        await _space.save()
        if (_space.cousers.length === 0) {
            const result = await Space.deleteOne({ _id: spaceId })
            if (!result.deletedCount) throw Error('wrong data provided')
        }
        return _space
    })()
}