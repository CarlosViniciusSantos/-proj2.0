document.querySelector('#registro').addEventListener('submit', async function (event) {
    event.preventDefault();

    const codigoIngresso =Number (document.querySelector('#codigo').value);
    const modal = document.querySelector('#infos');
    const nome = document.querySelector('#nome');
    const ingresso_tipo = document.querySelector('#ingressoTipo');
    const data_pedido = document.querySelector('#dataCompra');
    const data_utilizacao = document.querySelector('#dataUtilizacao');
    const valido = document.querySelector('#validacao');
    // Valido / invalido

    function formatDate(dataString) {
        const [datePart] = dataString.split('T');
    
        const [year, month, day] = datePart.split('-');
    
        return `${day}/${month}/${year}`;
    }

    try {
        const response = await fetch('http://localhost:3000/ingresso/atualizarData', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ codigoIngresso })
        })
        const result = await response.json()
        console.log(result)

        result?.error ==='Ingresso não encontrado' ? modal.style.display = 'none': modal.style.display = 'block'

        ingresso_tipo.innerHTML = result?.ingresso?.id_ingresso_tipo == 1? "Aventura Total"
        : result?.ingresso?.id_ingresso_tipo == 2? "Hospedagem semanal"
        : result?.ingresso?.id_ingresso_tipo == 3? "Fim de semana pro": null
        
        nome.innerHTML = result?.ingresso?.userName

        data_pedido.innerHTML = `Data da compra: ${formatDate(result?.ingresso?.data_pedido)}`
        data_utilizacao.innerHTML= result?.ingresso?.data_utilizacao ? `Data da utilização ${formatDate(result?.ingresso?.data_utilizacao)}` : null

        valido.innerHTML = result.ingresso.data_utilizacao ? "invalido": "valido"
       result.ingresso.data_utilizacao ? valido.style.backgroundColor = 'red': valido.style.backgroundColor = "green"

        setTimeout(() => {
            modal.style.display = 'none'
        }, 5 * 1000);
    } catch (error) {
        console.log(error)
    }
})