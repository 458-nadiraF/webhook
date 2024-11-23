module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    // Log the raw body
    console.log("Raw Request Body:", req.body);

    // Process the webhook payload
    const payload = req.body;

    // Do something with the payload
    console.log("Webhook received:", payload);

    // Return a response
    res.status(200).json({ message: "Webhook received successfully!" });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(500).json({ error: "An error occurred while processing the webhook." });
  }
};
