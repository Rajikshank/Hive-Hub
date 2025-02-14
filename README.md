<div align="center">

# Hive Hub

### Next-Generation AI-Powered Talent Acquisition Platform

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2C3440?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-13-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

</div>

## 🔮 Vision

Hive Hub is a Next.js-based job portal that leverages the power of Google Gemini Generative AI (LLM) to provide intelligent job recommendations through a Pinecone vector database, ensuring highly accurate and personalized job matches based on user profiles and preferences. The platform also features automated job description generation and ATS (Applicant Tracking System) score calculation, helping candidates assess and optimize their resumes for better job application outcomes. Built with a PostgreSQL database integrated with vector support for storing and querying embeddings, Hive Hub demonstrates the seamless integration of LangChain for LLM operations and Prisma ORM for efficient database management. This project was developed solely for educational purposes to explore advanced AI-driven solutions in recruitment technology.

## 🎯 Features

### ATS Score Calculation
![Hive Hub - Google Chrome 2_14_2025 3_10_10 PM](https://github.com/user-attachments/assets/1a919ed7-4a6a-4f1a-b366-3285563c5ce2)
*Our advanced ATS scoring system provides real-time feedback and optimization suggestions*

### Job Description Generation


https://github.com/user-attachments/assets/d59dbe68-90f5-45c5-b6af-72ca51bd0dfa


*AI-powered job description generator with industry-specific templates*

### Smart Recommendations
![Hive Hub - Google Chrome 2_14_2025 3_10_29 PM](https://github.com/user-attachments/assets/a301b0c7-483c-49ac-b86f-a09a0fe18cfc)
*Vector-based job matching system showing personalized recommendations*

## 🚀 Core Capabilities

### Advanced Resume Analysis Engine
- **Vector Token Extraction:** Proprietary algorithm for converting CV content into high-dimensional vectors
- **Semantic Matching:** Utilizes Pinecone DB's vector similarity search for precise job-candidate alignment
- **Real-time Processing:** Asynchronous processing pipeline for instantaneous results

### Intelligent ATS Optimization
- **Dynamic Scoring Algorithm:** Real-time resume evaluation against industry benchmarks
- **Keyword Intelligence:** ML-powered suggestion engine for resume optimization
- **Industry-specific Metrics:** Customized scoring parameters for different sectors

### AI-Powered Job Description Generator
- **Context-Aware Generation:** Leverages Google Gemini LLM for tailored content creation
- **Industry-Standard Templates:** Pre-configured frameworks for consistent formatting
- **Dynamic Customization:** Automated adaptation based on role requirements

 

## 🛠️ Technical Details

### Frontend 
- **Next.js 15:** Server-side rendering with advanced routing capabilities
- **shadcn Components:** Pixel-perfect UI elements with atomic design principles
- **Progressive Web App:** Optimized for cross-platform compatibility

### Backend Infrastructure
- **Prisma ORM:** Type-safe database operations with automated migrations
- **PostgreSQL:** ACID-compliant relational database for data integrity
- **Pinecone Vector DB:** Specialized vector storage for AI operations

### Security & Performance
- **Arcjet Integration:** Enterprise-grade rate limiting and threat detection
- **Auth.js:** OAuth 2.0 compliant authentication system
- **Resend:** Reliable email delivery infrastructure
- **Stripe:** PCI-compliant payment processing

## ⚙️ Development Setup

```bash
# Clone repository
git clone https://github.com/Rajikshank/Hive-Hub.git && cd hive-hub

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Add your API keys and configurations

# Launch development server
pnpm run dev
```

### Environment Configuration
```env
NEXT_PUBLIC_API_KEY=<your-api-key>
DATABASE_URL=<postgresql-connection-string>
PINECONE_API_KEY=<pinecone-api-key>
AUTH_SECRET=<auth-secret>
NEXTAUTH_URL=http://localhost:3000
STRIPE_SECRET_KEY=<stripe-secret-key>
STRIPE_WEBHOOK_SECRET=<stripe-webhook-secret>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<stripe-publishable-key>
```

## 🌐 Deployment

Access the live platform at [https://hive-hub-zeta.vercel.app/](https://hive-hub-zeta.vercel.app/)

## 📬 Connect With Me

- **GitHub:** [https://github.com/Rajikshank](https://github.com/Rajikshank)
- **Email:** [krajikshan637@gmail.com](mailto:krajikshan637@gmail.com)
- **LinkedIn:** [Krishnakumar Rajikshan](https://www.linkedin.com/in/krishnakumar-rajikshan-4853861a5/)

## 📄 License

Released under MIT License. See [LICENSE](LICENSE) for details.
