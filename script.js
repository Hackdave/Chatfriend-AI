// CHATFRIEND IA — SCRIPT.JS

document.addEventListener("DOMContentLoaded", function () {

  const startButton = document.getElementById("startButton");
  const container = document.getElementById("container");
  const chatScreen = document.getElementById("chatScreen");

  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");
  const messages = document.getElementById("messages");

  // Ouvrir l'espace de discussion
  startButton.addEventListener("click", function () {
    container.style.display = "none";
    chatScreen.style.display = "flex";
    messageInput.focus();
  });

  // Ajouter un message dans la discussion
  function addMessage(text, type) {
    const bubble = document.createElement("div");

    bubble.classList.add("message", type);
    bubble.textContent = text;

    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
  }

  // Envoyer un message
  function sendMessage() {
    const text = messageInput.value.trim();

    if (text === "") {
      return;
    }

    // Afficher le message de l'utilisateur
    addMessage(text, "user");

    // Vider le champ de saisie
    messageInput.value = "";

    

    messageInput.focus();
  }

  // Fonctionner avec le bouton Voye
  sendButton.addEventListener("click", sendMessage);

  // Envoyer aussi avec la touche Entrée
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

});