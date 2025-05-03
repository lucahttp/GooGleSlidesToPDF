# Google Slides to PDF Extension
I was tired of not being able to download the Slides from the university (some teachers doesn't share their ppt classes 😒) and following some tutorial we get to this

![image](https://github.com/user-attachments/assets/f4d5133b-cb30-45c3-85a3-74937578de75)

## How to Install
tested on Google Chrome and Edge Chromium Browser


1.  **Download the Extension Files:**
    
    -   Download the extension files from the GitHub repository. clone the repository or downloading a ZIP archive of the files.
    -   Extract the files to a folder on your computer.
        
2.  **Open the Extensions Page:**
    
    -   Open your Chromium-based browser (e.g., Chrome, Edge).
    -   In the address bar, type `chrome://extensions/` (or `edge://extensions/` for Microsoft Edge) and press Enter. This will open the browser's extensions management page.
        
3.  **Enable Developer Mode:**
    
    -   On the extensions page, find the "Developer mode" toggle switch, usually located in the top right corner.
    -   Toggle it to the "on" position.
        
4.  **Load the Unpacked Extension:**
    
    -   Click the "Load unpacked" button that appears at the top left of the page.
    -   A file dialog will open. Navigate to the folder where you extracted the extension files in Step 1.
    -   Select the folder containing the extension's `manifest.json` file. Click "Select Folder".
        

![Imagen de Chrome extensions page with developer mode enabled and Load unpacked button highlighted](https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQSEGcPabVsffWtDjoPDu_1cZH98J4OgE7UECjPpFG6ljfFiG2Ko582gmkN0xH0)

5.  **Extension Installed:**
    
    -   The extension should now be installed and appear in your browser's extension list.
        

### Src:
-   [**Develo](https://www.youtube.com/watch?v=BwO_dMqO7iI)
-   https://docs.google.com/document/d/13Mzrrjo_ei4JVyq6Vzc-UlvjohupJfevBlIXrN-qSQU/edit?tab=t.0
-
```javascript
# Alternate Second URL if your pages are not properly rendered in the PDF/PPT
var atag = "punch-viewer-content", 
    btag = "-caption", 
    ctag = "aria-setsize", 
    dtag = "aria-posinset", 
    msvg = document.getElementsByTagName("svg"), 
    node = document.querySelectorAll('[class$="' + btag + '"]')[0], 
    view = document.getElementsByClassName(atag)[0], 
    size = node.getAttribute(ctag), 
    data = "", 
    func = () => { 
        // Append the current slide's SVG content
        data += msvg[0].outerHTML; 
        if ((i = node.getAttribute(dtag)) == size) { 
            // Create a TrustedHTML policy for secure content injection
            escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", { 
                createHTML: (to_escape) => to_escape, 
            });
            document.write(escapeHTMLPolicy.createHTML(data));
            let style = document.createElement("style");
            style.textContent = `
                @media print {
                    body {
                        margin: 0;
                        padding: 0;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    svg {
                        display: block;
                        page-break-after: always;
                        width: 100%;
                        height: auto;
                        margin: auto;
                    }
                    div {
                        page-break-after: always;
                    }
                }
            `;
            document.head.appendChild(style);
            setTimeout(() => window.print(), 1000);
        } else {
        
            view.click(); 
            setTimeout(func, 10); 
        }
    };
func();
```


