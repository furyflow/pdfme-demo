# PDFme Studio (React + TypeScript + Vite)

A comprehensive, production-ready React application showcasing full integration of **[pdfme](https://pdfme.com/)** (v6+), featuring the **Designer**, **Form**, and **Viewer** UI components, alongside client-side PDF generation with `@pdfme/generator` and rich schema plugins.

---

## ✨ Features

- **🎨 Visual Designer (`@pdfme/ui Designer`)**
  - Interactive canvas with drag-and-drop elements, resize handles, and alignment guides.
  - Right sidebar for element properties: font size, colors, borders, line height, alignment, barcodes, and table styles.
  - Template schema change tracking and manual template saving.

- **📝 Interactive Form (`@pdfme/ui Form`)**
  - Renders fillable form fields bound to the active template schemas.
  - Live data synchronization across Designer, Form, Viewer, and PDF generation.
  - "Sample Data" auto-fill button and "Clear Form" utilities.

- **👁️ Live Previewer (`@pdfme/ui Viewer`)**
  - High-fidelity, read-only preview of the generated document with applied data.
  - Direct PDF export action from the preview screen.

- **⚡ PDF Generator (`@pdfme/generator`)**
  - Pure client-side PDF compilation without backend dependencies.
  - Export modal featuring live iframe preview, direct `.pdf` download, or opening in a new tab.

- **🧩 Full Plugin Support (`@pdfme/schemas`)**
  - **Text & Content**: Standard `text`, `multiVariableText`
  - **Graphics & Vectors**: `image`, `svg`
  - **Shapes**: `line`, `rectangle`, `ellipse`
  - **Data Tables**: `table` with custom column widths, headers, and alternate row styles
  - **Form Controls**: `checkbox`, `radioGroup`, `select`, `date`, `time`, `dateTime`, `circleMark`
  - **1D & 2D Barcodes**: `qrcode`, `code128`, `code39`, `ean13`, `ean8`, `japanpost`, `upca`, `upce`, `pdf417`

- **📂 Pre-built Industry Templates**
  - **Modern Corporate Invoice**: Includes company header, customer billing, itemized table, totals calculation, payment QR code, and Code128 tracking barcode.
  - **Certificate of Excellence**: Elegant landscape credential with recipient title, signature lines, and authentication QR code.
  - **Event Pass / ID Badge**: Compact A6 lanyard pass with VIP speaker badge, access QR code, and ticket barcode.
  - **Blank Canvas**: Clean starter A4 template for building layouts from scratch.

- **⚙️ JSON Schema & Data Inspector**
  - View, edit, validate, copy, or download the raw JSON for both the template definition and the form input values.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm or pnpm / yarn

### Installation
Dependencies are already installed in this directory. If running elsewhere:
```bash
npm install
```

### Development Server
Run the local Vite development server:
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### Production Build
To compile TypeScript and bundle the production assets:
```bash
npm run build
```

To preview the built app locally:
```bash
npm run preview
```

---

## 📁 Project Structure

```
pdfme/
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration
├── tailwind.config.js           # Tailwind CSS theme and styles
├── postcss.config.js            # PostCSS configuration
│
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root state orchestration & tab manager
│   ├── index.css                # Base & Tailwind CSS styles
│   │
│   ├── components/
│   │   ├── Header.tsx           # Navigation tabs, template selector, export button
│   │   ├── DesignerView.tsx     # React wrapper for @pdfme/ui Designer
│   │   ├── FormView.tsx         # React wrapper for @pdfme/ui Form
│   │   ├── ViewerView.tsx       # React wrapper for @pdfme/ui Viewer
│   │   ├── TemplateSelector.tsx # Modal for switching pre-built templates
│   │   ├── JsonModal.tsx        # Raw template & input JSON inspector/editor
│   │   └── PdfExportModal.tsx   # PDF download and iframe preview modal
│   │
│   ├── pdfme/
│   │   ├── plugins.ts           # Registry of all @pdfme/schemas plugins
│   │   ├── generator.ts         # Wrapper around @pdfme/generator
│   │   └── templates/
│   │       ├── invoice.ts       # Corporate invoice template & sample data
│   │       ├── certificate.ts   # Certificate of excellence template
│   │       ├── badge.ts         # Event ID badge template
│   │       ├── blank.ts         # Blank starter canvas template
│   │       └── index.ts         # Template index & lookup helper
│   │
│   └── types/
│       └── index.ts             # TypeScript definitions
└── README.md
```

---

## 🛠️ How to Integrate pdfme in React

Here is the pattern used across this project to integrate `@pdfme/ui` components into React:

### 1. Designer Component
```tsx
import { useEffect, useRef } from 'react';
import { Designer } from '@pdfme/ui';
import { getPlugins } from './plugins';

export const MyDesigner = ({ template, onTemplateChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const designerRef = useRef<Designer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const designer = new Designer({
      domContainer: containerRef.current,
      template,
      plugins: getPlugins(),
    });

    designer.onChangeTemplate((newTemplate) => {
      onTemplateChange(newTemplate);
    });

    designerRef.current = designer;

    return () => {
      designer.destroy();
      designerRef.current = null;
    };
  }, [template]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
```

### 2. Form Component
```tsx
import { useEffect, useRef } from 'react';
import { Form } from '@pdfme/ui';
import { getPlugins } from './plugins';

export const MyForm = ({ template, inputs, onInputChange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<Form | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const form = new Form({
      domContainer: containerRef.current,
      template,
      inputs: inputs || [{}],
      plugins: getPlugins(),
    });

    form.onChangeInput(({ index, value, name }) => {
      onInputChange(index, name, value);
    });

    formRef.current = form;

    return () => {
      form.destroy();
      formRef.current = null;
    };
  }, [template]);

  useEffect(() => {
    if (formRef.current && inputs) {
      formRef.current.setInputs(inputs);
    }
  }, [inputs]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
```

### 3. Viewer Component
```tsx
import { useEffect, useRef } from 'react';
import { Viewer } from '@pdfme/ui';
import { getPlugins } from './plugins';

export const MyViewer = ({ template, inputs }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<Viewer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const viewer = new Viewer({
      domContainer: containerRef.current,
      template,
      inputs: inputs || [{}],
      plugins: getPlugins(),
    });

    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [template]);

  useEffect(() => {
    if (viewerRef.current && inputs) {
      viewerRef.current.setInputs(inputs);
    }
  }, [inputs]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};
```

### 4. PDF Generation & Download
```ts
import { generate } from '@pdfme/generator';
import { getPlugins } from './plugins';

export const generateAndDownloadPdf = async (template, inputs, filename = 'document.pdf') => {
  const pdfBytes = await generate({
    template,
    inputs: inputs || [{}],
    plugins: getPlugins(),
  });

  const blob = new Blob([pdfBytes.buffer], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
};
```

---

## 📜 License
MIT
