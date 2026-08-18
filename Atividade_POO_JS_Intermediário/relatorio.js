const UI = require('./UI');

class Relatorios {
    constructor(gerenciador, mediaMinima = 7.0) {
        this.gerenciador = gerenciador;
        this.mediaMinima = mediaMinima;
    }

    analisarTurma(nomeTurma) {
        const alunosDaTurma = this.gerenciador.obterPorTurma(nomeTurma);

        if (alunosDaTurma.length === 0) {
            console.log(`Nenhum aluno encontrado na turma "${nomeTurma}".`);
            return;
        }

        UI.titulo(`TURMA: ${nomeTurma}`);
        console.log(`${"ALUNO".padEnd(24)} ${"MÉDIA".padStart(6)}  SITUAÇÃO`);
        UI.linha();

        for (const aluno of alunosDaTurma) {
            const media = aluno.getMedia();
            const situacao = media >= this.mediaMinima ? "Aprovado" : "Reprovado";
            const mediaStr = media.toFixed(2).padStart(6);
            console.log(`${aluno.nome.padEnd(24)} ${mediaStr}  ${situacao}`);
        }

        UI.linha();
    }

    analiticoGeral() {
        const todosAlunos = this.gerenciador.obterTodos();

        if (todosAlunos.length === 0) {
            console.log("Nenhum aluno cadastrado ainda.");
            return;
        }

        UI.titulo("RELATÓRIO ANALÍTICO GERAL");

        // Identificando a maior e a menor média utilizando o método getMedia do Aluno
        const melhor = todosAlunos.reduce((a, b) => {
            const mediaA = a.getMedia();
            const mediaB = b.getMedia();
            if (mediaA === mediaB) {
                return a.nome.localeCompare(b.nome) < 0 ? a : b; // Desempate por ordem alfabética do nome
            }
            return mediaA > mediaB ? a : b;
        });

        const pior = todosAlunos.reduce((a, b) => {
            const mediaA = a.getMedia();
            const mediaB = b.getMedia();
            if (mediaA === mediaB) {
                return a.nome.localeCompare(b.nome) < 0 ? a : b; // Desempate por ordem alfabética do nome
            }
            return mediaA < mediaB ? a : b;
        });

        console.log(`Maior média: ${melhor.nome} - ${melhor.getMedia().toFixed(2)} (${melhor.turma})`);
        console.log(`Menor média: ${pior.nome} - ${pior.getMedia().toFixed(2)} (${pior.turma})`);

        UI.linha();

        const turmas = this.gerenciador.obterTurmasNomes();

        for (const nomeTurma of turmas) {
            const grupo = this.gerenciador.obterPorTurma(nomeTurma);
            const somaMedias = grupo.reduce((acc, aluno) => acc + aluno.getMedia(), 0);
            const mediaGeral = parseFloat((somaMedias / grupo.length).toFixed(2));
            const aprovados = grupo.filter((aluno) => aluno.getMedia() >= this.mediaMinima).length;
            const reprovados = grupo.length - aprovados;

            console.log(`${nomeTurma}`);
            console.log(`  Media geral: ${mediaGeral.toFixed(2)}`);
            console.log(`  Aprovados:   ${aprovados}`);
            console.log(`  Reprovados:  ${reprovados}`);
            UI.linha("-", 40);
        }
    }
}

module.exports = Relatorios;