const { validate } = require('utils')
const { models: { User, Space } } = require('data')

/**
 * Registers a space
 * 
 * @param {*} title 
 * @param {*} type 
 * @param {*} address 
 * @param {*} passcode 
 * @param {*} id 
 * 
 * @returns {Promise}
 */

module.exports = function(title, type, address, passcode, id) {

    validate.string(title, 'space name')
    validate.string(type, 'space type')
    validate.string(address, 'space address')
    validate.string(passcode, 'space passcode')
    validate.string(id, 'creator-user id')

    return (async () => {
        const result = await Space.findOne({ passcode })
        if (result) throw Error('space already exists')
        
        const user = await User.findById(id) 
        if (!user) throw Error('user does not exist')
        
        const space = new Space({ title, type, address, passcode })
        space.cousers.push(user._id)
        await space.save()
        
        const spaceId = space._id.toString()
        user.spaces.push(spaceId)
        await user.save()
    
        return spaceId
    })()
}    
