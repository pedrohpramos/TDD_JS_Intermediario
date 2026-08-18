class UI {
    static linha(char = "-", length = 44) {
        console.log(char.repeat(length));
    }

    static titulo(texto) {
        console.log();
        this.linha("-");
        console.log(texto);
        this.linha("-");
    }
}

module.exports = UI;