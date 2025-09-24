const titulos = [
  "Sinta o Gosto da Brasa!",
  "O Segredo?",
  "Nossa Carne Feita na Brasa!",  
  "O Sabor Defumado que Você Merece.",
  "Artesanal e na Brasa",
  "A Combinação Perfeita para o Hambúrguer dos Seus Sonhos!",
  "Prepare-se para a Explosão de Sabor!",
  "Carne na Brasa e Hambúrguer Artesanal de Verdade."
];

let indiceAtual = 0;
const elementoH1 = document.getElementById('tituloDinamico');

function exibirProximoTitulo() {
  // 1. Oculta o título atual (para o próximo aparecer do nada)
  elementoH1.classList.remove('fade-in');

  // Espera um pequeno momento para a transição de saída
  setTimeout(() => {
    // 2. Define o texto do próximo título
    elementoH1.textContent = titulos[indiceAtual];
    
    // 3. Adiciona a classe para iniciar a animação de "fade in"
    elementoH1.classList.add('fade-in');
    
    // 4. Espera a animação de "fade in" terminar e o título ser lido
    const tempoAnimacao = 3000; // 2 segundos (mesmo do CSS)
    const tempoLeitura = 3000;  // 3 segundos para o usuário ler o título
    
    setTimeout(() => {
      // 5. Avança para o próximo título
      indiceAtual = (indiceAtual + 1) % titulos.length;
      exibirProximoTitulo();
    }, tempoAnimacao + tempoLeitura);
    
  }, 1500); // 0.5 segundos de pausa entre os títulos
}

// Inicia a sequência de títulos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  exibirProximoTitulo();
});