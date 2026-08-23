const GerenciadorAlunos = require("../GerenciadorAlunos.js");

describe("Remover aluno", () => {
    test("deve remover dois alunos pelo nome", () => {
        const gerenciador = new GerenciadorAlunos();
        gerenciador.cadastrar("Pedro", [10, 9, 8], "Turma Caruaru");
        gerenciador.cadastrar("Luca", [5, 6, 4], "Turma Recife");

        gerenciador.remover("Pedro");
        gerenciador.remover("Luca");

        const alunos = gerenciador.obterTodos();
        expect(alunos).toHaveLength(0);
    });
});