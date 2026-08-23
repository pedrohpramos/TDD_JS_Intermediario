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
    const alunoExiste = this.alunos.some((aluno) => aluno.nome === nome);
    if (!alunoExiste) {
      throw new Error("Aluno não encontrado.");
    }
    this.alunos = this.alunos.filter((aluno) => aluno.nome !== nome);
  }

}

module.exports = GerenciadorAlunos;
