document.addEventListener("DOMContentLoaded", () => {
    const templateSelect = document.getElementById("templateSelect");
    const memeForm = document.getElementById("memeForm");
    const memeContainer = document.getElementById("memeContainer");
    const shareButtons = document.getElementById("shareButtons");

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
                    shareButtons.style.display = "flex";

                    const downloadButton = document.getElementById("downloadButton");
                    downloadButton.addEventListener("click", () => {
                        const link = document.createElement("a");
                        link.href = memeUrl;
                        link.download = "meme.png";
                        link.click();
                    });

                    document.getElementById("shareFacebook").onclick = () => {
                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memeUrl)}`, '_blank');
                    };

                    document.getElementById("shareTwitter").onclick = () => {
                        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(memeUrl)}`, '_blank');
                    };

                    document.getElementById("shareReddit").onclick = () => {
                        window.open(`https://www.reddit.com/submit?url=${encodeURIComponent(memeUrl)}`, '_blank');
                    };
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
