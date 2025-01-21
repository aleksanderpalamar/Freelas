# Freelas - Platform for Connecting Freelancers and Clients

<div align="center">
  <img 
    src=".github/assets/freelas.png" 
    alt="Freelas Platform" 
    style="border-radius: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 100%; width: 100%; object-fit: cover;"
  />

  <p align="center">
    <a href="README.md">Português</a> |
    <a href="README.en.md">English</a>
  </p>
</div>

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