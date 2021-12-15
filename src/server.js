const express = require("express");
const env = require("dotenv"); // dotenv loads environment variables from a .env file into process.env
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
env.config();

//routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const initialDataRoutes = require("./routes/admin/initialData");
const pageRoutes = require("./routes/admin/page");
const addressRoutes = require("./routes/address");
const orderRoutes = require("./routes/order");
const adminOrderRoute = require("./routes/admin/order");
const adminAddAdminsRoute = require("./routes/admin/admins");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// const port = process.env.PORT || 5000;
// mongodb connection str ===> mongodb+srv://root:<password>@cluster0.gksqc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.gksqc.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "E-Commerce API",
//       version: "1.0.0",
//       description: "A simple Express e-commerce API",
//     },
//     servers: [
//       {
//         url: "http://localhost:5000",
//       },
//     ],
//   },
//   apis: [".routes/*.js"],
// };

// const specs = swaggerJsDoc(options); //passing configuration created into the swaggerJsDoc module

const app = express();
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

/*****************************  MiddeleWares *********************************/

app.use(cors()); // allow api calls from frontend app to backendapp
app.use(express.json()); //instead of body-parser
// app.use(express.static("public", options));
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api", authRoutes); //, swaggerUi.serve, swaggerUi.setup(swaggerDocs)
app.use("/api", adminRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", initialDataRoutes);
app.use("/api", pageRoutes);
app.use("/api", addressRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminOrderRoute);
app.use("/api", adminAddAdminsRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
