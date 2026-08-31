const readline = require("readline");
const GerenciadorAlunos = require("./GerenciadorAlunos");
const Relatorios = require("./relatorio");
const UI = require("./UI");
const { buscarAluno, listarAlunos, adicionarAluno } = require("./apiAlunos");

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

        console.log("\nCadastrando aluno...");
        try {
            const novoAluno = await adicionarAluno({ nome: nome.trim(), notas, turma: turma.trim() });
            // Também registra no gerenciador local para análises e relatórios
            this.gerenciador.cadastrar(novoAluno.nome, novoAluno.notas, novoAluno.turma);
            console.log(`\nAluno "${novoAluno.nome}" cadastrado com sucesso (ID: ${novoAluno.id}) na turma "${novoAluno.turma}".`);
        } catch (err) {
            console.log(`\nErro: ${err.message}`);
        }
    }

    async menuListarAlunos() {
        console.log("\nBuscando alunos...");
        try {
            const alunos = await listarAlunos();
            if (alunos.length === 0) {
                console.log("Nenhum aluno encontrado.");
                return;
            }
            UI.titulo("LISTA DE ALUNOS");
            alunos.forEach((aluno) => {
                console.log(`  ID: ${aluno.id} | Nome: ${aluno.nome} | Turma: ${aluno.turma} | Notas: ${aluno.notas.join(", ")}`);
            });
            UI.linha();
        } catch (err) {
            console.log(`\nErro: ${err.message}`);
        }
    }

    async menuRemoverAluno() {
        const nome = await this.pergunta("Nome do aluno para remover: ");
        try {
            this.gerenciador.remover(nome.trim());
            console.log(`\nAluno "${nome.trim()}" removido com sucesso.`);
        } catch (err) {
            console.log(`\nErro: ${err.message}`);
        }
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
            console.log("2. Listar alunos");
            console.log("3. Remover aluno");
            console.log("4. Analisar turma");
            console.log("5. Relatorio analitico");
            console.log("6. Buscar aluno por ID");
            console.log("7. Sair");
            UI.linha();

            const opcao = await this.pergunta("Opcao: ");

            switch (opcao.trim()) {
                case "1":
                    await this.menuCadastrarAluno();
                    break;
                case "2":
                    await this.menuListarAlunos();
                    break;
                case "3":
                    await this.menuRemoverAluno();
                    break;
                case "4":
                    await this.menuAnalisarTurma();
                    break;
                case "5":
                    this.relatorios.analiticoGeral();
                    break;
                case "6":
                    const idStr = await this.pergunta("Digite o ID do aluno: ");
                    console.log("\nBuscando aluno...");
                    await buscarAluno(parseInt(idStr))
                        .then((aluno) => {
                            UI.titulo("ALUNO ENCONTRADO");
                            console.log(`  ID:    ${aluno.id}`);
                            console.log(`  Nome:  ${aluno.nome}`);
                            console.log(`  Turma: ${aluno.turma}`);
                            console.log(`  Notas: ${aluno.notas.join(", ")}`);
                            UI.linha();
                        })
                        .catch((err) => {
                            console.log(`\nErro: ${err.message}`);
                        });
                    break;
                case "7":
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