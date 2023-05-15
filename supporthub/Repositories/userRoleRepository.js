const baseRepository = require('./baseRepository');
const userRoleModel = require('../models/UserRole');

class UserRoleRepository extends baseRepository {
    constructor() {
        super(userRoleModel);
    }
}

module.exports = UserRoleRepository;