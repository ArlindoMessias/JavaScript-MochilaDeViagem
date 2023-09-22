const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");

const itens = JSON.parse(localStorage.getItem("itens")) || [];//pega os itens do localstorage

itens.forEach((elemento)=>{
    criaElemento(elemento)//acrescenta item do localstorage na lista 
})

form.addEventListener("submit", (evento)=>{
    evento.preventDefault()
    console.log(evento)

    const name= evento.target.elements['nome']
    const qtde=evento.target.elements['quantidade']

    //ao criar novo item, verifica se ja existe
    const existe = itens.find(elemento=> elemento.nome===name.value)

    //local storage
    const itemAtual={
        "nome": name.value,
        "quantidade": qtde.value
    }

    if(existe){//caso o item ja exista
        itemAtual.id=existe.id
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento=>elemento.id===existe.id)] = itemAtual//sobrescrever o item
        
    } else{//senao
        itemAtual.id=itens[itens.length-1] ? (itens[itens.length-1]).id+1 : 0; //vai no id do ultimo elemento e soma 1 pra criar um novo
        criaElemento(itemAtual)//adiciona item na lista
        itens.push(itemAtual)
    }

    
    localStorage.setItem("itens", JSON.stringify(itens));//transformar em string

    //esvaziar formulario
    name.value="";
    qtde.value="";
})

function criaElemento(item){

    //padrao: <li class="item"><strong>7</strong>Camisas</li>

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")
    //saida: <li class="item"></li>

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML=item.quantidade
    numeroItem.dataset.id=item.id
    //saida: <strong>quantidade</strong>

    // adiciona o numeroItem como filho de novoItem
    novoItem.appendChild(numeroItem)
    novoItem.innerHTML+=item.nome
    //saida: <li class="item"><strong>quantidade</strong>nome</li>
    
    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)//add o novo item no final da lista
    console.log(novoItem)
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML=item.quantidade
}

function botaoDeleta(id){
    const elementoBotao=document.createElement("button")
    elementoBotao.innerText="X"

    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id ===id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}