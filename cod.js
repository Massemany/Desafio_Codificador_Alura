var msg = window.document.getElementById('msg')
var r = window.document.getElementById('result')
var img = window.document.getElementById('img_pessoa')
var p = window.document.getElementById('p')
var btnCopiar = window.document.getElementById('copiar')
var input = window.document.getElementById('input')
r.innerHTML = 'Nenhuma mensagem encontrada'
msg.value = ''
function operacao() {
    let mensagem = msg.value;
    if (mensagem.length == 0) {
        alert('Digite a mensagem antes')
        location.reload()
    } else if (verificarMaiusculas(mensagem) || verificarAcento(mensagem)) {
        alert('Apenas letras minúsculas e sem acento')
        location.reload()
    } else {
        img.parentNode.removeChild(img);
        p.innerHTML = ''
        r.innerHTML = ''
        r.style.textAlign = 'left'
    }
}

document.getElementById("cod").addEventListener("click", function() {
    let mensagem = msg.value;
    mensagem = codificarMensagem(mensagem);
    r.textContent = mensagem;
    input.value = r.textContent //passando o valor do resultado para um input para que seja possivel realizar a funcao de copiar
    msg.value = ''
});

document.getElementById("desc").addEventListener("click", function() {
    let mensagem = msg.value;
    mensagem = descodificarMensagem(mensagem);
    r.innerHTML = mensagem;
    input.value = r.textContent //passando o valor do resultado para um input para que seja possivel realizar a funcao de copiar
    msg.value = ''
});

function verificarMaiusculas(mensagem) {
    return /[A-ZÀ-Ú]/.test(mensagem)  
}
function verificarAcento(mensagem) {
    return mensagem.normalize("NFD").match(/[\u0300-\u036f]/g) !== null;
}

//necessário para que uma vogal já codificada não acabe sendo codificada novamente
function codificarMensagem(mensagem) {
    let novamensagem = '';
    for (let i = 0; i < mensagem.length; i++) {
        let letra = mensagem[i];
        switch (letra) {
            case 'a':
                novamensagem += 'ai';
                break;
            case 'e':
                novamensagem += 'enter';
                break;
            case 'i':
                novamensagem += 'imes';
                break;
            case 'o':
                novamensagem += 'ober';
                break;
            case 'u':
                novamensagem += 'ufat';
                break;
            default:
                novamensagem += letra;
                break;
        }
    }
    return novamensagem;
}

//verifica letra por letra, ao notar que as letras seguem um padrao, pega a primeira letra desse padrao e ignora o restante. EX: imes = i 
function descodificarMensagem(mensagem) {
    let novamensagem = '';
    let i = 0;
    while (i < mensagem.length) {
        let padraoEncontrado = false;
        for (let padrao of ["ai", "enter", "imes", "ober", "ufat"]) {
            if (mensagem.startsWith(padrao, i)) {
                novamensagem += padrao[0]; // Adiciona a primeira letra do padrão
                i += padrao.length; // Pula a subsequência codificada
                padraoEncontrado = true;
                break;
            }
        }
        if (!padraoEncontrado) {
            novamensagem += mensagem[i]; // Adiciona a letra original
            i++;
        }
    }
    return novamensagem;
}

function copiarTexto() {
    if (r.textContent.trim() !== 'Nenhuma mensagem encontrada') {
        input.select()
        document.execCommand('copy');
    }
}

btnCopiar.addEventListener('click', copiarTexto);

