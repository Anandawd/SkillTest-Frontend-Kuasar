const express = require("express");
const cors = require("cors");
const nim = require("@api/nim");
require("dotenv").config();

const app = express();

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const API_URL =
  process.env.NVIDIA_API_URL ||
  "https://integrate.api.nvidia.com/v1/chat/completions";
const API_KEY = process.env.NVIDIA_API_KEY;

app.use(cors(corsOptions));
app.use(express.json());

// Streaming chat completion endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const {
      model = "meta/llama-3.1-405b-instruct", // Ganti model di sini
      messages,
      temperature = 0.2,
      top_p = 0.7,
      max_tokens = 1024,
    } = req.body;

    // Validate messages
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    // Set up streaming response
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-open");

    nim.auth(API_KEY);

    // Make request to NVIDIA NIM API
    const response = await nim.create_chat_completion_v1_chat_completions_post({
      model,
      messages,
      temperature,
      top_p,
      max_tokens,
      stream: true,
    });

    // Split the response by new lines to process each chunk
    const chunks = response.data.split("\n");

    chunks.forEach((chunk) => {
      if (chunk.startsWith("data:")) {
        console.log("Hasil chunk: ", chunks);
        const jsonString = chunk.replace("data: ", "").trim();
        if (jsonString && jsonString !== "[DONE]") {
          try {
            const parsedData = JSON.parse(jsonString);
            const content = parsedData.choices?.[0]?.delta?.content;
            if (content) {
              // Send the content as a JSON object
              const formattedContent = content.replace(/\n\n/g, "\n\n");
              res.write(
                `data: ${JSON.stringify({ message: formattedContent })}\n\n`
              );
            }
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
          }
        }
      }
    });

    // Akhiri respons
    res.write("\n\n[DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("API request error:", error);
    res.status(500).send({ error: "Server error" });
  }
});

// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/signin" }),
//   (res, req) => {
//     res.redirect("/");
//   }
// );

// app.get("/api/user", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// app.get('/auth/github',
//   passport.authenticate('github'));

// app.get('/auth/github/callback',
//   passport.authenticate('github', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Redirect ke halaman utama setelah login berhasil
//     res.redirect('/');
//   });

// app.get("/logout", (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/");
//   });
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is running on port http://localhost:${PORT}`)
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;
