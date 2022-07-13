# MB-LABS Desafio Técnico

Esse projeto é uma aplicação backend REST feita para gestão de eventos e venda/compra de ingressos para os mesmos. 

Com isso em mente, foi idealizada uma API focada em três diferentes pontos:
- usuário
- evento
- ingresso
## Stack utilizada

Para o projeto, as tecnologias utilizadas foram:
 - *NodeJS* com o superset *Typescript*, 
- *Express* para criação e roteamento do servidor da aplicação, 
- *Postgres* como banco de dados com o ORM *Prisma* para criação dos CRUD's necessários, 
- *Nodemailer* para comunicação de eventos,
- *Stripe* como simulador de serviço de pagamento. 
Foram criadas imagens e containers dos serviços utilizando *Docker*, onde os mesmos já constam em deploy.

## Documentação da API

### Usuário 

#### Cria um usuário para acesso

``
    http
    POST /users
``

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | *Obrigatório*. Nome do usuário |
| `password` | `string` | *Obrigatório*. Senha do usuário com min. 6 letras ou números |
| `email` | `string` | *Obrigatório*. Email do usuário |

#### Realiza o login de um usuário

``
    http
    POST /sign-in
``

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `password` | `string` | *Obrigatório*. Senha do usuário com min. 6 letras ou números |
| `email` | `string` | *Obrigatório*. Email do usuário |

#### Retorna todos os usuarios
``
    http
    GET /users
``

#### Retorna um usuário específico - **Rota autenticada**

``
    http
    GET /users/:id
``

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | *Obrigatório*. O ID do usuário que você quer |

#### Edita um usuário específico - **Rota autenticada**
``
    http
    PUT /users/:id
``

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | *Opcional*. Nome do usuário |
| `password` | `string` | *Opcional*. Senha do usuário com min. 6 letras ou números |
| `email` | `string` | *Opcional*. Email do usuário |
| `id`      | `number` | *Obrigatório*. O ID do usuário que você quer |


### Evento 

#### Cria um evento - **Rota autenticada**
``
    http
    POST /events
``

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | *Obrigatório*. Nome do evento |
| `description` | `string` | *Obrigatório*. Descrição do evento |
| `date` | `Date` | *Obrigatório*. Data do evento |
| `location` | `string` | *Obrigatório*. Endereço fisico ou URL do evento |
| `price` | `number` | *Obrigatório*. Preço de cada ingresso do evento |
| `ticket_qty` | `number` | *Obrigatório*. Quantidade de ingressos disponiveis para o evento |
| `image` | `string` | *Obrigatório*. URL de imagem ilustrativa do evento |

#### Atualiza um evento específico - **Rota autenticada**
``
    http
    PUT /events/:id
``

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | *Opcional*. Nome do evento |
| `description` | `string` | *Opcional*. Descrição do evento |
| `date` | `Date` | *Opcional*. Data do evento |
| `location` | `string` | *Opcional*. Endereço fisico ou URL do evento |
| `price` | `number` | *Opcional*. Preço de cada ingresso do evento |
| `ticket_qty` | `number` | *Opcional*. Quantidade de ingressos disponiveis para o evento |
| `image` | `string` | *Opcional*. URL de imagem ilustrativa do evento |
| `id` | `number` | *Obrigatório*. id do evento |

#### Retorna todos os eventos do usuario logado - ** Rota autenticada **

``
    http
    GET /events/user
``

#### Retorna todos os eventos disponiveis 

``
    http
    GET /events
``

#### Retorna um evento específico

``
    http
    GET /events/:id
``


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | *Obrigatório*. O ID do evento que você quer |

#### Deleta um evento específico - ** Rota autenticada **

``
    http
    DELETE /events/:id
``

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | *Obrigatório*. O ID do evento que você quer |


### Ingresso 

#### Processo de compra de um ingresso - **Rota autenticada**
``
    http
    POST /tickets
``

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `qty` | `number` | *Obrigatório*. Quantidade de ingressos a ser comprados |
| `event_id` | `number` | *Obrigatório*. ID do evento que você quer |

#### Retorna os dados de um ingresso - **Rota autenticada**
``
    http
    GET /ticket
``

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `code` | `string` | *Obrigatório*. Código do ingresso comprado |

#### Retorna todos os ingressos do usuario logado - **Rota autenticada**
``
    http
    GET /tickets/user
``

## Instalação

Caso queira executar a aplicação localmente, siga os passos abaixo.

1. Faça um clone:

SSH
```sh
  $ git clone git@github.com:neaar3/mblabs-desafio.git
```

HTTPS
```sh
  $ git clone https://github.com/neaar3/mblabs-desafio.git
```

2. Entre na pasta da aplicação:

  - Crie um arquivo ``.env`` na raiz do projeto.
  - Copie o conteúdo do arquivo .env.example e cole no seu arquivo ``.env``

3. Adicione as chaves de acesso no ``.env``:

  O seu .env deve ser parecido com isso: 
  ```ts
    POSTGRES_HOST=localhost
    POSTGRES_PORT=5432
    POSTGRES_USER=usuario_postgres
    POSTGRES_PASSWORD=sua_senha
    POSTGRES_DB=mblabs
    JWT_SECRET=secret
    DATABASE_URL=postgres://usuario_postgres:sua_senha@localhost:5432/mblabs?schema=public
    PORT=8080
    MAILTRAP_USERNAME=username_mailtrap
    MAILTRAP_PASSWORD=password_mailtrap
    MAILTRAP_HOST=host_mailtrap
    MAILTRAP_PORT=porta_mailtrap
    STRIPE_SECRET_KEY=stripe_secret_key
    APP_URL=http://localhost:8080
  ```
4. Execute os comandos para iniciar a aplicação:
```sh
  # Instale as dependências
  npm install
```
```sh
  # Inicie o prisma e suas migrations
  npx prisma generate
  npx prisma migrate dev
```
```sh
  # Inicie a API
  npm run dev
```

Assim que a messagem ``Server is listening on port 8080.`` aparecer em seu terminal, você ja pode fazer suas requisições na rota ``http://localhost:8080/``.

---
<h4 align="center">
    Feito por <a href="https://www.linkedin.com/in/iago-tostes/" target="_blank">Iago Tostes</a>
</h4>
