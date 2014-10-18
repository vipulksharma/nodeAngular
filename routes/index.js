


module.exports = function (app) {
    app.get("/", function(request, response){ //root dir
        response.render('index');
    });
    app.get("/second", function(request, response){ //root dir
        response.render('index');
    });
};