// Base de dados fictícia (simula um banco de dados remoto)
const alunosDB = [
  { id: 1, nome: "Maria Silva", notas: [9, 8, 10], turma: "MouraTech FullStack" },
  { id: 2, nome: "João Santos", notas: [6, 5, 7], turma: "MouraTech Dados" },
  { id: 3, nome: "Ana Oliveira", notas: [10, 10, 9], turma: "MouraTech Automação" },
];

let proximoId = 4;

// Busca um aluno pelo ID (simula consulta com delay)
function buscarAluno(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const aluno = alunosDB.find((a) => a.id === id);

      if (aluno) {
        resolve(aluno);
      } else {
        reject(new Error("Aluno não encontrado."));
      }
    }, 1000);
  });
}

// Lista todos os alunos da base
function listarAlunos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alunosDB);
    }, 1000);
  });
}

// Adiciona um novo aluno à base
function adicionarAluno(aluno) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!aluno || !aluno.nome || !aluno.turma) {
        return reject(new Error("Nome e turma são obrigatórios."));
      }

      if (!Array.isArray(aluno.notas) || aluno.notas.length < 3) {
        return reject(new Error("O aluno precisa ter pelo menos 3 notas."));
      }

      const novoAluno = { id: proximoId++, ...aluno };
      alunosDB.push(novoAluno);
      resolve(novoAluno);
    }, 1000);
  });
}

module.exports = { buscarAluno, listarAlunos, adicionarAluno };
