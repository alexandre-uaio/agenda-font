let hoje = Date.now();

let ontem = Date.parse("2020-07-26");

let diferenca = hoje - ontem;

const dia = 86400000;



console.log(ontem);

console.log(hoje);

console.log("Diferença.:" + diferenca);

if(diferenca > dia)
{
    console.log("Data selecionda inválida fora da faixa");
    
}else{
    console.log("Data selecionda válida");
}

console.log("obrigado Alexandre")