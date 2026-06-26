const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Connected to DB");

        const indexes = await mongoose.connection.db
            .collection("candidates")
            .indexes();
        console.log("Current indexes:", indexes);

        await mongoose.connection.db
            .collection("candidates")
            .dropIndex("Id_1");

        console.log("Dropped index Id_1");
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
})();