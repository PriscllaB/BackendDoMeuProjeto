
const express = require("express");
const cors = require('cors') //permite integração com o frontend
const conectaBandoDeDados = require('./bancoDeDados')//conectando o banco de dados
conectaBandoDeDados() //estou chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')
const app = express();
const porta = 3333;

// Middleware para parsear o corpo da requisição como JSON
app.use(express.json());
app.use(cors())



// GET
async function mostraMulheres(request, response) {
  try{
    const mulheresVindasDoBancoDeDados = await Mulher.find()

    response.json(mulheresVindasDoBancoDeDados)
  }catch (erro) {
     console.log(erro)
  }
  
}

// POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao:request.body.citacao
  });

  try {
    const mulherCriada = await novaMulher.save()
    response.status(201).json(mulherCriada)
  } catch (erro) {
    console.log(erro)
  }

}

//PATCH
async function corrigeMulher(request, response){
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome
  }
  if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio
  }

  if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem
    }

    if (request.body.citacao) {
      mulherEncontrada = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()

    response.json(mulherAtualizadaNoBancoDeDados )

  } catch(erro) {
    console.log(erro)
  }
}

//DELETE
async function deletaMulher(request, response) {
   try {
    await Mulher.findByIdAndDelete(request.params.id)
    response.json({messagem: 'Mulher deletada com sucessoo!'})
   } catch(erro) {
    console.log(erro)
   }

}


// Configurando as rotas
app.get('/mulheres', mostraMulheres); // rota GET /mulhere
app.post('/mulheres', criaMulher); // rota POST /mulheres
app.patch('/mulheres/:id', corrigeMulher)
app.delete('/mulheres/:id', deletaMulher)

// Iniciando o servidor
app.listen(porta, () => {
  console.log("Servidor criado e rodando na porta", porta);
});