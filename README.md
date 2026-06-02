# ecommerce-case

Projeto fullstack de e-commerce desenvolvido com Node.js/Express no backend e Next.js no frontend.

## Requisitos

- Node.js
- npm

## Como executar em localhost

É necessário iniciar o backend e o frontend em terminais separados.

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

A API ficará disponível em:

```txt
http://localhost:8000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em:

```txt
http://localhost:3000
```

## Endpoints da API

### Produtos

```http
GET /api/produtos
```

Retorna a lista de produtos disponíveis.

### Carrinho

```http
POST /api/carrinho
```

Adiciona um produto ao carrinho.

```http
PUT /api/carrinho
```

Atualiza a quantidade de um item ou remove o item do carrinho.

```http
GET /api/carrinho
```

Retorna os itens atualmente presentes no carrinho.

### Checkout

```http
POST /api/finalizar-compra
```

Finaliza a compra, registra o pedido no banco de dados e envia um e-mail de confirmação.
