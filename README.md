## [Tattoo Ideas](https://www.tattooideas.io/)

Welcome to the TOK Tattoo Generator. This application allows you to generate unique tattoo designs in the style of TOK. Simply input your desired message and let the application do the rest.

This project is a Next.js application that uses machine learning to generate tattoo designs in the style of TOK. Users can input a message, and the application will generate a unique tattoo design based on that message. The application uses the [Replicate API](https://replicate.com/) for machine learning predictions and [Vercel's KV](https://vercel.com/docs/storage/vercel-kv) storage for data persistence.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. Tailwind CSS is a utility-first CSS framework that is highly customizable and allows for efficient styling of components.

The application also uses [Shadcn](https://shadcn.com/) for creating dynamic and interactive user interfaces. Shadcn is a lightweight and flexible library that helps in building complex user interfaces.


## Machine Learning Model

This application uses a machine learning model hosted on [Replicate](https://replicate.com/dokeet/yomico-art-tattoo). The model is trained to generate tattoo designs in the style of TOK. It takes a user's input message and generates a unique tattoo design based on that message.


## Getting Started
First, clone the repository:

Install the dependencies:

```bash
npm install
```

Next, create a `.env.local` file in the root directory and add the following environment variables:

```bash
REPLICATE_API_TOKEN=your_replicate_api_token
KV_URL=your_kv_url
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_kv_rest_api_read_only_token
```

Replace `your_replicate_api_token`, `your_kv_url`, `your_kv_rest_api_url`, `your_kv_rest_api_token`, and `your_kv_rest_api_read_only_token` with your actual values.

Now, you're ready to run the development server:


Run the development server:

```bash
bun run dev
# or
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
