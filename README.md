This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Architecture Notes
- We are generally using a repository, integration, service, and domain approach. Business logic should be defined in these directories and initialized there. Definitions for each of these should be defined in the defintiions directory.  This allows us to swap out and rewrite bits and peices of the application as necessary.  e.g. someone wants to use typeorm they can write the repositories the expose the same methods and we don't have to rework any of the application pages... you get the idea.

### Defintions
- Defintions: Typescript interfaces and types that define the data structures, methods, and specific responses.  
- Repositories: database table connections, getters, setters etc.
- Integrations: vendor specific wrappers.  e.g. an email integration that is intialized with an email provider like sendgrid.
- Services: grouped logic that might be used across domains. e.g. a notifier service that uses the email integration and a slack integration
- Domains: logic grouped by related functionality.  e.g. an Auth domain might contain all the logic for managing authentication and authorization.

## Environment
- You must provide environmental variables in a .env.  Refer to the .env.example for the required variables.