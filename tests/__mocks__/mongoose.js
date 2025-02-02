const mongoose = {
    Schema: function(definition) {
        return { definition };
    },
    model: function() {
        return function() {
            return {
                save: () => Promise.resolve({}),
                find: () => Promise.resolve([]),
                findOne: () => Promise.resolve({}),
                updateOne: () => Promise.resolve({ modifiedCount: 1 }),
                deleteOne: () => Promise.resolve({ deletedCount: 1 })
            };
        };
    },
    connect: () => Promise.resolve(),
    disconnect: () => Promise.resolve()
};

module.exports = mongoose;