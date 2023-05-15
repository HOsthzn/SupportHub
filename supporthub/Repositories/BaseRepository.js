class BaseRepository {
    constructor(model) {
        this.model = model;
    }

    getAll() {
        return this.model.find();
    }

    async getAllAsync() {
        return await this.model.find();
    }

    get(query) {
        return this.model.find(query);
    }

    async getAsync(query) {
        return await this.model.find(query);
    }

    getById(id) {
        return this.model.findById(id);
    }

    async getByIdAsync(id) {
        return await this.model.findById(id);
    }

    create(entity) {
        return this.model.create(entity);
    }

    update(id, entity) {
        return this.model.findByIdAndUpdate(id, entity, {new: true});
    }

    delete(id) {
        return this.model.findByIdAndDelete(id);
    }

    exists(query) {
        return this.model.exists(query);
    }

    async existsAsync(query) {
        return await this.model.exists(query);
    }

    save() {
        return this.model.save();
    }
}

module.exports = BaseRepository;
