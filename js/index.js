// console.log('Tabela da Copa')

let tabelaJogos = document.querySelector('.tabelaJogos')
// console.log(tabelaJogos)

// ler o arquivo json
fetch('jogos-fase1.json')
.then( response => response.json() )
.then( data => data.forEach( jogo => {
    // console.log(data)

    // criar uma linha de tabela, colocar ela na tabela
    let linha = document.createElement('tr')
    tabelaJogos.appendChild(linha)

    // preencher os dados do jogo em cada linha da tabela
    linha.innerHTML = `
        <td>${jogo.diaSemana}</td>
        <td>${jogo.data}</td>
        <td>${jogo.hora}</td>
        <td>${jogo.grupo}</td>
        <td class='centralizar'>
            <img class='imagemP' src='./images/bandeiras/${jogo.mandante}' alt='' />
            <span class='gols'>${jogo.gols_mandante}</span>

            <span class='partida'>${jogo.partida}</span>

            <span class='gols'>${jogo.gols_visitante}</span>
            <img class='imagemP' src='./images/bandeiras/${jogo.visitante}' alt='' />
        </td>

        <td class='esquerda'>${jogo.estadio}</td>
    `
})
)

let tabelaClassificacao = document.querySelector('.tabelaClassificacao')
// console.log(tabelaClassificacao)
let linhas = document.querySelectorAll('.corpoClassificacao tr')
// console.log(linhas)

exibirTabelaClassificacao('A')

function exibirTabelaClassificacao(letraGrupo) {
    // atualizar letra do grupo no index.html
    document.querySelector('.letra').innerHTML = letraGrupo

    // ler json das classificações
    fetch(`classificacaoGrupo${letraGrupo}.json`)
    .then( resposta => resposta.json() )
    .then( dados => {
        // ORDENAR OS DADOS DO ARRAY COM OBJETOS
        dados.sort(function compararNumeros(a, b) {
            return a.posicao - b.posicao
        })
        
        dados.forEach( (selecao, indice) => {
            // console.log(dados)
            // console.log(selecao)
    
            // criar linhar tr
            // let linha = document.createElement('tr')
        
            // colocar ela como filho dentro da tabela
            // tabelaClassificacao.appendChild(linha)
        
            // preencher os dados
            linhas[indice].innerHTML = `
                <td>${selecao.posicao}</td>
                <td>${selecao.selecao}</td>
                <td>${selecao.pontos}</td>
                <td>${selecao.jogos}</td>
                <td>${selecao.vitorias}</td>
                <td>${selecao.empates}</td>
                <td>${selecao.derrotas}</td>
                <td>${selecao.gols_pro}</td>
                <td>${selecao.gols_contra}</td>
                <td>${selecao.saldo_de_gols}</td>
            `
        })
    }
    )
}

// exibirTabelaClassificacao('G')

// controlar a escolha da letra do grupo para exibir na tabela de classificação
let selectLetra = document.querySelector('.letrasDosGrupos')
// console.log(selectLetra)

// usar um escutador de eventos para a nossa cx select
selectLetra.addEventListener('change', (event) => {
    // console.log('mudou')
    // console.log(event.target.value)
    exibirTabelaClassificacao(event.target.value)
})

// OITAVAS DE FINAL
let divOitavas = document.querySelector('.divOitavas')
// console.log(divOitavas)

fetch('oitavas-de-final.json')
.then( resposta => resposta.json() )
.then( dados => {
    // console.log(dados)

    dados.forEach( jogo => {  
        // criar uma nova divisoria
        let divisoria = document.createElement('div')
        
        // colocar ela como filho de divOitavas
        divOitavas.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Oitavas ${jogo.id}</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_mandante}' />
                <span class='gols'>${jogo.gols_mandante}</span>
                ${jogo.partida}
                <span class='gols'>${jogo.gols_visitante}</span>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar dos Pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Classificado: ${jogo.classificado}</h6>
        `
    })
} )

// consumir dados json externos de uma API
fetch('https://worldcupjson.net/matches/tomorrow/?by_date=DESC')
.then( resposta => resposta.json() )
.then( dados => {
    // console.log(dados)
    dados.forEach( jogo => {
        // console.log(jogo)
        console.log(jogo.home_team_country + " x " + jogo.away_team_country) 
    })
})

// QUARTAS DE FINAL
let divQuartas = document.querySelector('.divQuartas')
// console.log(divQuartas)
const selecoes = [
    {
        mandante: 'Croácia',
        visitante: 'Brasil'
    },
    {
        mandante: 'Holanda',
        visitante: 'Argentina'
    },
    {
        mandante: 'Marrocos',
        visitante: 'Portugal'
    },
    {
        mandante: 'Inglaterra',
        visitante: 'França'
    }
]

fetch('quartas-de-final.json')
.then( resposta => resposta.json() )
.then( dados => {
    // console.log(dados)

    dados.forEach( jogo => {  
        // criar uma nova divisoria
        let divisoria = document.createElement('div')
        
        // colocar ela como filho de divQuartas
        divQuartas.appendChild(divisoria)

        // preencher os dados de cada jogo
        divisoria.innerHTML = `
            <h3 class='jogo'>Quartas ${jogo.id}</h3>
            <h4>
                <span class='dia'>${jogo.diaSemana}</span>
                ${jogo.data}
                <span class='hora'>${jogo.hora}</span>
            </h4>
            <h4 class='centralizar jogo'>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_mandante}' />
                <input type='number' min='0' max='99' class='gols golsMandante' value='${jogo.gols_mandante}'>
                ${jogo.partida}
                <input type='number' min='0' max='99' class='gols golsVisitante' value='${jogo.gols_visitante}'>
                <img class='imagemP' src='./images/bandeiras/${jogo.img_visitante}' />
            </h4>
            <h5>${jogo.estadio}</h5>
            <h6>Prorrogação: ${jogo.prorrogacao}</h6>
            <h6>Pênaltis: ${jogo.penaltis}</h6>
            <h6>Placar de pênaltis: ${jogo.placar_penaltis}</h6>
            <h6>Classificado: ${jogo.classificado}</h6>
        `
        let inputGolsMandante = document.querySelectorAll('.golsMandante')
        let inputGolsVisitante = document.querySelectorAll('.golsVisitante')
        let golsM = 0
        let golsV = 0

        // pegar os valores dos inputs quando ocorrer uma mudança neles
        inputGolsMandante.forEach( (jogo, posicao) => {
            inputGolsMandante[posicao].addEventListener('change', (e) => {
                console.log(e.target.value)
                golsM = e.target.value
            })
        })
        inputGolsVisitante.forEach( (jogo, posicao) => {
            inputGolsVisitante[posicao].addEventListener('change', (e) => {
                console.log(e.target.value)
                golsV = e.target.value
                // ver o resultado da partida
                resultados(golsM, golsV, posicao)
            })
        })

        // console.log(jogo.classificado)
        classificados.push(jogo.classificado)
        // console.log(classificados)
        localStorage.setItem('classificados', JSON.stringify(classificados))

    }) // fim do forEach
})

let spanQ1 = document.querySelector('.q1')
let spanQ2 = document.querySelector('.q2')
let spanQ3 = document.querySelector('.q3')
let spanQ4 = document.querySelector('.q4')

function resultados(golsM, golsV, posicao) {
    if(golsM > golsV) {
        if(posicao == 0) {
            spanQ1.innerHTML = selecoes[posicao].mandante
        }
        if(posicao == 1) {
            spanQ2.innerHTML = selecoes[posicao].mandante
        }
        if(posicao == 2) {
            spanQ3.innerHTML = selecoes[posicao].mandante
        }
        if(posicao == 3) {
            spanQ4.innerHTML = selecoes[posicao].mandante
        }
    }
    if(golsM < golsV) {
        if(posicao == 0) {
            spanQ1.innerHTML = selecoes[posicao].visitante
        }
        if(posicao == 1) {
            spanQ2.innerHTML = selecoes[posicao].visitante
        }
        if(posicao == 2) {
            spanQ3.innerHTML = selecoes[posicao].visitante
        }
        if(posicao == 3) {
            spanQ4.innerHTML = selecoes[posicao].visitante
        }
    }
    if(golsM == golsV) {
        console.log('Empate')
    }
}

// criar uma lista de classificados
let classificados = []

// ler os spans que tem a class quartas
let spans = document.querySelectorAll('.quartas')
// console.log(spans)

// preencher com a lista de classificados
// console.log( JSON.parse(localStorage.getItem('classificados'))[1] )

spans.forEach( (span, indice) => {
    span.innerHTML = JSON.parse(localStorage.getItem('classificados'))[indice]
} )

// manipular dados das semifinais para exibir finais
let jogosSemiFinais = [
    {
        gols_mandante: '0',
        gols_visitante: '3',
        mandante: 'Croácia',
        visitante: 'Argentina',
        img_mandante: 'croacia.png',
        img_visitante: 'argentina.png',
        vitorioso: 'Argentina',
        perdedor: 'Croácia'
    },
    {
        gols_mandante: '2',
        gols_visitante: '0',
        mandante: 'França',
        visitante: 'Marrocos',
        img_mandante: 'franca.png',
        img_visitante: 'marrocos.png',
        vitorioso: 'França',
        perdedor: 'Marrocos'
    }
]

console.log(jogosSemiFinais)

// selecionar os inputs de gols das semifinais
let inputGolsSemiFinais = document.querySelectorAll('.semi .gols')
console.log(inputGolsSemiFinais)

inputGolsSemiFinais.forEach( (gol, posicao) => {
    inputGolsSemiFinais[posicao].addEventListener('change', (e) => {
        console.log(e.target.value)
        switch(posicao) {
            case 0:
                jogosSemiFinais[0].gols_mandante = e.target.value
                // break
            case 1:
                jogosSemiFinais[0].gols_visitante = e.target.value
                // break
            case 2:
                jogosSemiFinais[1].gols_mandante = e.target.value
                // break
            case 3:
                jogosSemiFinais[1].gols_visitante = e.target.value
                // break
        }
        verResultadosSemiFinais()
    })
})

let spanT1 = document.querySelector('.t1') // perdedor s1
let spanT2 = document.querySelector('.t2') // perdedor s2
let spanF1 = document.querySelector('.f1') // vencedor s1
let spanF2 = document.querySelector('.f2') // vencedor s2

// funcao para definir vencedores e perdedores das semifinais
function verResultadosSemiFinais() {

    if(jogosSemiFinais[0].gols_mandante > jogosSemiFinais[0].gols_visitante) {
        console.log('Vitória do mandante no S1')
        spanF1.innerHTML = jogosSemiFinais[0].mandante
        spanT1.innerHTML = jogosSemiFinais[0].visitante
    }
    if(jogosSemiFinais[0].gols_mandante < jogosSemiFinais[0].gols_visitante) {
        console.log('Vitória do visitante no S1')
        spanF1.innerHTML = jogosSemiFinais[0].visitante
        spanT1.innerHTML = jogosSemiFinais[0].mandante
    }
    if(jogosSemiFinais[1].gols_mandante > jogosSemiFinais[1].gols_visitante) {
        console.log('Vitória do mandante no S2')
        spanF2.innerHTML = jogosSemiFinais[1].mandante
        spanT2.innerHTML = jogosSemiFinais[1].visitante
    }
    if(jogosSemiFinais[1].gols_mandante < jogosSemiFinais[1].gols_visitante) {
        console.log('Vitória do visitante no S2')
        spanF2.innerHTML = jogosSemiFinais[1].visitante
        spanT2.innerHTML = jogosSemiFinais[1].mandante
    }
}

// verResultadosSemiFinais()

function preencherResultadosSemiFinais() {
    spanF1.innerHTML = jogosSemiFinais[0].vitorioso
    spanF2.innerHTML = jogosSemiFinais[1].vitorioso
    spanT1.innerHTML = jogosSemiFinais[0].perdedor
    spanT2.innerHTML = jogosSemiFinais[1].perdedor    
    let golsSemi = document.querySelectorAll('.semi .gols')
    golsSemi[0].value = jogosSemiFinais[0].gols_mandante
    golsSemi[1].value = jogosSemiFinais[0].gols_visitante
    golsSemi[2].value = jogosSemiFinais[1].gols_mandante
    golsSemi[3].value = jogosSemiFinais[1].gols_visitante
}

preencherResultadosSemiFinais()
