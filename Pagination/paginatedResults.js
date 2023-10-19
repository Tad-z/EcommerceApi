const paginatedResults =  (model) => {
    return async (req, res, next) => {
        const page = parseInt(req.query.page) || 1
        const limit = 8

        const start = (page - 1) * limit
        const end = page * limit

        const result = {}

        const totalProducts = await model.countDocuments().exec();
        const totalPages = Math.ceil(totalProducts / limit);

        if (end < totalProducts) {
            result.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (start > 0) {
            result.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            result.products = await model.find().skip(start).limit(limit).exec()
            result.totalPages = totalPages
            res.paginatedResults = result
            next()
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    }
}

module.exports = paginatedResults