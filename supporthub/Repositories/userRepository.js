const baseRepository = require('./baseRepository');
const userModel = require('../models/User');

class UserRepository extends baseRepository {
    constructor() {
        super(userModel);
    }

    async getUserByEmail(email) {
        return await this.model.findOne({email})
    }
}

module.exports = UserRepository;