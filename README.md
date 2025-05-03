# SVG to PDF Browser Extension

This project is a simple browser extension that allows users to download an example SVG as a PDF. The extension utilizes the jsPDF and svg2pdf.js libraries to perform the conversion.

## Project Structure

```
svg2pdf-extension
├── popup
│   ├── popup.html       # HTML structure for the popup interface
│   ├── popup.js         # JavaScript logic for handling PDF downloads
│   └── popup.css        # Styles for the popup interface
├── icons
│   └── icon.svg         # Icon for the browser extension
├── manifest.json        # Configuration file for the browser extension
├── libs
│   ├── jspdf.umd.min.js # Minified jsPDF library
│   └── svg2pdf.umd.min.js # Minified svg2pdf.js library
└── README.md            # Documentation for the project
```

## Installation

1. Clone this repository to your local machine.
2. Open your browser and navigate to the extensions page (e.g., `chrome://extensions` for Chrome).
3. Enable "Developer mode" (usually a toggle in the top right corner).
4. Click on "Load unpacked" and select the `svg2pdf-extension` directory.

## Usage

1. Click on the extension icon in the browser toolbar.
2. In the popup, click the "Download SVG as PDF" button.
3. The example SVG will be converted and downloaded as a PDF file.

## Libraries Used

- [jsPDF](https://github.com/parallax/jsPDF): A library for generating PDF documents in JavaScript.
- [svg2pdf.js](https://github.com/yWorks/svg2pdf.js): A library for converting SVG content to PDF format.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.