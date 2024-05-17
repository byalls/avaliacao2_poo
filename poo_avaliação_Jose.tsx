
abstract class Item{

    protected nome: string;
    protected descricao: string;

    constructor(nome: string, descricao: string){
        this.nome = nome;
        this.descricao = descricao;
    }

    getNome(){
        return this.nome;
    }
    setNome(nome: string){
        this.nome = nome;
    }

    getDescricao(){
        return this.descricao;
    }   
    setDescricao(descricao: string){
        this.descricao = descricao;
    }

    abstract aplicarBeneficio(Personagem):void;
    abstract removerBeneficio(Personagem):void;
    
    
}

class itemInventario{
    private quantidade: number;
    private item: Item;
    constructor(quantidade: number, item: Item){
        this.quantidade = quantidade;
        this.item = item;
    }
    getQuantidade(){
        return this.quantidade;
    }
    setQuantidade(quantidade: number){  
        this.quantidade = quantidade;
    }
    getItem(){
        return this.item;
    }   
}  


class Arma extends Item{
    constructor(nome: string, descricao: string){
        super(nome, descricao);
    }

    aplicarBeneficio(personagem: Personagem){
        personagem.aumAtaque(10);
        personagem.aumDefesa(5);
    }
    removerBeneficio(personagem: Personagem){
        personagem.dimAtaque(10);
        personagem.dimDefesa(5);
    }

};


class Pocao extends Item{
    constructor(nome: string, descricao: string){ 
        super(nome, descricao);
    }
    aplicarBeneficio(personagem: Personagem){
        personagem.setVida(1.5);
        personagem.setMp(1.2) ;
    }
    removerBeneficio(personagem: Personagem){
    }
};

class Personagem{
    private nome: string;
    private vida: number;
    private mp: number;
    private ataque: number;
    private defesa: number;
    private inventario: Inventario;
    private arma: Arma;

    constructor(nome: string, vida: number, mp: number, ataque: number, defesa: number,inventario: Inventario ,arma: Arma){
        this.nome = nome;
        this.vida = vida;
        this.mp = mp;
        this.ataque = ataque;
        this.defesa = defesa;
        this.inventario = inventario;
        this.arma = arma;
    }

    getNome(){
        return this.nome;
    }
    setNome(nome: string){
        this.nome = nome;
    }

    getVida(){
        return this.vida;
    }
    setVida(vida: number){
        this.vida = vida;
    }

    getMp(){
        return this.mp;
    }
    setMp(mp: number){
        this.mp = mp;
    }

    getAtaque(){
        return this.ataque;
    }
    setAtaque(ataque: number){
        this.ataque = ataque;
    }
    getInventario(){
        return this.inventario;
    }

    getDefesa(){
        return this.defesa;
    }
    setDefesa(defesa: number){
        this.defesa = defesa;
    }
    getArma(){
        return this.arma;
    }
    setArma(arma: Arma){
        this.arma = arma;
    }

    aumAtaque(valor: number){
        this.ataque += valor;
    }

    dimAtaque(valor: number){
        this.ataque -= valor;
    }

    aumDefesa(valor: number){
        this.defesa += valor;
    }

    dimDefesa(valor: number){
        this.defesa -= valor;
    }

    abrirInventario(){
        console.log("Inventario: ");
        this.inventario.getItens().forEach((item, index) => {
            console.log(
                `${index + 1} - ${item.getItem().getNome()} - ${item.getItem().getDescricao()} - ${item.getQuantidade()}`
            );
        console.log(`Total: ${this.inventario.getItens().length} `);            
        });
    }
    usarItem(item: Item){
        if (item instanceof Pocao){
            item.aplicarBeneficio(this);
            for (let i = 0; i < this.inventario.getItens().length; i++){
                if (this.inventario.getItens()[i].getItem().getNome() === item.getNome()){
                    this.inventario.getItens()[i].setQuantidade(this.inventario.getItens()[i].getQuantidade() - 1);
                    if (this.inventario.getItens()[i].getQuantidade() === 0){
                        this.inventario.getItens().splice(i, 1);
                    }
                }
            }
        }else if (item instanceof Arma){
            this.arma.aplicarBeneficio(this);
        }
    }
    desequiparArma(){
        this.arma.removerBeneficio(this);
    }
    
    exibirInformacoes(){
        const informacoes: string[] = [];
        informacoes.push(`Nome: ${this.nome}`);
        informacoes.push(`Vida: ${this.vida}`);
        informacoes.push(`MP: ${this.mp}`);
        informacoes.push(`Ataque: ${this.ataque}`);
        informacoes.push(`Defesa: ${this.defesa}`);
        informacoes.push(`Arma: ${this.arma.getNome()}`);
        this.abrirInventario();
    }
}  

class Inventario{
    private itens : itemInventario[];
    private qtdMaxItens: number;

    constructor(qtdMaxItens: number){
        this.itens = [];
        this.qtdMaxItens = qtdMaxItens;
    }
    getItens(){
        return this.itens;
    }

    getQtdMaxItens(){
        return this.qtdMaxItens;
    }

    getTotalItens(){
        return this.itens.reduce((total, item) => total + item.getQuantidade(), 0);
    }

    adicionarItem(item: Item){
        if(this.itens.length >= this.qtdMaxItens){
            throw new InventarioLimException("Inventario cheio. Não é possível adicionar mais itens.");
        }
        const ItemJaExiste = this.itens.findIndex((itemInventario) => itemInventario.getItem().getNome() === item.getNome());
        if(ItemJaExiste !== -1){
            this.itens[ItemJaExiste].setQuantidade(this.itens[ItemJaExiste].getQuantidade() + 1);
        }
        else{
            this.itens.push(new itemInventario(1, item));
        }
    }

    removerItem(item: Item){
        const itemIndice = this.itens.findIndex((itemInventario)=> itemInventario.getItem().getNome() === item.getNome());
        if(itemIndice === -1){
            this.itens.splice(itemIndice, 1);
        }
    }
}


class InventarioLimException extends Error{
    constructor(mensagem: string){
        super(mensagem);
        this.name = "InventarioLimException";
    }
}

class ItemMenu{
    private opcao: string;
    private textoOpcao: string;

    constructor(opcao: string, textoOpcao: string){
        this.opcao = opcao;
        this.textoOpcao = textoOpcao;
    }   

    getOpcao(){ 
        return this.opcao;
    }
    setOpcao(opcao: string){
        this.opcao = opcao;
    }

    getTextoOpcao(){
        return this.textoOpcao;
    }

    setTextoOpcao(textoOpcao: string){
        this.textoOpcao = textoOpcao;
    }
}


class Menu{
    private itensMenu: ItemMenu[];    
    constructor(){
        this.itensMenu = [];
    }
    adicionarItemMenu(opcao: string, textoOpcao: string){
        this.itensMenu.push(new ItemMenu(opcao, textoOpcao));
    }
    imprimirMenu(){
        console.log("       Menu:       ");
        this.itensMenu.forEach((item) => {
            console.log(`${item.getOpcao()} - ${item.getTextoOpcao()}`);
        });
    }
}

const menu = new Menu();

class App{
    private menu : Menu;
    private personagem: Personagem;

    constructor(){
        this.menu = new Menu();
        this.personagem = new Personagem("Dohvakiin", 100, 100, 10, 10, new Inventario(50), new Arma("Dawnbreaker", "A espada da deusa daedrica Meridia, encontrada em seu templo."));
        
        this.abrirMenu();
    }

    private abrirMenu(){
        this.menu.adicionarItemMenu("1. ", "Equipar arma");
        this.menu.adicionarItemMenu("2. ", "Tomar poção");
        this.menu.adicionarItemMenu("3. ","Adicionar arma ao inventário");
        this.menu.adicionarItemMenu("4. ","Adicionar poção ao inventário");
        this.menu.adicionarItemMenu("5. ","Imprimir Info");
        this.menu.adicionarItemMenu("6. ","Desequipar Arma");
        this.menu.adicionarItemMenu("0. ","Sair");
    }

    exe(){
        this.menu.imprimirMenu();
        let opcao: string = "";
        while(opcao != "0") {
            opcao = prompt("Escolha uma opção: ") ?? '';
            switch(opcao){
                case "1":
                    this.personagem.usarItem(this.personagem.getArma());
                    break;
                case "2":
                    this.personagem.usarItem(new Pocao("Poção", "Recupera 50% da vida e 20% da MP."));
                    break;
                case "3":
                    this.personagem.getInventario().adicionarItem(new Arma("Daedric Sword", "Espada feita com vários corações de uma antiga raça que já governou esse mundo."));
                    break;
                case "4":
                    this.personagem.getInventario().adicionarItem(new Pocao("Poção", "Recupera 50% da vida e 20% da MP."));
                    break;
                case "5":
                    this.personagem.exibirInformacoes();
                    break;
                case "6":
                    this.personagem.desequiparArma();
                    break;
                case "0":
                    console.log("Saindo...");
                    break;
                default:
                    console.log("Opção inválida");
                    break;
            }
        }
    }
}