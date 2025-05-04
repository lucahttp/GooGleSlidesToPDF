document.addEventListener("DOMContentLoaded", function () {



  async function generateMultiPagePdf(svgArray) {
    const tmpPdf = new window.jspdf.jsPDF("l", "pt", [960, 540]);

    async function processSvg(svgElement, index) {
      return new Promise((resolve) => {
        window.svg2pdf
          .svg2pdf(svgElement, tmpPdf, {
            xOffset: 0,
            yOffset: 0,
            x: 0,
            y: 0,
            width: 960,
            height: 540,
            scale: 1,
            callback: function (doc) {
              console.log(`SVG ${index + 1} added to PDF`);
              resolve();
            },
          })
          .then(() => {
            console.log(
              `svg2pdf processing for SVG ${index + 1} completed`
            );
            // Resolve here as well in case the callback is not consistently triggered
            resolve();
          });
      });
    }
    var svgArray2 = svgArray.filter(element => element !== null);

    for (let i = 0; i < svgArray2.length; i++) {
      console.log("Processing SVG:", svgArray2[i]);
      const hiddenElement = document.createElement("div");
      hiddenElement.style.display = "none";
      hiddenElement.innerHTML = svgArray2[i];
      document.body.appendChild(hiddenElement);
      const svgElement = hiddenElement.querySelector("svg");

      if (i > 0) {
        tmpPdf.addPage();
      }

      await processSvg(svgElement, i);
      document.body.removeChild(hiddenElement); // Clean up the temporary element
    }

    tmpPdf.save("multiPagePDF.pdf");
    console.log("Multi-page PDF created successfully!");
  }
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    switch (message.type) {
      case "sendArray":
        console.log("whe received a sendArray message");
        generateMultiPagePdf(message.data);
    }
  });

  function makePDF(divArray) {
    const tmpPdf = new window.jspdf.jsPDF("l", "pt", [960, 540]); // 'l', 'pt', [200, 100]

    const asyncLoop = async () => {
      const start = console.log(Date.now());

      for (let i = 0; i < 1000; i++) {
        const data = await request();
        console.log(Date.now() - start);
      }
    };

    asyncLoop();

    for (var i = 0; i <= divArray.length; i++) {
      //! This is all just html2canvas stuff
      var thisSvgElement = divArray[i];
      hiddenElement = document.createElement("div");
      hiddenElement.style.display = "none";
      hiddenElement.innerHTML = thisSvgElement;
      document.body.appendChild(hiddenElement);
      const svgElement = hiddenElement.querySelector("svg");

      const width = 900;
      const height = 980;

      var sX = 0;
      var sY = height * i; // start 980 pixels down for every new page
      var sWidth = width;
      var sHeight = height;
      var dX = 0;
      var dY = 0;
      var dWidth = width;
      var dHeight = height;

      if (i > 0) {
        tmpPdf.addPage(); //(width, height); //8.5" x 11" in pts (in*72)
        //! now we declare that we're working on that page
        //tmpPdf.setPage(i + 1);
        tmpPdf.svg(svgElement, {
          x: 10,
          y: 10,
          width: width,
          height: height,
          callback: function (doc) {
            console.log("PDF created successfully");
            //doc.save();
          },
        });
      } else {
        window.svg2pdf
          .svg2pdf(svgElement, tmpPdf, {
            xOffset: 0,
            yOffset: 0,
            x: 10,
            y: 10,
            width: 180,
            height: 180,
            scale: 1,
            callback: function (doc) {
              // this doesnt work :( and I dont know why
              //doc.save("sadPDF.pdf");
            },
          })
          .then(function (doc) {
            //var pdf = doc;
            console.log("PDF 1st page created successfully");
            //tmpPdf.save("testeandoandoooolpmqmrmp.pdf");
          });
      }
      //! now we add content to that page!
      //pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));
    }
    //! after the for loop is finished running, we save the pdf.
    tmpPdf.save("Test.pdf");
  }

  async function downloadEmbeddedImages(svgElement) {
    const svgString = svgElement;
    const imageRegex = /xlink:href="([^"]+)"/g;
    let match;
    let updatedSvgString = svgString;

    while ((match = imageRegex.exec(svgString)) !== null) {
      const imageUrl = match[1];
      console.log("Image URL:", imageUrl); // Log the image URL for debugging
      // Check if the image URL is a data URL (base64) or a regular URL
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          console.error(`Failed to fetch image: ${imageUrl}`);
          continue; // Skip this image if fetching fails
        }
        const blob = await response.blob();
        const reader = new FileReader();
        await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            const base64DataUrl = reader.result;
            updatedSvgString = updatedSvgString.replace(
              imageUrl,
              base64DataUrl
            );
            resolve();
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } catch (error) {
        console.error(`Error processing image ${imageUrl}:`, error);
      }
    }

    /*     //console.log("svg with images",updatedSvgString);
    let updatedSvgString2 = updatedSvgString.replace(
      /<g([^>]*)role="img"([^>]*)>(.*?)<\/g>/gs,
      (match, p1, p2, p3) => {
        return `<g${p1}role="text"${p2}>${p3}</g>`;
      } 
    );*/

    console.log("from function:", updatedSvgString);
    return updatedSvgString; // Return the updated SVG string with embedded images
  }

  const downloadButton = document.getElementById("download-btn");

  downloadButton.addEventListener("click", function () {
    function getSourceObj(svgElement) {
      var convertToEllement = document.createElement("div");
      convertToEllement.innerHTML = svgElement.outerHTML;

      return convertToEllement;
    }
    function stringToSVG(svgString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, "image/svg+xml");
      return doc.documentElement;
    }

    var svgData = `
    <svg height="100" width="100" xmlns="http://www.w3.org/2000/svg">
    <circle r="45" cx="50" cy="50" stroke="green" stroke-width="3" fill="red" />
    Sorry, your browser does not support inline SVG.  
  </svg>
        `;
    var svgData = `
<svg viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
  <text y="20" x="20">Hello, world!</text>
</svg>
            `;
    hiddenElement = document.createElement("div");
    hiddenElement.style.display = "none";
    hiddenElement.innerHTML = svgData;
    document.body.appendChild(hiddenElement);
    const svgElement = hiddenElement.querySelector("svg");
    const svgContainer = document.createElement("div");
    svgContainer.style.display = "none";
    svgContainer.appendChild(svgElement);
    document.body.appendChild(svgContainer);
    const svgString = svgElement.outerHTML;
    const svgBlob = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "mySVG.svg";
    downloadLink.click();
    URL.revokeObjectURL(url);
    console.log("SVG downloaded successfully");
    console.log("SVG string:", svgString);
    console.log("SVG element:", svgElement);

    /*
    const pdf = new window.jspdf.jsPDF();
    //const pdf = new jsPDF();
    //const svgElement = new Blob([svgData], { type: 'image/svg+xml' });
    //const url = URL.createObjectURL(svgElement);

    console.log("PDF creation in progress");
    pdf.svg(stringToSVG(svgData), {
      x: 10,
      y: 10,
      width: 180,
      height: 180,
        callback: function (doc) {
            console.log("PDF created successfully");
          doc.save();
        }
     });


     */
    //svgContainer = SVG().addTo('#canvas').size(200, 100).id("someSvgContainer");
    //svgContainer.image("star.svg").size(100, 100);                                    // some svg image
    //svgContainer.image("https://bit.ly/3jPU1vT").size(100, 100).move(100, 0);         // some bitmap
    //svgContainer.rect(50, 50).fill('#f06').move(75, 25);                              // some primitive

    const tmpPdf = new window.jspdf.jsPDF(); // 'l', 'pt', [200, 100]

    window.svg2pdf
      .svg2pdf(svgElement, tmpPdf, {
        xOffset: 0,
        yOffset: 0,
        x: 10,
        y: 10,
        width: 180,
        height: 180,
        scale: 1,
        callback: function (doc) {
          // this doesnt work :( and I dont know why
          doc.save("sadPDF.pdf");
        },
      })
      .then(function () {
        console.log("PDF created successfully");
        tmpPdf.save("testeandoandoooolpmqmrmp.pdf");
      });

    //pdf.save("test.pdf");
  });

  const downloadButton2 = document.getElementById("download-btn2");
  downloadButton2.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "getText" },
        function (response) {
          console.log(response);
          alert(response);
          generateMultiPagePdf(response);
          /*downloadEmbeddedImages(response).then(function (reponse2) {
            console.log("SVG processing then.");
            console.log("Updated SVG with embedded images:", reponse2);
            console.log(reponse2);
          });
          */

          /*  
              .then((reponse2) => {
                console.log("SVG processing then.");
                console.log("Updated SVG with embedded images:", reponse2);
                console.log(reponse2);

                hiddenElement = document.createElement("div");
                hiddenElement.style.display = "none";
                hiddenElement.innerHTML = reponse2;
                document.body.appendChild(hiddenElement);
                const svgElement = hiddenElement.querySelector("svg");

                console.log(svgElement);
                console.log(reponse2);
                // Clean up the hidden element after processing
                //sendResponse("svgElement.innerHTML"); // Send the updated SVG string back to the popup

              })
              .finally(() => {
                console.log("SVG processing finally.");
                //console.log(updatedSVG);
              });
 */
          //console.log(response);

          /*
          let updatedSvgString2 = response.replace(
            /<g([^>]*)role="img"([^>]*)>(.*?)<\/g>/gs,
            (match, p1, p2, p3) => {
              return `<g${p1}role="text"${p2}>${p3}</g>`;
            }
          );
          */
          /*
          hiddenElement = document.createElement("div");
          hiddenElement.style.display = "none";
          hiddenElement.innerHTML = response[0];
          document.body.appendChild(hiddenElement);
          const svgElement = hiddenElement.querySelector("svg");

          const tmpPdf = new window.jspdf.jsPDF("l", "pt", [960, 540]); // 'l', 'pt', [200, 100]

          window.svg2pdf
            .svg2pdf(svgElement, tmpPdf, {
              xOffset: 0,
              yOffset: 0,
              x: 0, //10
              y: 0, //10
              width: 960,
              height: 540,

              //0.0 0.0 960.0 540.0
              scale: 1,
              callback: function (doc) {
                // this doesnt work :( and I dont know why
                doc.save("sadPDF.pdf");
              },
            })
            .then(function () {
              console.log("PDF created successfully");
              tmpPdf.save("testeandoandoooolpmqmrmp.pdf");
            });

*/

          // Example usage:

          var svgStrings = [
            '<svg width="200" height="100"><rect width="200" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" /></svg>',
            '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>',
            '<svg width="300" height="100"><text x="0" y="15" fill="red">I love SVG!</text></svg>',
          ];


          // Assuming 'response' is an array of SVG strings
          // You would replace this with your actual 'response' array
          // const response = ['<svg ...>', '<svg ...>', ...];

          //generateMultiPagePdf(svgStrings);
          console.log("PDF created successfully");
          //$("#text").text(response);
        }
      );
    });

    //chrome.runtime.sendMessage({ action: "exportSlides" });
  });
});
