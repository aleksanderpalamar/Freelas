# Freelas - Plataforma de Conexão entre Freelancers e Clientes

<div align="center">
  <img 
    src=".github/assets/cover.png" 
    alt="Freelas Platform" 
    style="border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100%; width: 100%; object-fit: cover;"
  />

  <p align="center">
    <a href="README.md">Português</a> |
    <a href="README.en.md">English</a>
  </p>
</div>

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
2. Crie uma branch para sua feature (`git checkout -b feature/NewFeature`)
3. Commit suas mudanças (`git commit -m 'Add some NewFeature'`)
4. Push para a branch (`git push origin feature/NewFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Contato

[Aleksander Palamar](https://aleksanderpalamar.dev)

Link do Projeto: [https://github.com/aleksanderpalamar/Freelas](https://github.com/aleksanderpalamar/Freelas)
