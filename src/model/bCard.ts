import mongoose from "mongoose";

const url =  import.meta.env.MONGODB_URI;
mongoose
    .connect(url, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
        console.log(err);
    });
