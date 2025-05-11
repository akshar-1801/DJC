const app = require("./app");


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
