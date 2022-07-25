const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    quote: {
        type: String,
        max: 500,
        required: true,
    },
    speaker: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    img: {
        type: String,
    }
});
module.exports = Quote = mongoose.model("quotes", QuoteSchema);