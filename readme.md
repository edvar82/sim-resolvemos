## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/): É necessário para executar o servidor.
- [MySQL](https://www.mysql.com/): Banco de dados para armazenar as notícias.

## Configuração

1. Clone este repositório para sua máquina;
2. Instale as dependências do projeto com o comando `npm install`;
3. No seu workbench do MySQL, crie um novo schema com o nome `nodemysql`;
   Obs: Caso obtenha algum erro de `Client does not support authentication protocol requested by server; consider upgrading MySQL client`, faça os seguintes passos:
   1. Execute o seguinte query no MYSQL Workbench:
      `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';`
      Caso nao consiga execute sem o `@'localhost'`
   2. Logo em seguida, execute a seguinte query: `flush privileges;`
4. Execute o script `Site.sql` para criar as tabela;
5. Inicie a aplicação com o comando `npm start`;
6. Acesse a aplicação em `http://localhost:3000/index.html`.
7. Para enviar alguma notícia, acesse `http://localhost:3000/write` e crie uma nova notícia.
8. Para visualizar as notícias, acesse `http://localhost:3000/noticias`.
9. Para criar uma reserva, acesse `http://localhost:3000/reserva` e crie uma nova reserva; Caso a reserva seja efetuada você será redirecionado para a página de sucesso `http://localhost:3000/confirma_reserva.html`, mostrando a confirmação da reserva.
