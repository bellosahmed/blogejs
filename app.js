const express = require('express');
const blogRoutes = require('./routes/blog');
const app = express();
const port = process.env.PORT || 3000;


// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use('/', blogRoutes);
app.use(express.static(__dirname + '/public'));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});