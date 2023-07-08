<div align="center">
  <h1>Rentnow Rest API</h1>
</div>


## **:rocket: Objetivo**

O projeto tem como finalidade colocar em prática o conteúdo aprendido durante a disciplina de Frameworks Back-end do curso superior de Sistemas para Internet do IFSUL Campus Charqueadas

## **🛠️ Workspace do Postman**


[Postman](https://www.postman.com/science-engineer-79052546/workspace/frameworksbackend/request/22839500-5a4079f9-bbfb-4938-968e-fe51032daaa4)


## **:computer: Tecnologias**

  - **Node.js - Javascript**
  - **Typescript - Superset do JS**
  - **Prisma - ORM para JS**
  - **Express - Framework**
  - **SQLite - Banco de dados relacional**
  - **JWT - Token de autenticação**

## **⚡Executando o projeto em ambiente de Desenvolvimento**

### Pré-requisitos

- Node.js instalado na sua máquina
- Postman ou Insomnia para realizar as requisições na API

### Instalação

Siga as etapas seguintes para instalar e executar o projeto:

1. Clone o repositório

   ```sh
   git clone https://github.com/rafaelst2000/rentnow-backend.git
   ```
2. Acesse o projeto e instale as dependências:

   ```sh
   npm install
   ```
   
3. Inicialize o Prisma:

   ```sh
   npx prisma generate
   ```
   
4. Execute o projeto em servidor de desenvolvimento:

   ```sh
   npm run dev
   ``` 
   
5. Enjoy! =D

   ```sh
   abra seu app para teste de API e crie as requisições abaixo a partir da localhost:3333.
   ``` 
   <br>
   
   
## **🛣️ Rotas e parâmetros**

# 1. /users

   ```sh
    GET: lista todos usuários disponíveis
       - sem parâmetros -
      
    GET: :id lista o usuário com o respectivo id
       - route params -
         id
         
    POST: cria um usuário
       - body - 
       {
          "name": "seu nome",
          "email": "seu@email.com",
          "password": "sua-senha",
       }
       
    
    PUT: REQUER AUTENTICAÇÃO | edita o usuário autenticado
        - body - 
       {
          "name": "seu nome editado",
          "email": "seu@email.com",
          "password": "sua-senha",
       }
       
       - authorization: seu token
       
    DELETE: REQUER AUTENTICAÇÃO | deleta o usuário autenticado
     - authorization: seu token
   ```
 # 2. /sessions

 ```sh
  POST: faz o login do usuário, retornando seu token de autenticação
     - body - 
     {
        "email": "seu@email.com",
        "password": "sua-senha",
     }
 ```

# 3. /motorcycles 
  -> Todas rotas aqui requerem um token de autenticação
   - authorization: seu token

   ```sh
    GET: lista todos as motos disponíveis
      
    GET: ?brand= lista todas motocicletas filtradas por uma marca
       - query params -
        brand: string

    GET: ?myMotorcycles=true lista todas motos alugadas pelo usuário autenticado
       - query params -
        myMotorcycles: boolean
         
    POST: cadastra uma motocicleta
       - body - 
       {
      	"name": "Moto teste",
      	"brand": "Yamaha",
      	"displacement": "850",
      	"rate": 4.3,
      	"price": 100,
      	"image": "moto_yamaha1",
      	"cv": "1000",
      	"weigth": "200",
      	"fuel": 18.4,
      	"location": "São Jeo",
      	"description": "Moto topzera"
      }
       
    PUT: :id aluga a motocicleta para o usuário autenticado
       - route params -
         id
       
    DELETE: :id deleta a motocicleta
       - route params -
         id
   ```
 
 <div align="center">
  Made by <a href="https://www.linkedin.com/in/rafaelst2000/" target="_blank">Rafael Trevisan</a>
 </div>

<!-- Badges -->

[node_version_badge]: https://img.shields.io/badge/Node-12.20.0-green

[yarn_version_badge]: https://img.shields.io/badge/Yarn-1.22.17-red

[vue_badge]: https://img.shields.io/badge/Web-VueJS-green

[server_firebase_badge]: https://img.shields.io/badge/Server-Firebase-important

[pinia_badge]: https://img.shields.io/badge/Store-Pinia-yellow

[vite_badge]: https://img.shields.io/badge/Bundle-Vite-purple
