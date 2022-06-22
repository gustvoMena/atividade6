module.exports ={
    autenticado: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error_msg","Voce precisa realizar login")
        res.redirect("/")
   
    }   
}