const net = require("net");

const clients = new Map();

function getTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour12: false,
  });
}

function systemMessage(message) {
  return `[${getTime()}] *** System: ${message}\n`;
}

function broadcast(sender, message) {
  for (const [username, socket] of clients) {
    if (username !== sender) {
      socket.write(
        `[${getTime()}] <${sender}> says: ${message}\n`
      );
    }
  }
}

const server = net.createServer((socket) => {
  let currentUser = null;
  socket.write(systemMessage("Enter your username:"));

  socket.on("data", (data) => {
    const message = data.toString().trim();
    if (!currentUser) {
      if (clients.has(message)) {
        socket.write(
          systemMessage("Username already taken. Try another.")
        );
        return;
      }

      currentUser = message;
      clients.set(currentUser, socket);

      socket.write(
        systemMessage(`Welcome ${currentUser}!`)
      );

      broadcast(
        currentUser,
        `${currentUser} joined the chat`
      );

      console.log(`${currentUser} connected`);
      return;
    }
    if (message.startsWith("/dm ")) {
      const parts = message.split(" ");
      const targetUser = parts[1];
      const dmMessage = parts.slice(2).join(" ");

      if (!clients.has(targetUser)) {
        socket.write(
          systemMessage(
            `User "${targetUser}" user not exist`
          )
        );
        return;
      }

      const targetSocket = clients.get(targetUser);

      targetSocket.write(
        `[${getTime()}] (Private from <${currentUser}>): ${dmMessage}\n`
      );

      socket.write(
        systemMessage(`DM sent to ${targetUser}`)
      );

      return;
    }
    broadcast(currentUser, message);
  });

  socket.on("end", () => {
    if (currentUser) {
      clients.delete(currentUser);

      broadcast(
        currentUser,
        `${currentUser} left the chat`
      );

      console.log(`${currentUser} disconnected`);
    }
  });

  socket.on("error", (err) => {
    console.log("Socket error:", err.message);
  });
});

server.listen(3000, () => {
  console.log("TCP Chat Server running on port 3000");
});