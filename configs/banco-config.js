var sequelize = require("sequelize")

var conexao = new sequelize("database1","admin","sm13251613",{
    host: "database1.cbgidiwx6raq.us-east-1.rds.amazonaws.com",
    dialect: "mysql"
})

conexao.authenticate().then(
    function(){
        console.log("Conectado ao banco com sucesso!")
    }
).catch(
    function(erro){
        console.log("Erro ao conectar com o banco: "+erro)
    }
)

module.exports = conexao