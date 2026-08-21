const Aluno = require("../Aluno.js");

describe("Aluno", () => {
  test("Deve retorna o nome do aluno corretamente", ()=>{
    const aluno = new Aluno("Maria", [9,2,1], "Turma B")
    expect(aluno.getNome()).toBe("Maria");
  })
});
