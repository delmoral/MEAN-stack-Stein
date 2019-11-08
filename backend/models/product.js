const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, default: null },
    category: { type: String, default: null },
    shop: { type: Schema.Types.ObjectId, default: null },
    imagePath: { type: String, default: null }
});

module.exports =  mongoose.model('Product', ProductSchema);