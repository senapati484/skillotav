# SkillTav 🔗

A decentralized platform connecting talent with opportunities through verified skill tokens. SkillChain revolutionizes recruitment by tokenizing professional credentials and enabling trust-based hiring through blockchain verification.

## Demo & Presentation 🎥

### Demo Walkthrough
<div align="center">
  <a href="https://youtu.be/Kq7hVWKGjlQ">
    <img src="https://img.youtube.com/vi/Kq7hVWKGjlQ/maxresdefault.jpg" alt="Demo Video" width="600">
  </a>
  <p>▶️ Watch Demo: <a href="https://youtu.be/Kq7hVWKGjlQ">https://youtu.be/Kq7hVWKGjlQ</a></p>
</div>

### Project Presentation
<div align="center">
  <a href="https://youtu.be/e_tmNxhQifk">
    <img src="https://img.youtube.com/vi/e_tmNxhQifk/maxresdefault.jpg" alt="Presentation Video" width="600">
  </a>
  <p>▶️ Watch Presentation: <a href="https://youtu.be/e_tmNxhQifk">https://youtu.be/e_tmNxhQifk</a></p>
</div>

## Tech Stack 🛠️

- **Frontend**: Next.js 14, React, TailwindCSS
- **Styling**: Shadcn/ui components, Custom animations
- **Authentication**: Firebase Auth
- **Database**: Firebase Realtime Database
- **Blockchain**: Ethereum (MetaMask integration)
- **State Management**: React Context
- **Fonts**: Clash Display, Satoshi

## Key Features 🌟

- **Skill Tokenization**: Convert professional credentials into verifiable tokens
- **Smart Matching**: AI-powered job matching based on token compatibility
- **Blockchain Verification**: Immutable proof of credentials
- **Interactive Dashboard**: Real-time tracking of applications and opportunities
- **Profile Analysis**: Resume and GitHub integration for comprehensive skill assessment

## Project Structure 📁

```
src/
├── app/                    # Next.js app router
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── candidate/         # Candidate dashboard & features
│   └── recruiter/         # Recruiter dashboard & features
├── components/            # Reusable React components
│   ├── provider/         # Context providers
│   └── ui/               # UI components
└── lib/                  # Utilities and configurations
    ├── ai.js             # AI integration
    ├── firebase.js       # Firebase setup
    └── utils.js          # Helper functions
```

## Getting Started 🚀

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=your_database_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development 👨‍💻

- Pages auto-update as you edit
- Uses Next.js App Router for optimal performance
- Implements best practices for Web3 integration
- Responsive design for all devices

## Learn More 📚

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Ethereum Web3 Documentation](https://web3js.readthedocs.io/)

## Deploy 🚀

Deploy easily using [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), the platform from the creators of Next.js.

## Contributing 🤝

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.
