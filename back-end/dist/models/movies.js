"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const MovieSchema = new Schema({
    //override the default _id field with the movie_id field so we can use the TMDB id as the primary key
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    image_path: {
        type: String,
        required: true,
    },
    /*genres:[{type:mongoose.Schema.Types.ObjectId, ref:'Genre'}],*/
    //no reviews list because we can query reviews by movie id,
    //and need to dsiplay reviews on feed page as weel, so need to be seperate from the movie model
});
//can use virtuals to add a field to the model that is not stored in the database, such as reviews
//byreferencing the review model and seeting it as a virtual rather than storing it in the database
//or can not use virtuals and directly query reviews by movie Id where it needs to be displayed
const Movie = mongoose_1.default.model("Movie", MovieSchema);
exports.default = Movie;
