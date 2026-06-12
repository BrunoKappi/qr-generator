# 🎯 **Bkappi QR Code Studio — Premium Offline Generator**

A professional, high-definition, and highly customizable offline-first QR Code generation platform. Designed with a clean aesthetic and engineered with advanced physical capability safeguards, it enables users to craft technically valid, elegant, and highly scan-compliant QR Codes in minutes.

---

## ✨ **Visual Preview**

### 🌓 **Responsive Theme Variations**

| Dark Theme Preview | Light Theme Preview |
| :-: | :-: |
| ![Bkappi QR Studio - Dark Theme](https://cdn.bkappi.com/GithubReadmeAssets/QR-Generator/HomePageDarkTheme.png) | ![Bkappi QR Studio - Light Theme](https://cdn.bkappi.com/GithubReadmeAssets/QR-Generator/HomePageLightTheme.png) |

### 🎨 **Customization & Templates**

| Premium Export & Custom Options | Professional Pre-configured Templates |
| :-: | :-: |
| ![Premium QR Generation](https://cdn.bkappi.com/GithubReadmeAssets/QR-Generator/QrCodeExampleGenerated.png) | ![Templates Gallery](https://cdn.bkappi.com/GithubReadmeAssets/QR-Generator/QrCodeTemplatesExamples.png) |

---

## 🚀 **Key Features**

### 🧠 **1. Intelligent Autodetect Input Engine**

- **Type Classification on-the-fly:** Synthetically parses input values in real-time.
- **Support for Standard Formats:** Automatically identifies and formats inputs for:
  - 🌐 _URL / Link_: Standard website web routing.
  - 📶 _Wi-Fi Network_: Connection parameters (SSID, Password, Security type: WPA/WEP/None).
  - ✉️ _E-mail_: Mailto links with custom template support (To, Subject, Body).
  - 📞 _Phone_: Direct-dial international protocols.
  - 💬 _SMS Message_: Prefilled mobile target numbers with customized message bodies.
  - 📝 _Plain Text_: General-purpose arbitrary text data.
- **Immediate Input Validation:** Disables action triggers if fields are blank, hiding clean states and retaining pristine layouts.

### 🛡️ **2. Physical Capacity Validation Guard**

- **Error Correction Levels (ECC):** Fully configurable levels (`L ~ 7%`, `M ~ 15%`, `Q ~ 25%`, `H ~ 30%` restoration rate) to maintain scannability with customized foregrounds.
- **Visual Capacity Monitor:** Real-time visual capacity percentage bar to warn developers/users about visual density hazards.
- **Physical Safety Alerts:** Flags high-density points that might fail on older phone cameras, ensuring highly reliable physical print assets.

### 🎨 **3. Elite Customization & Brand Styling Suite**

- **Dots & Matrix Shapes:** Choose from custom modular shapes (`Standard Dots`, `Rounded`, `Classy`, `Extra Rounded`, `Outpoints`, `Classy-Inverted`).
- **Independent Eye Configuration:** Separately adjust outer corner borders (`Eye Frames`) and inner core indicators (`Eye Balls`) with multiple shapes.
- **Vibrant Color Gradients:** Configure sharp solid colors or gorgeous dual-gradient colors (Horizontal or Vertical transitions).
- **Brand Logo Overlays:** Upload custom SVG, PNG, or JPEG brand logos with customizable size parameters, rotation options, and an optional **Safe Zone** toggler (removes dots behind your logo overlay to ensure reliable focus).

### 🖼️ **4. Multi-Format High Definition Exporting**

- **Isolated Export Workspace:** Dedicated modal view specializing in design checks and formats.
- **Ultra High-Definition Scalers:** Exporters supporting up to `4096 x 4096 px` render capabilities to ensure pristine, razor-sharp physical prints.
- **Vector & Raster Layout Sheets:**
  - 📐 **Vector formats:** Download vector `.svg` files or print-ready vector `.pdf` templates.
  - 🖼️ **Raster images:** Download high-contrast `.png` or compressed `.jpg` files.
- **Universal Copy & Live Sharing:** Native clipboard buffers to copy high-definition image frames directly to paste elsewhere, alongside quick device sharing.

### 🗄️ **5. Past History & Favorite Templates**

- **Curated Galleries:** Comes with modern, professionally tuned templates (Classic Slate, Stripe Indigo, Neon Cyber, Vercel Dark, Sunset Glow, Emerald Green, Royal Gold, Midnight Purple).
- **Persistent Local Database:** Local history logger to track and manage generated QR designs with absolute client-side security.
- **Favorites Ledger:** Bookmarks and organizes favorite structures for instant access and recurring generations.

### 🌍 **6. Tri-lingual Internationalization**

- Complete localized app translations operating under:
  - 🇺🇸 **English (en)**
  - 🇧🇷 **Português (pt-BR)**
  - 🇪🇸 **Español (es)**

---

## 🎯 **How to Use**

1. **Input Your Content**:
   - Type or paste your destination link, Wi-Fi configuration details, email address, sms content, phone number, or short text message in the main raw input field.
   - The app instantly identifies the data format, analyzes its scan density, and configures the generator.

2. **Customize Your Design**:
   - Click the generator action button to open the **Premium QR Code Customizer**.
   - **Templates**: Apply a quick template from our design collection for a cohesive look.
   - **Colors**: Set a solid color or gradient, or use a palette swatch.
   - **Matrix & Eyes**: Select specialized patterns for your code's dots, eye frames, and eyeballs.
   - **Brand Logo**: Upload your corporate badge, rotate it, adjust its size, and toggle the background Safe Zone to prevent dots from interfering with your logo.

3. **Export & Print**:
   - Head over to the export options panel.
   - Choose your output format (PNG, JPEG, SVG, or PDF).
   - Select your target resolution (web-optimal up to printing-grade 4K).
   - Click download, share, or copy the image directly to your clipboard.

---

## 📦 **Quick Start & Local Development**

### **Prerequisites**

- Node.js (v18+)
- npm

### **Installation & Running**

1. Clone or download your codebase and install local packages:

   ```bash
   npm install
   ```

2. Boot the client-side dev environment:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000` to interact with your dashboard!

### **Production Compilation**

To bundle, compile, and prepare fully optimized, production-ready static assets:

```bash
npm run build
```

This writes the compiled production assets into the `/dist` output directory.

---

## 🛠️ **Tech Stack & Visual Architecture**

- **Framework**: React 18+ with TypeScript & Vite
- **Styling Paradigm**: Utility-first styling leveraging strict **Tailwind CSS**
- **Dynamic Physics & Layout Transitions**: Seamlessly powered by **Framer Motion (`motion/react`)**
- **Icon Assets**: Sourced dynamically from **Lucide React**
- **Offline Reliability**: Works 100% locally on your machine with absolute data privacy—no commercial trackers, telemetry logging, or cloud-based database syncs.
