
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const container = document.getElementById("container");
  const chatScreen = document.getElementById("chatScreen");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const messages = document.getElementById("messages");

  const API_URL = "https://chatfriend-backend.onrender.com/api/chat";

  startButton.addEventListener("click", function () {
    container.style.display = "none";
    chatScreen.style.display = "flex";
    messageInput.focus();
  });

  function addMessage(text, type) {
    const bubble = document.createElement("div");
    bubble.classList.add("message", type);
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    messageInput.value = "";
    sendButton.disabled = true;

    const loading = document.createElement("div");
    loading.classList.add("message", "ai");
    loading.textContent = "ChatFriend IA ap reflechi...";
    messages.appendChild(loading);
    messages.scrollTop = messages.scrollHeight;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Gen yon pwoblèm ak sèvè a.");
      }

      loading.textContent = data.reply || "Mwen pa resevwa yon repons.";
    } catch (error) {
      loading.textContent =
        "Mwen pa ka konekte kounye a. Verifye backend Render la epi eseye ankò.";
      console.error("ChatFriend IA:", error);
    } finally {
      sendButton.disabled = false;
      messageInput.focus();
      messages.scrollTop = messages.scrollHeight;
    }
  }

  sendButton.addEventListener("click", sendMessage);

  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });
});
