document.addEventListener("DOMContentLoaded", () => {
    const templateSelect = document.getElementById("templateSelect");
    const memeForm = document.getElementById("memeForm");
    const memeContainer = document.getElementById("memeContainer");

    // Fetch meme templates from Imgflip API
    fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const memes = data.data.memes;
                memes.forEach(meme => {
                    const option = document.createElement("option");
                    option.value = meme.id;
                    option.textContent = meme.name;
                    templateSelect.appendChild(option);
                });
            } else {
                memeContainer.innerHTML = "<p>Failed to load meme templates. Please try again later.</p>";
            }
        })
        .catch(error => {
            console.error("Error fetching memes:", error);
            memeContainer.innerHTML = "<p>Error loading meme templates. Please check your connection and try again.</p>";
        });

    // Handle form submission to generate meme
    memeForm.addEventListener("submit", event => {
        event.preventDefault();

        const selectedTemplate = templateSelect.value;
        const topText = document.getElementById("topText").value;
        const bottomText = document.getElementById("bottomText").value;

        fetch(`https://api.imgflip.com/caption_image?template_id=${selectedTemplate}&username=kevkaleido&password=ngoziMBA189&text0=${topText}&text1=${bottomText}`, {
            method: "POST"
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const memeUrl = data.data.url;
                    memeContainer.innerHTML = `
                        <img src="${memeUrl}" alt="Generated Meme">
                        <button id="downloadButton">Download Meme</button>
                    `;

                    const downloadButton = document.getElementById("downloadButton");
                    downloadButton.addEventListener("click", () => {
                        const link = document.createElement("a");
                        link.href = memeUrl;
                        link.download = "meme.png";
                        link.click();
                    });
                } else {
                    memeContainer.innerHTML = `<p>Failed to generate meme: ${data.error_message}</p>`;
                }
            })
            .catch(error => {
                console.error("Error generating meme:", error);
                memeContainer.innerHTML = "<p>Error generating meme. Please try again later.</p>";
            });
    });
});
