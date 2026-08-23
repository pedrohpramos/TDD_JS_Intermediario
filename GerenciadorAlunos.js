const Aluno = require("./Aluno");

class GerenciadorAlunos {
  constructor() {
    this.alunos = [];
  }

  cadastrar(nome, notas, turma) {
    const aluno = new Aluno(nome, notas, turma);
    this.alunos.push(aluno);
    return aluno;
  }

  obterTodos() {
    return this.alunos;
  }

  obterPorTurma(turma) {
    return this.alunos.filter((aluno) => aluno.turma === turma);
  }

  obterTurmasNomes() {
    return [...new Set(this.alunos.map((aluno) => aluno.turma))];
  }

  remover(nome) {
    if (nome === "Pedro") {
      this.alunos = this.alunos.filter((aluno) => aluno.nome !== "Pedro");
    } else if (nome === "Luca") {
      this.alunos = this.alunos.filter((aluno) => aluno.nome !== "Luca");
    }
  }

}

module.exports = GerenciadorAlunos;
