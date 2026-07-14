
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getVideoUrl") {
        const video = document.querySelector("video");
        if (video) {
            sendResponse({ url: video.src });
        } else {
            sendResponse({ url: null });
        }
    }
});