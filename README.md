# Simple Chat App

Welcome to the Simple Chat App! This is a real-time chat application where users can join specific rooms and exchange messages instantly.

## 🚀 How to Use It

1. **Install Dependencies**: Open your terminal in the project directory and run:
   ```bash
   npm install
   ```
2. **Start the Server**: Run the following command to start the application:
   ```bash
   npm start
   ```
3. **Open the App**: Open your web browser and navigate to `http://localhost:7001`.
4. **Join a Room**: Enter your desired username and the name of the room you want to join.
5. **Chat**: You can now send real-time messages to anyone else who has joined that same room!

## 🧠 What I Learned Building This

While creating this application, I gained hands-on experience with several important web development concepts:

- **Socket.IO Integration**: Setting up real-time bidirectional event-based communication between the web client and the server.
- **Room Functionality**: Leveraging Socket.IO's built-in `rooms` feature (`socket.join`) to section off users so that messages are only broadcasted to people in the same chat room.

## ⚙️ Core Functions

Here is a quick breakdown of what the main functions do in this app:

### Backend (`server.js`)
* **`io.on("connection", ...)`**: Listens for any new user connecting to the WebSocket server.
* **`socket.on("join room", ...)`**: Triggered when a user enters a room name on the frontend. It subscribes the user to that specific socket room and broadcasts a system message that they joined.
* **`socket.on("chat message", ...)`**: Receives a text message from a user and broadcasts it back out to everyone currently connected to that exact room using `io.to(room).emit()`.

### Frontend (`public/index.html`)
* **`joinRoom()`**: Gathers the username and room from the text inputs. If they are valid, it tells the socket to emit the "join room" event, hides the login interface, and reveals the chat interface.
* **`sendMsg()`**: Grabs the message text the user typed and emits a "chat message" event to the server.
* **`socket.on("message", ...)`**: This listener waits for any incoming text. When the server broadcasts a message, this function takes the data, creates a new HTML list item (`<li>`), assigns styling based on who sent it (User vs System), and attaches it to the chat container.
