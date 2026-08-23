const GerenciadorAlunos = require("../GerenciadorAlunos.js");
const Relatorios = require("../relatorio.js");

describe("Relatorios", () => {
  test("deve retornar os alunos com média e situação ao analisar uma turma", () => {
    const gerenciador = new GerenciadorAlunos();
    gerenciador.cadastrar("Ana", [10, 9, 8], "Turma A");
    gerenciador.cadastrar("Beto", [5, 6, 4], "Turma A");

    const relatorios = new Relatorios(gerenciador, 7);

    expect(relatorios.analisarTurma("Turma A")).toEqual([
      { nome: "Ana", media: 9, situacao: "Aprovado" },
      { nome: "Beto", media: 5, situacao: "Reprovado" }
    ]);
  });
});
