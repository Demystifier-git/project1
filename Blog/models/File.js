const mongoose = require("mongoose")

const fileSchema = new mongoose.Schema({
  buffer: {type: Buffer, required: true}
})

module.exports = mongoose.model("File", fileSchema)