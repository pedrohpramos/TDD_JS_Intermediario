const GerenciadorAlunos = require("../GerenciadorAlunos.js");
const Relatorios = require("../relatorio.js");

describe("Analisar turma", () => {
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

describe("Analise geral das turmas", () => {
  test("deve retornar os melhores resultados gerais e a média por turma", () => {
    const gerenciador = new GerenciadorAlunos();
    gerenciador.cadastrar("Ana", [9, 10, 9], "3A");
    gerenciador.cadastrar("Bruno", [6, 6, 6], "3A");
    gerenciador.cadastrar("Maria", [8, 8, 8], "2B");
    gerenciador.cadastrar("Carlos", [4, 5, 3], "2B");

    const relatorios = new Relatorios(gerenciador, 7);

    expect(relatorios.analiticoGeral()).toMatchObject({
      melhor: { nome: "Ana", turma: "3A", media: 9.33 },
      pior: { nome: "Carlos", turma: "2B", media: 4 },
      turmas: [
        { nomeTurma: "3A", mediaGeral: 7.67, aprovados: 1, reprovados: 1 },
        { nomeTurma: "2B", mediaGeral: 6, aprovados: 1, reprovados: 1 }
      ]
    });
  });
});
