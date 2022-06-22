var usuario = require('../models/usuario');
var cripto =require("bcryptjs")
const usuarioControlador = {};

usuarioControlador.mostrarFormLogin = function(req,res){
    try {
        res.render("login")
    } catch (error) {
        res.status(500).send("Erro ao acessar a página de login!")
    }
}

usuarioControlador.inserirUsuarioBanco = async function (req, res) {
    var erros = []

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "Email inválido"})
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null){
        erros.push({texto: "Senha inválida"})
    }
    //if(!req.body.eAdmin || typeof req.body.eAdmin == undefined || req.body.cargo == null){
      //  erros.push({texto: "não escolhido"})
    //}

    if(req.body.senha.length < 6){
        erros.push({texto: "Senha muito pequena!"})
    }

    if(erros.length > 0){//se existe algum erro
        res.render("cadastroUsuario",{errosNaPagina: erros})
    }else{
        
        var pass =await cripto.hash(req.body.senha,8)


        usuario.create({
            nome: req.body.nome,
            email: req.body.email,
            senha: pass,
            eAdmin: req.body.eAdmin
        }).then(
            function(){
                req.flash("success_msg","Usuário cadastrado com sucesso!")
                res.status(200).redirect("/login");
            }
        ).catch(
            function(error){
                req.flash("error_msg","Erro ao cadastrar usuário!")
                
                res.redirect("/cadastro/usuario")
            }
        )
    }
    
}

usuarioControlador.buscarUsuario = function(req,res){
    usuario.findOne({
        raw: true,
        where: {
            email: req.body.email
        }
    }).then(
        function(user){
            cripto.compare(req.body.senha,user.senha).then(
                function(result){
                    console.log(result)
                    if(result){
                        req.flash("success_msg","Usuário logado  com sucesso!")
                        
                        res.status(200).redirect("/");
                    }else{
                        req.flash("error_msg","Erro ao cadastrar usuário!")
                        res.status(500).redirect("/");
                     
                    }
                }
            ).catch(
                function(error){
                    res.status(500).send("Erro: " + error)
                }
            )
        }
    ).catch(
        function(error){
            res.status(500).send("Erro ao buscar email: " + error)
        }
    )
}



usuarioControlador.cadastro = function (req, res) {
    try {
        res.render("cadastroUsuario")
    } catch (error) {
        res.status(500).send("Erro ao acessar página de cadastro: " + error);
    }
};

module.exports = usuarioControlador