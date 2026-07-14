document.getElementById("dwvideo").addEventListener("click", async () => {
  const statusText = document.getElementById("status");
  statusText.innerText = "Video axtarılır...";

  try {
 
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab.url.includes("tiktok.com")) {
      statusText.innerText = "Lütfən bir TikTok səhifəsinə girin.";
      return;
    }

    if (!tab.url.includes("/video/")) {
      statusText.innerText =
        "Lütfən videonu tam açın (URL-də /video/ olmalıdır).";
      return;
    }

    statusText.innerText = "Təmiz link hazırlanır (Loqosuz)...";


    const apiUrl =
      "https://www.tikwm.com/api/?url=" + encodeURIComponent(tab.url);

    const response = await fetch(apiUrl);
    const data = await response.json();


    if (data.code === 0 && data.data && data.data.play) {
      statusText.innerText = "Video tapıldı! Yüklənir...";

  
      chrome.downloads.download(
        {
          url: data.data.play,
          filename: "tiktok_video_" + Date.now() + ".mp4",
        },
        (downloadId) => {
          if (chrome.runtime.lastError) {
            statusText.innerText = "Yükləmədə xəta oldu.";
          } else {
            statusText.innerText = "Yükləmə uğurla başladı!";
          }
        },
      );
    } else {
      statusText.innerText = "Videonun linkini çıxarmaq mümkün olmadı.";
    }
  } catch (error) {
    statusText.innerText = "Gözlənilməz xəta baş verdi.";
    console.error(error);
  }
});
