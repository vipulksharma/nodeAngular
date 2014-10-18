


module.exports = function (app) {
    app.get("/", function(request, response){ //root dir
        response.render('index');
    });
    app.get("/second", function(request, response){ //root dir
        response.render('index');
    });
    app.get('/getMeName', function(req, res) {
       res.send('My name is Vipul');
    });
};