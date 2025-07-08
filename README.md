# Mart Supply Pulse

A modern, internal tool for associates to monitor, analyze, and act on supply chain and store operations, inspired by Walmart's digital experience.

---

## 🚀 Features

- **Secure Associate Login**  
  Responsive, accessible login page with animated transitions and session management.

- **Dashboard**  
  - KPI strip for real-time metrics  
  - In-store traffic heatmap  
  - Quick links and associate actions

- **Forecast Zones**  
  - Weather, CPI, congestion, and AI-driven action plans  
  - Quick jump navigation  
  - Responsive cards and accordions

- **Social Pulse**  
  - Reddit, Twitter, Instagram trend analysis  
  - AI recommendations  
  - Accessible, visually engaging charts

- **Smart Substitutions**  
  - SKU affinity network (graph)  
  - Smart bundle suggestions  
  - Swap success rates  
  - AI-powered recommendations

- **Associate Feedback Cockpit**  
  - Mood form with emoji scale  
  - Gamified achievements  
  - Explainable AI chat for assignment transparency

- **Modern UI/UX**  
  - Walmart/Mart branding  
  - Tailwind CSS, shadcn-ui, and Framer Motion for smooth transitions  
  - Fully responsive and accessible

---

## 🛠️ Tech Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn-ui](https://ui.shadcn.com/) for accessible UI components
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Query](https://tanstack.com/query/latest) for data management
- [Lucide Icons](https://lucide.dev/) for iconography

---

## 🖥️ Local Development

1. **Clone the repository:**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open in your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 🔒 Authentication

- Associates must log in to access the dashboard.
- Credentials are not validated against a real backend (demo only).
- Session is stored in `localStorage` or `sessionStorage` for demo purposes.

---

## 🧑‍💻 Project Structure

```
src/
  components/
    ui/
      AssociateFeedbackView.tsx
      AssociateMoodForm.tsx
      GamificationBadgeGrid.tsx
      GenAIExplainBox.tsx
      SkuAffinityView.tsx
      SocialPulseView.tsx
      Header.tsx
    ...
  pages/
    Index.tsx
    Login.tsx
    NotFound.tsx
  App.tsx
  index.css
  ...
```

---

## 🎨 Branding

- **Colors:**  
  - Primary blue: `#0064e1`
  - Accent yellow: `#ffd600` / `#ffeb3b`
  - Soft backgrounds: `#f3f4f6`, `#e3eefd`
- **Logo:**  
  - Shopping cart icon (Lucide)
  - "Mart Supply Pulse" title

---

## 📝 Contributing

1. Fork the repo and create your branch.
2. Commit your changes.
3. Push and open a pull request.

---

## 📄 License

This project is for demonstration and internal use only.

---

## 📞 Support

For issues, use the Issues tab or contact your project admin.

---
