# AI Resume Builder 🚀

Build a professional, ATS-optimized resume in minutes with the power of **Gemini 2.0 AI**. This application guides you through a multi-step process to generate a perfectly formatted resume tailored to your target role.

![AI Resume Builder](https://raw.githubusercontent.com/charles200018/ai-resume-builder/main/public/screenshot.png) *(Note: Add a real screenshot once deployed)*

## ✨ Features

- **AI-Powered Writing**: Leverages Gemini 2.0 to craft compelling bullet points and professional summaries.
- **ATS Optimized**: Automatically formats your resume to pass Applicant Tracking Systems used by top companies.
- **Guided Multi-Step Form**: Easy-to-use interface for Personal Info, Work Experience, Education, and Skills.
- **Cloud Storage**: Securely save your resumes to Supabase and access them anytime.
- **Instant PDF Export**: High-quality PDF generation using `jspdf` and `html-to-image`.
- **Modern UI**: Sleek, glassmorphic design featuring dark mode and smooth animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **AI Integration**: [OpenRouter](https://openrouter.ai/) (Gemini 2.0 Flash)
- **Forms**: `react-hook-form` + `zod`
- **Icons**: `lucide-react`
- **PDF Generation**: `jspdf`, `html-to-image`, `react-to-print`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm
- A Supabase account
- An OpenRouter API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/charles200018/ai-resume-builder.git
   cd ai-resume-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment variables**:
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENROUTER_API_KEY=your_openrouter_api_key
   ```

4. **Initialize Database**:
   Run the provided schema in your Supabase SQL editor (see `setup_schema.sql` if available locally).

5. **Run the development server**:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `app/`: Next.js pages and layouts.
- `components/`: Reusable UI components (Builder steps, Resume templates).
- `actions/`: Server actions for AI generation and DB operations.
- `lib/`: Configuration for Supabase, OpenRouter, and utility functions.
- `types/`: TypeScript interfaces/types.

## 📜 License

Distributed under the ISC License. See `package.json` for details.

---
Built with ❤️ by [Charles](https://github.com/charles200018)
