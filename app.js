const express = require('express');
const blogRoutes = require('./routes/blog');
const app = express();
const port = process.env.PORT || 3000;



app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.urlencoded({ extended: true }));
app.use('/', blogRoutes);
app.use(express.static(__dirname + '/public'));


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});