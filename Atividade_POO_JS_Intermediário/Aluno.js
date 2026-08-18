class Aluno {
    constructor(nome, notas, turma) {
        if (!nome || !turma) {
            throw new Error("Nome e turma são obrigatórios.");
        }
        if (!Array.isArray(notas) || notas.length < 3) {
            throw new Error("O aluno precisa ter pelo menos 3 notas.");
        }

        this.nome = nome;
        this.notas = notas;
        this.turma = turma;
    }

    getMedia() {
        if (this.notas.length === 0) return 0;
        const soma = this.notas.reduce((acc, nota) => acc + nota, 0);
        return parseFloat((soma / this.notas.length).toFixed(2));
    }
}

module.exports = Aluno;