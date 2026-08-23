const readline = require("readline");
const GerenciadorAlunos = require("./GerenciadorAlunos");
const Relatorios = require("./relatorio");
const UI = require("./UI");

class App {
    constructor() {
        this.rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        this.gerenciador = new GerenciadorAlunos();
        this.relatorios = new Relatorios(this.gerenciador); // Injetamos o gerenciador
    }

    pergunta(texto) {
        return new Promise((resolve) => this.rl.question(texto, resolve));
    }

    async menuCadastrarAluno() {
        const nome = await this.pergunta("Nome do aluno: ");

        const turmasPreDefinidas = ["MouraTech Dados", "MouraTech Automação", "MouraTech FullStack"];
        const turmasCadastradas = this.gerenciador.obterTurmasNomes();

        // Junta as turmas pré-definidas com outras que já tenham sido cadastradas
        const turmas = [...new Set([...turmasPreDefinidas, ...turmasCadastradas])];

        let turma = "";

        console.log("\nTurmas disponíveis para cadastro:");
        turmas.forEach((t, i) => console.log(`${i + 1}- ${t}`));
        console.log(`0- Nova turma`);

        const opcaoTurma = await this.pergunta("\nDigite o indice da turma (ou 0 para nova): ");
        const indice = parseInt(opcaoTurma.trim()) - 1;

        if (indice >= 0 && indice < turmas.length) {
            turma = turmas[indice];
        } else {
            turma = await this.pergunta("Digite o nome da nova turma: ");
        }

        let notasValidas = false;
        let notas = [];

        while (!notasValidas) {
            const notasStr = await this.pergunta("Notas separadas por virgula (min. 3, ex: 7.5,8,9): ");
            notas = notasStr.split(",").map((n) => parseFloat(n.trim()));

            if (notas.length >= 3 && notas.every(n => !isNaN(n))) {
                notasValidas = true;
            } else {
                console.log("Entrada inválida! Por favor, digite apenas números separados por vírgula e no mínimo 3 notas.");
            }
        }

        try {
            const aluno = this.gerenciador.cadastrar(nome.trim(), notas, turma.trim());
            console.log(`\nAluno "${aluno.nome}" cadastrado com sucesso na turma "${aluno.turma}".`);
        } catch (err) {
            console.log(`\nErro: ${err.message}`);
        }
    }

    async menuRemoverAluno() {
        const nome = await this.pergunta("Nome do aluno para remover: ");
        this.gerenciador.remover(nome.trim());
        console.log(`\nAluno "${nome.trim()}" removido com sucesso.`);
    }

    async menuAnalisarTurma() {
        const turmas = this.gerenciador.obterTurmasNomes();

        if (turmas.length === 0) {
            console.log("\nNenhum aluno cadastrado ainda.");
            return;
        }

        console.log("\nTurmas disponíveis:");
        turmas.forEach((t, i) => console.log(`${i + 1}- ${t}`));

        const opcaoTurma = await this.pergunta("\nDigite o indice da turma: ");
        const indice = parseInt(opcaoTurma.trim()) - 1;

        if (indice >= 0 && indice < turmas.length) {
            this.relatorios.analisarTurma(turmas[indice]);
        } else {
            console.log("Turma inválida.");
        }
    }

    async iniciar() {
        console.log("\n--- SISTEMA DE ANÁLISE DE NOTAS — MOURATECH ---");

        let sair = false;

        while (!sair) {
            console.log();
            console.log(`Total de alunos cadastrados: ${this.gerenciador.obterTodos().length}`);
            UI.linha();
            console.log("1. Cadastrar aluno");
            console.log("2. Remover aluno");
            console.log("3. Analisar turma");
            console.log("4. Relatorio analitico");
            console.log("5. Sair");
            UI.linha();

            const opcao = await this.pergunta("Opcao: ");

            switch (opcao.trim()) {
                case "1":
                    await this.menuCadastrarAluno();
                    break;
                case "2":
                    await this.menuRemoverAluno();
                    break;
                case "3":
                    await this.menuAnalisarTurma();
                    break;
                case "4":
                    this.relatorios.analiticoGeral();
                    break;
                case "5":
                    sair = true;
                    break;
                default:
                    console.log("Opcao invalida.");
            }
        }

        console.log("\nEncerrando. Até logo!");
        this.rl.close();
    }
}

// Inicializa a aplicação
const app = new App();
app.iniciar();
