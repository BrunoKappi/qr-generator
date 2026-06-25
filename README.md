<div align="center">
  <img src="https://cdn.bkappi.com/ProjectsAssets/BkappiGeneral/bkappiIcon.ico" alt="Bkappi Icon" width="80" height="80">
  
  # Bkappi QR Code Studio

  **A Professional, High-Definition, and Highly Customizable Offline-First QR Code Generator**

  <p align="center">
    <a href="#-key-features">Features</a> •
    <a href="#-how-to-use">How To Use</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-quick-start">Quick Start</a>
  </p>
</div>

---

![Bkappi QR Studio - Home Page](https://cdn.bkappi.com/ProjectsAssets/QRCodeGenerator/GithubReadmeAssets/HomePage.png)

## 🚀 Key Features

Bkappi QR Code Studio is engineered with advanced safeguards and premium customization features, enabling you to craft technically valid, elegant, and highly scan-compliant QR Codes in seconds.

### 🧠 1. Intelligent Autodetect Input Engine
The generator synthetically parses input values in real-time. It automatically identifies and formats inputs for:
- 🌐 **URL / Link**: Standard website routing.
- 📶 **Wi-Fi Network**: Connection parameters (SSID, Password, Security).
- ✉️ **E-mail**: Mailto links with custom template support.
- 📞 **Phone**: Direct-dial protocols.
- 💬 **SMS Message**: Prefilled mobile target numbers with customized message bodies.
- 📝 **Plain Text**: General-purpose arbitrary text data.

### 🛡️ 2. Physical Capacity Validation Guard
- **Error Correction Levels (ECC)**: Fully configurable levels (`L ~ 7%`, `M ~ 15%`, `Q ~ 25%`, `H ~ 30%` restoration rate).
- **Visual Capacity Monitor**: Real-time percentage bar to warn about visual density hazards.
- **Physical Safety Alerts**: Flags high-density points to ensure reliable scanning on older devices.

### 🎨 3. Elite Customization & Brand Styling Suite
- **Matrix Shapes**: Customize dots (`Standard`, `Rounded`, `Classy`, `Outpoints`, `Classy-Inverted`).
- **Independent Eye Configuration**: Separately adjust outer corner borders (`Eye Frames`) and inner core indicators (`Eye Balls`).
- **Vibrant Color Gradients**: Sharp solid colors or gorgeous dual-gradient colors.
- **Brand Logo Overlays**: Upload custom SVG, PNG, or JPEG logos with an optional **Safe Zone** toggler to remove background dots around the logo for perfect focus.

### 🖼️ 4. Multi-Format High Definition Exporting
- **Ultra High-Definition Scalers**: Exporters supporting up to `4096 x 4096 px`.
- **Vector Formats**: Download `.svg` files or print-ready vector `.pdf`.
- **Raster Formats**: Download `.png` or compressed `.jpg` files.
- **Live Sharing & Clipboard**: Native clipboard buffers to copy high-definition frames directly.

### 🗄️ 5. History & Favorite Templates
- **Curated Galleries**: Modern, pre-tuned templates (Classic Slate, Stripe Indigo, Neon Cyber, etc.).
- **Persistent Local Database**: Local history logger to track and manage generated designs with 100% privacy.
- **Favorites Ledger**: Bookmark your favorite styles for recurring generations.

### 🌍 6. Tri-lingual Internationalization
Complete localized application translations operating in:
- 🇺🇸 **English (en)**
- 🇧🇷 **Português (pt-BR)**
- 🇪🇸 **Español (es)**

---

## 🎯 How to Use

1. **Input Your Content**
   Type or paste your destination link, Wi-Fi config, email, or any supported format into the main input field. The app will instantly identify the data format and configure the engine.

2. **Customize Your Design**
   Click the generator action button to open the **Premium Customizer**.
   - **Templates**: Apply a quick, professionally curated template.
   - **Colors**: Set a solid color, gradient, or use a palette swatch.
   - **Matrix & Eyes**: Select specialized patterns for your code's dots and eyes.
   - **Logo**: Upload your brand badge and toggle the Safe Zone for clarity.

3. **Export & Print**
   Head to the export options panel, choose your output format (PNG, JPEG, SVG, or PDF) and resolution (up to 4K), then click download or copy to your clipboard!

---

## 🛠️ Tech Stack & Architecture

- **Core**: React 18+ with TypeScript & Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion (`motion/react`)
- **Icons**: Lucide React
- **Privacy**: Works 100% locally with absolute data privacy (no telemetry or cloud syncs).

---

## 📦 Quick Start & Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Installation & Running

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Boot the local development environment:**
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173` to interact with the app.

### Production Build
To bundle and prepare fully optimized static assets:
```bash
npm run build
```
This writes the compiled production assets into the `/dist` output directory.

<br/>

<div align="center">
  <sub>Built with ❤️ by <a href="https://myportfolio.bkappi.com/">Bruno Kappi</a></sub>
</div>
