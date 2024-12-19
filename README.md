# Edu Connect

Edu Connect is a modern web application built using Next.js 14, TailwindCSS, Shadcn UI, and NextAuth v5 for authentication. It is designed to connect students, educators, and institutions seamlessly while integrating Stripe for payment functionalities.

## Features

- **Authentication**: Secure user authentication with NextAuth v5 supporting multiple providers.
- **Modern UI**: Built with TailwindCSS and Shadcn UI for a sleek and responsive interface.
- **Payment Integration**: Stripe for secure and seamless payment handling.
- **Optimized Performance**: Leveraging the latest features of Next.js 14.

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/), [Shadcn UI](https://shadcn.dev/)
- **Authentication**: [NextAuth v5](https://next-auth.js.org/)
- **Payments**: [Stripe](https://stripe.com/)

## Installation

### Prerequisites

- Node.js (>= 18)
- npm or yarn

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/edu-connect.git
   cd edu-connect
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root of your project and configure the following variables:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   STRIPE_PUBLIC_KEY=your_stripe_public_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Visit [http://localhost:3000](http://localhost:3000) to view the app.

## Contributing

Contributions are welcome! To get started:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://shadcn.dev/)
- [NextAuth](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
