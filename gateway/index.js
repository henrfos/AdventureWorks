const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/product", proxy("http://localhost:8001", {
  proxyReqPathResolver: req => req.url
}));

app.use("/customer", proxy("http://localhost:8002", {
  proxyReqPathResolver: req => req.url
}));

app.use("/management", proxy("http://localhost:8003", {
  proxyReqPathResolver: req => req.url
}));

app.use("/public/stylesheets", proxy("http://localhost:8001", {
  proxyReqPathResolver: req => req.url
}));

app.use("/public/stylesheets", proxy("http://localhost:8002", {
  proxyReqPathResolver: req => req.url
}));

app.use("/public/stylesheets", proxy("http://localhost:8003", {
  proxyReqPathResolver: req => req.url
}));

app.use("/public/js", proxy("http://localhost:8001", {
  proxyReqPathResolver: req => req.url
}));

app.use("/public/js", proxy("http://localhost:8002", {
  proxyReqPathResolver: req => req.url
}));

app.use("/public/js", proxy("http://localhost:8003", {
  proxyReqPathResolver: req => req.url
}));

app.listen(8000, () => {
  console.log("API Gateway running on Port 8000");
});
