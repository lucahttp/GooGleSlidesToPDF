// background.js
/*
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse){
        console.log("Background script received a message:", request.action);
        if (request.action === "exportSlides") {
            console.log("Exporting slides...");
            // Perform the export operation here
            // You can use the request data to customize the export process
            // For example, you can access request.slides to get the slides data
            sendResponse({ status: "success", message: "Slides exported successfully!" });
        } else if (request.action === "getTotalElements") {
            console.log("Getting total elements...");
            // Perform the operation to get total elements here
            // For example, you can access request.data to get the data needed for this operation
            sendResponse({ status: "success", total_elements: 100 }); // Example response
        }
       chrome.storage.local.set({ data: request.total_elements });
    }
);
*/