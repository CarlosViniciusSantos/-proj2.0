var users = []

document.addEventListener("DOMContentLoaded", function () {

  async function carregarUsers() {
    try {
      const response = await fetch("http://localhost:3000/user");
      const data = await response.json();
      users = data.users;
      console.log("users carregados: ", users)
      exibirUsers();
    } catch (error) {
      console.error("Erro ao carregar users: ", error)
    }
  }

  function exibirUsers() {
    const listausers = document.getElementById("lista-users")
    listausers.innerHTML = ""

    users.forEach((user, index) => {
      const card = criarUser(user, index);
      listausers.appendChild(card);
    });
  }

  function criarUser(user, index) {
    const row = document.createElement("tr");
    row.classList.add("emlinha");

    const avatarColumn = document.createElement("td");

    const avatarContainer = document.createElement("div");
    avatarContainer.classList.add("d-flex", "px-2", "py-1");

    const avatarImage = document.createElement("img");
    avatarImage.src = "img/user.png";
    avatarImage.classList.add("avatar", "avatar-sm", "me-3");

    const userDetails = document.createElement("div");
    userDetails.classList.add("d-flex", "flex-column", "justify-content-center");

    const userName = document.createElement("h6");
    userName.textContent = user.nome_completo;
    userName.classList.add("mb-0", "text-xs");

    const userEmail = document.createElement("p");
    userEmail.textContent = user.email;
    userEmail.classList.add("text-xs", "text-secondary", "mb-0");

    userDetails.appendChild(userName);
    userDetails.appendChild(userEmail);
    avatarContainer.appendChild(avatarImage);
    avatarContainer.appendChild(userDetails);
    avatarColumn.appendChild(avatarContainer);
    row.appendChild(avatarColumn);

    const subscriptionTypeColumn = document.createElement("td");
    const subscriptionType = document.createElement("p");
    subscriptionType.textContent = user.ingresso_tipo;
    subscriptionType.classList.add("text-xs", "font-weight-bold", "mb-0");
    subscriptionTypeColumn.appendChild(subscriptionType);
    row.appendChild(subscriptionTypeColumn);

    const amountColumn = document.createElement("td");
    const amount = document.createElement("p");
    amount.textContent = `R$ ${user.valor}`;
    amount.classList.add("text-xs", "text-secondary", "mb-0");
    amountColumn.classList.add("align-middle", "text-center", "text-sm");
    amountColumn.appendChild(amount);
    row.appendChild(amountColumn);

    const dateColumn = document.createElement("td");
    const date = document.createElement("span");
    date.textContent = user.data_pedido;
    date.classList.add("text-secondary", "text-xs", "font-weight-normal");
    dateColumn.classList.add("align-middle", "text-center");
    dateColumn.appendChild(date);
    row.appendChild(dateColumn);


    const btnAtualizar = document.createElement("button");
    btnAtualizar.textContent = "Edit"
    btnAtualizar.classList.add("btn-abrirEditar")
    btnAtualizar.addEventListener("click", () => {
      abrirModalEditar(user, index)
    });
    row.appendChild(btnAtualizar);

    return row;
  }

  function abrirModalEditar(user, index) {
    const modal = document.getElementById("modal-editar");
    const form = document.getElementById("form-editar");

    form.reset();

    form.querySelector("#id").value = user.id;
    form.querySelector("#nome").value = user.nome_completo;
    form.querySelector("#email").value = user.email;
    form.querySelector("#plano").value = user.plano;
    form.querySelector("#preco").value = user.preco;
    form.querySelector("#data_compra").value = user.data_compra;

    modal.style.display = "block"

    form.onsubmit = function (event) {
      event.preventDefault();

      users[index].nome_completo = form.querySelector("#nome").value
      users[index].email = form.querySelector("#email").value;
      users[index].plano = form.querySelector("#plano").value;
      users[index].preco = form.querySelector("#preco").value;
      users[index].data_compra = form.querySelector("#data_compra").value;

      // try {
      //       const response = await fetch(`http://localhost:3000/user/${user.id}`, {
      //           method: 'PUT',
      //           body: formData
      //       });

      //       if (!response.ok) {
      //           throw new Error('Erro ao atualizar usuário');
      //       }

      //       // Fechando o modal após a atualização
      //       modal.style.display = "none";
            
      //       // Recarregando os usuários após a atualização
      //       carregarUsers();

      //   } catch (error) {
      //       console.error('Erro ao atualizar usuário:', error);
      //   }

      modal.style.display = "none";

      exibirUsers();
    }
  }



  const modalAtualizar = document.getElementById("modal-editar");
  const closeBtnAtualizar = modalAtualizar.querySelector(".close-editar");
  closeBtnAtualizar.onclick = function (){
      modalAtualizar.style.display = "none";
  }
  
  window.onclick = function (event){
      // if (event.target === modalAdicionar) {
      //     modalAdicionar.style.display = "none"
      // } else 
      if (event.target === modalAtualizar) {
          modalAtualizar.style.display = "none"
      }
  }
  carregarUsers()
})