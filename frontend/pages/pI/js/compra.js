document.getElementById('total').addEventListener('click', async function () {
    localStorage.setItem("ing", 1)

    const date = new Date();

    // Format date and time to YYYY-MM-DDTHH:mm:ss without milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    const pedido = formattedDate
    localStorage.setItem("pedido", pedido)

    await generateAndSetUniqueSixDigitNumber();
    async function generateAndSetUniqueSixDigitNumber() {
        const uniqueRandomNumber = await generateUniqueSixDigitNumber();
        console.log(uniqueRandomNumber);
        localStorage.setItem("codigo", uniqueRandomNumber)
    }

    async function generateUniqueSixDigitNumber() {
        let isUnique = false;
        let randomSixDigitNumber;

        while (!isUnique) {
            randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

            const response = await fetch(`http://localhost:3000/ingresso/codigo/${randomSixDigitNumber}`);
            const data = await response.json();

            if (!data.exists) {
                isUnique = true;
            }
        }

        return randomSixDigitNumber;
    }

    comprarIngresso()
});

document.getElementById('hospedagem').addEventListener('click', async function () {
    localStorage.setItem("ing", 2)

    const date = new Date();

    // Format date and time to YYYY-MM-DDTHH:mm:ss without milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    const pedido = formattedDate
    localStorage.setItem("pedido", pedido)

    await generateAndSetUniqueSixDigitNumber();
    async function generateAndSetUniqueSixDigitNumber() {
        const uniqueRandomNumber = await generateUniqueSixDigitNumber();
        console.log(uniqueRandomNumber);
        localStorage.setItem("codigo", uniqueRandomNumber)
    }

    async function generateUniqueSixDigitNumber() {
        let isUnique = false;
        let randomSixDigitNumber;

        while (!isUnique) {
            randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

            const response = await fetch(`http://localhost:3000/ingresso/codigo/${randomSixDigitNumber}`);
            const data = await response.json();

            if (!data.exists) {
                isUnique = true;
            }
        }

        return randomSixDigitNumber;
    }

    comprarIngresso()
});

document.getElementById('pro').addEventListener('click', async function () {
    localStorage.setItem("ing", 3)

    const date = new Date();

    // Format date and time to YYYY-MM-DDTHH:mm:ss without milliseconds
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    const pedido = formattedDate
    localStorage.setItem("pedido", pedido)

    await generateAndSetUniqueSixDigitNumber();
    async function generateAndSetUniqueSixDigitNumber() {
        const uniqueRandomNumber = await generateUniqueSixDigitNumber();
        console.log(uniqueRandomNumber);
        localStorage.setItem("codigo", uniqueRandomNumber)
    }

    async function generateUniqueSixDigitNumber() {
        let isUnique = false;
        let randomSixDigitNumber;

        while (!isUnique) {
            randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000);

            const response = await fetch(`http://localhost:3000/ingresso/codigo/${randomSixDigitNumber}`);
            const data = await response.json();

            if (!data.exists) {
                isUnique = true;
            }
        }

        return randomSixDigitNumber;
    }

    comprarIngresso()
});

const modal = document.querySelector('.modal-ingresso');

function downloadDivAsImage() {
    var element = document.getElementById('ingresso');
    if (element) {
        html2canvas(element, { useCORS: true }).then(function (canvas) {
            var imageData = canvas.toDataURL("image/png");
            var link = document.createElement('a');
            link.href = imageData;
            link.download = 'ingresso.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(function (error) {
            console.error('Error capturing the div: ', error);
        });
    } else {
        console.error('Element with ID "ingresso" not found.');
    }
}

async function comprarIngresso() {
    const pedido = localStorage.getItem("pedido");
    console.log(pedido)
    const cod = Number(localStorage.getItem("codigo"));
    console.log(cod)
    const ingressoId = localStorage.getItem("ing");
    var user = localStorage.getItem('userjwt');
    user = JSON.parse(user)
    console.log(user.id)


    const datac = {
        codigo: cod,
        data_pedido: pedido
    }

    try {
        const response = await fetch(`http://localhost:3000/ingresso/compra/${ingressoId}/${user.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datac)
        });

        if (!response.ok) {
            throw new Error(`erro ao comprar ${response.status}`)
        }

        const compraIngresso = await response.json();
        alert(`Compra realizada com sucesso`)
        JsBarcode("#code128", cod);
        modal.style.display = 'flex'
        setTimeout(() => {
            modal.style.display = 'none'
        }, 5 * 1000);
        downloadDivAsImage()

        localStorage.removeItem("pedido")
        localStorage.removeItem("codigo")
        localStorage.removeItem("ing")
    } catch (error) {
        console.log(`Erro ao realizar compra: ${error}`)
    }
}