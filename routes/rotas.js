const express = require("express");
const passport = require("passport");
const controlador = require("../controllers/controlador");
const controladorUsuario = require("../controllers/controladorUsuario");

const {eAdmin}=require("../helpers/eAdmin");
const { autenticado } = require("../helpers/acesso");


const rotas = express.Router();

rotas.get("/", controlador.buscarCarrosBanco);
rotas.post("/", autenticado,controlador.inserirCarroBanco);
rotas.put("/:id",  controlador.atualizarCarroBanco);
rotas.delete("/:id",controlador.removerCarroBanco);

rotas.get("/calcular",controlador.calcularIPVA)
rotas.post("calcular",controlador.calcularIPVA_feito)

rotas.get("/cadastrar", controlador.cadastro);
rotas.get("/editar/:id",autenticado, controlador.editarFormulario) //retorna a pagina de edição
rotas.post("/ediReq/:id", controlador.montarReqEdicao) //monta requisição de edição
rotas.get("/remover/:id", eAdmin,  controlador.montarReqDelete)  //monta requisição de remoção



rotas.get("/login",controladorUsuario.mostrarFormLogin)
rotas.post("/cadastrar/usuario", controladorUsuario.inserirUsuarioBanco);
rotas.get("/cadastro/usuario", controladorUsuario.cadastro);

rotas.post("/logar", (req,res,next)=>{
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect:"/login",
        failureFlash:true
    })(req,res,next)
})

rotas.get("/logout", (req,res) => {
    req.logout()
    req.flash('success_msg',"Você saiu!")
    res.redirect("/")
})

module.exports = rotas;