const { buscarAluno, listarAlunos, adicionarAluno } = require("../apiAlunos.js");

describe("buscarAluno(id)", () => {
  test("deve retornar o aluno ao buscar com id válido", () => {
    return buscarAluno(1).then((aluno) => {
      expect(aluno.nome).toBe("Maria Silva");
    });
  });

  test("deve rejeitar ao buscar id inexistente", () => {
    return buscarAluno(999).catch((err) => {
      expect(err.message).toBe("Aluno não encontrado.");
    });
  });
});

describe("listarAlunos()", () => {
  test("deve retornar todos os alunos", () => {
    return listarAlunos().then((alunos) => {
      expect(alunos.length).toBeGreaterThanOrEqual(3);
    });
  });
});

describe("adicionarAluno()", () => {
  test("deve adicionar um novo aluno com ID gerado", () => {
    const novo = { nome: "Carlos Lima", notas: [7, 8, 9], turma: "MouraTech Dados" };
    return adicionarAluno(novo).then((aluno) => {
      expect(aluno.nome).toBe("Carlos Lima");
      expect(aluno.id).toBeDefined();
    });
  });

  test("deve rejeitar se campos obrigatórios faltarem", () => {
    return adicionarAluno({ notas: [7, 8, 9] }).catch((err) => {
      expect(err.message).toBe("Nome e turma são obrigatórios.");
    });
  });
});
