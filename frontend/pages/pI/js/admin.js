var users = []

const logadofunc = JSON.parse(localStorage.getItem('funcjwt'));
console.log(logadofunc)

if (logadofunc == null || logadofunc == undefined || logadofunc == "undefined") {
  window.location.href = '../login-func.html';
}

const telefoneInput = document.getElementById("telefoneAdicionar");
telefoneInput.addEventListener("input", function (event) {
  const input = event.target;
  let value = input.value.replace(/\D/g, ""); // Remove todos os caracteres que não são dígitos

  if (value.length > 10) {
    value = value.substring(0, 11); // Limita o tamanho máximo para 11 dígitos
  }

  // Adiciona os parênteses e o traço conforme o usuário digita
  if (value.length > 6) {
    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}${value.substring(7, 11)}`;
  } else if (value.length > 2) {
    value = `(${value.substring(0, 2)}) ${value.substring(2, 7)}`;
  } else if (value.length > 0) {
    value = `(${value}`;
  }

  input.value = value;
})

document.addEventListener("DOMContentLoaded", function () {

  const modalAdicionar = document.getElementById("modalAdicionar");
  const formAdicionar = document.getElementById("formAdicionar");

  // Função para abrir o modal de adicionar usuário
  function abrirModalAdicionar() {
    modalAdicionar.style.display = "block";
  }

  // Função para fechar o modal de adicionar usuário
  function fecharModalAdicionar() {
    modalAdicionar.style.display = "none";
  }

  // Adiciona um evento de clique ao botão de adicionar usuário para abrir o modal
  document.getElementById("btnAbrirModalAdicionar").addEventListener("click", abrirModalAdicionar);

  // Adiciona um evento de clique ao botão de fechar do modal de adicionar usuário


  // Adiciona um evento de envio ao formulário de adicionar usuário
  formAdicionar.addEventListener("submit", async function (event) {
    event.preventDefault();

    // Obtenha os valores dos campos do formulário
    const nome = document.getElementById("nomeAdicionar").value;
    const email = document.getElementById("emailAdicionar").value;
    const telefone = document.getElementById("telefoneAdicionar").value.replace(/\D/g, "");

    // Aqui você pode fazer o que quiser com os valores, como enviá-los para o backend
    try {
      const response = await fetch('http://localhost:3000/user');
      const result = await response.json();
      const userExists = result.users.filter(user => user.email === email);

      if (userExists.length > 0) {
        alert('O email já existe. Por favor, escolha um email diferente.');
      } else {
        const newUser = {
          nome_completo: nome,
          telefone: telefone,
          email: email,
          // senha: password,
          tipo: "Cliente"
        };

        const registerResponse = await fetch('http://localhost:3000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        if (registerResponse.ok) {
          alert('Cadastro realizado com sucesso!');
          carregarUsers()
        } else {
          alert('Cadastro falhou');
        }
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      alert('Um erro ocorreu. Por favor, tente novamente mais tarde.');
    }

    // Após lidar com os valores, feche o modal
    fecharModalAdicionar();
  });

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

  function criarUser(user) {

    const row = document.createElement("tr");
    row.classList.add("emlinha");
    if (user.tipo === "Cliente") {

      const avatarColumn = document.createElement("td");

      const avatarContainer = document.createElement("div");
      avatarContainer.classList.add("d-flex", "px-2", "py-1");

      const avatarImage = document.createElement("img");
      avatarImage.src = "img/user.png";
      avatarImage.classList.add("avatar", "avatar-sm", "me-3");

      const userDetails = document.createElement("div");
      userDetails.classList.add("d-flex", "flex-column", "justify-content-center");

      const userName = document.createElement("h6");
      userName.textContent = user.usuario;
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
      btnAtualizar.textContent = "Excluir"
      btnAtualizar.classList.add("btn-excluir")
      btnAtualizar.addEventListener("click", () => {
        excluirUser(user.id)
      });


      row.appendChild(btnAtualizar);
    }

    return row;
  }

  async function excluirUser(id) {
    if (confirm("Tem certeza de que deseja excluir este usuário?")) {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erro ao deletar usuário');
        }

        alert("Usuário deletado com sucesso");
        carregarUsers();

      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
        alert("Erro ao deletar usuário");
      }
    }
  }

  const closeBtnAdicionar = modalAdicionar.querySelector(".close-adicionar");
  closeBtnAdicionar.onclick = function () {
    modalAdicionar.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target === modalAdicionar) {
      modalAdicionar.style.display = "none"
    }
  }
  carregarUsers()
})