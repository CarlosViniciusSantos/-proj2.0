const logado = JSON.parse(localStorage.getItem('userjwt'));
console.log(logado)

if (logado == null || logado == undefined || logado == "undefined") {
  window.location.href = '../sign-in.html';
}

document.getElementById('voltar').addEventListener('click', function(event){
    window.location.href = 'preco.html'
  });

document.addEventListener('DOMContentLoaded', async () => {
    var nome = localStorage.getItem('userjwt');
            nome = JSON.parse(nome);
    const clienteId = nome.id;  // Substitua pelo ID do cliente apropriado
    const ingressos = await fetchIngressos(clienteId);
    const ingressosContainer = document.getElementById('meusIngressos');

    if (ingressos.length === 0) {
      ingressosContainer.innerHTML = '<p>Você ainda não comprou ingressos...</p>';
    } else {

        function formatDate(dataString) {
            const [datePart] = dataString.split('T');
    
            const [year, month, day] = datePart.split('-');
    
            return `${day}/${month}/${year}`;
        }

      ingressosContainer.innerHTML = ingressos.map((ingresso, index) =>
        `
        <div class="ingresso row">
          <h5><small>tipo de ingresso:</small> ${ingresso.id_ingresso_tipo == 1? "Aventura": ingresso.id_ingresso_tipo == 2? "Hospedagem": ingresso.id_ingresso_tipo == 3? "Pro": null}</h5>
          <p>Data da compra: ${formatDate(ingresso.data_pedido)}</p>
          <p>Data de utilização: ${ingresso.data_utilizacao}</p>
          <p>Usuário: ${ingresso.usuario.nome_completo}</p>
          <img id="barcode-${index}">
        </div>
        `
      ).join('');
      ingressos.forEach((ingresso, index) => {
        JsBarcode(`#barcode-${index}`, ingresso.codigo);
      });


    }
  });

  async function fetchIngressos(clienteId) {
    try {
      const response = await fetch(`http://localhost:3000/user/ingresso/${clienteId}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar os ingressos');
      }
      const ingressos = await response.json();
      return ingressos;
    } catch (error) {
      console.error('Erro:', error);
      return [];
    }
  }