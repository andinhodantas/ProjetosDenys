const hostUrl = window.location.href
const host = hostUrl.split("//")[1]
const ip = host.split(":")[0]
const urlApi = `http://` + ip + ":3000/api/dados"

function cadastrarClientes(event) {
    obterNomeClientes()
    event.preventDefault(); 

    var nome = document.getElementById("nome").value;
    var telefone = document.getElementById("telefone").value;
    var email = document.getElementById("Email").value;

    var data = {
        nome: nome,
        email: email,
        telefone: telefone
    };

    fetch(urlApi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        
       
        console.log('Cliente cadastrado com sucesso:', data);
        
            })

    .catch((error) => {
        console.error('Erro ao cadastrar o Cliente:', error);
    });
    obterNomeClientes()
    }

    function obterNomeClientes() {
        fetch(urlApi, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    .then(response => response.json())
        
       
    .then(data => {
            console.log('Clientes obtidos com sucesso:', data);
            listaClientes2.innerHTML = ''
            data.forEach(itens => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${itens.nome}</span>
                `;
                listaclientes2.appendChild(li);
                
            });
        })
    .catch((error) => {
            console.error('Erro ao obter os clientes:', error);
        });

    }
obterNomeClientes()