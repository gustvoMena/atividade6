module.exports={
    eAdmin: function(req,res,next){
        if(req.isAuthenticated() && req.user.eAdmin=="1"){
            return next()
        }else if(!req.isAuthenticated()){
              req.flash("error_msg","voce precisa realizar login")
        }else{
            req.flash("error_msg","voce precisa ser um administrador ")
        }
       
         res.redirect("/")
        }
}