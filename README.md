# Freelas - Platform for Connecting Freelancers and Clients

<div align="center">
  <img 
    src=".github/assets/cover.png" 
    alt="Freelas Platform" 
    style="border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100%; width: 100%; object-fit: cover;"
  />

  <p align="center">
    <a href="#português">Português</a> |
    <a href="#english">English</a>
  </p>
</div>

---

<div id="english">

# 🌎 English

## About The Project

Freelas is a modern web platform designed to connect talented freelancers with clients seeking professional services. This application provides an intuitive and secure environment where freelancers can showcase their skills and clients can find the best professionals for their projects.

### Key Features

- User authentication (login/register)
- Customized profiles for freelancers and clients
- Project and proposal management dashboard
- Project/freelancer search and filtering system
- Direct communication between clients and freelancers
- Rating and feedback system

## Technologies Used

The Freelas project was built using the following technologies and frameworks:

- **Next.js 15.1.4** with **App Router**: React framework for hybrid and static rendering
- **React**: JavaScript library for building user interfaces
- **TypeScript**: JavaScript superset that adds static typing
- **Tailwind CSS**: Utility-first CSS framework for rapid design
- **Shadcn/ui**: Reusable UI components library
- **Prisma ORM**: Modern ORM for Node.js and TypeScript
- **PostgreSQL**: Relational database management system
- **NextAuth.js**: Authentication solution for Next.js

## Project Structure

```
freelas/
├── app/                    # Main application directory (App Router)
│   ├── (private)/         # Private routes (require authentication)
│   ├── api/               # API endpoints
│   └── layout.tsx         # Main application layout
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
├── prisma/               # Prisma configurations and schemas
├── provider/             # Context providers
├── public/               # Static files
└── types/                # TypeScript type definitions
```

## Development Environment Setup

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL
- NPM or Yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aleksanderpalamar/freelas.git
cd freelas
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your variables in the `.env` file:
```env
#Database
DATABASE_URL=postgresql://your-user:password@localhost:5432/freelas_db

#NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

#Google Provider
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

5. Run database migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Available Scripts

- `npm run dev`: Starts development server
- `npm run build`: Generates production build
- `npm run start`: Starts production server
- `npm run lint`: Runs linting checks
- `npm run prisma:studio`: Opens Prisma Studio for database management

## Database Structure

The project uses Prisma as ORM with PostgreSQL. Main models include:

- User
- Profile
- Project
- Proposal
- Review

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/NewFeature`)
3. Commit your changes (`git commit -m 'Add some NewFeature'`)
4. Push to the branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

[Aleksander Palamar](https://aleksanderpalamar.dev)

Project Link: [https://github.com/aleksanderpalamar/Freelas](https://github.com/aleksanderpalamar/Freelas)

</div>

---

<div id="português">

# 🇧🇷 Português

## Sobre o Projeto

Freelas é uma plataforma web moderna desenvolvida para conectar freelancers talentosos com clientes em busca de serviços profissionais. Esta aplicação oferece um ambiente intuitivo e seguro para que freelancers possam mostrar suas habilidades e clientes possam encontrar os melhores profissionais para seus projetos.

### Principais Funcionalidades

- Autenticação de usuários (login/registro)
- Perfis personalizados para freelancers e clientes
- Dashboard para gerenciamento de projetos e propostas
- Sistema de busca e filtragem de projetos/freelancers
- Comunicação direta entre clientes e freelancers
- Sistema de avaliações e feedback

## Tecnologias Utilizadas

O projeto Freelas foi construído utilizando as seguintes tecnologias e frameworks:

- **Next.js 15.1.4** com **App Router**: Framework React para renderização híbrida e estática
- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática
- **Tailwind CSS**: Framework CSS utilitário para design rápido e responsivo
- **Shadcn/ui**: Biblioteca de componentes UI reutilizáveis
- **Prisma ORM**: ORM moderno para Node.js e TypeScript
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional
- **NextAuth.js**: Solução de autenticação para Next.js

## Estrutura do Projeto

```
freelas/
├── app/                    # Diretório principal da aplicação (App Router)
│   ├── (private)/         # Rotas privadas (requerem autenticação)
│   ├── api/               # Endpoints da API
│   └── layout.tsx         # Layout principal da aplicação
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
├── prisma/               # Configurações do Prisma e schemas
├── provider/             # Provedores de contexto
├── public/               # Arquivos estáticos
└── types/                # Definições de tipos TypeScript
```

## Configuração do Ambiente de Desenvolvimento

### Pré-requisitos

- Node.js 18.x ou superior
- PostgreSQL
- NPM ou Yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/aleksanderpalamar/freelas.git
cd freelas
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Configure suas variáveis no arquivo `.env`:
```env
#Database
DATABASE_URL=postgresql://seu-usuario:senha@localhost:5432/freelas_db

#NextAuth
NEXTAUTH_SECRET=sua-chave-secreta
NEXTAUTH_URL=http://localhost:3000

#Google Provider
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

5. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

6. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Gera a build de produção
- `npm run start`: Inicia o servidor de produção
- `npm run lint`: Executa a verificação de linting
- `npm run prisma:studio`: Abre o Prisma Studio para gerenciamento do banco de dados

## Estrutura do Banco de Dados

O projeto utiliza Prisma como ORM com PostgreSQL. Os principais modelos incluem:

- User (Usuários)
- Profile (Perfis)
- Project (Projetos)
- Proposal (Propostas)
- Review (Avaliações)

## Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add some NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Contato

[Aleksander Palamar](https://aleksanderpalamar.dev)

Link do Projeto: [https://github.com/aleksanderpalamar/Freelas](https://github.com/aleksanderpalamar/Freelas)

</div>
