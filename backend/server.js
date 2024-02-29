const express = require("express");
const cors = require("cors");
const { FieldValue } = require("firebase-admin/firestore");
const app = express();
const port = 8383;
const { db } = require("./firebase.js");

app.use(express.json());
app.use(cors());

app.post("/createMentor", async (req, res) => {
  try {
    const { ID, firstName, hoursDedicated, lastName, interests } = req.body;

    // Create a new document reference with an auto-generated ID
    const newMentorRef = db.collection("mentors").doc();

    // Set the data for the new mentor document
    await newMentorRef.set({
      ID,
      firstName,
      hoursDedicated,
      lastName,
      interests,
    });

    // Send a success response
    res.status(200).json({
      message: "Mentor added successfully",
      mentorId: newMentorRef.id,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding mentor: ", error);
    res.status(500).json({ error: "Failed to add mentor" });
  }
});

app.post("/createMentee", async (req, res) => {
  try {
    const { ID, firstName, lastName, interests } = req.body;

    // Create a new document reference with an auto-generated ID
    const newMenteeRef = db.collection("mentee").doc();

    // Set the data for the new mentee document
    await newMenteeRef.set({
      ID,
      firstName,
      lastName,
      interests,
    });

    // Send a success response
    res.status(200).json({
      message: "Mentee added successfully",
      mentorId: newMenteeRef.id,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding mentee: ", error);
    res.status(500).json({ error: "Failed to add mentee" });
  }
});

app.post("/createTranslator", async (req, res) => {
  try {
    const { ID, firstName, lastName, hoursDedicated, language } = req.body;

    // Create a new document reference with an auto-generated ID
    const newTranslatorRef = db.collection("translator").doc();

    // Set the data for the new mentee document
    await newTranslatorRef.set({
      ID,
      firstName,
      lastName,
      language,
      hoursDedicated,
    });

    // Send a success response
    res.status(200).json({
      message: "Translator added successfully",
      mentorId: newTranslatorRef.id,
    });
  } catch (error) {
    // Handle errors
    console.error("Error adding mentee: ", error);
    res.status(500).json({ error: "Failed to add mentee" });
  }
});

app.get("/getAllMentors", async (req, res) => {
  try {
    // Query all documents from the "mentors" collection
    const mentorsSnapshot = await db.collection("mentors").get();
    // Array to store mentor data
    const mentors = [];
    // Loop through each mentor document
    mentorsSnapshot.forEach((doc) => {
      // Get mentor data
      const mentorData = doc.data();

      // Add mentor data to the array
      mentors.push({
        id: doc.id,
        ...mentorData,
      });
    });

    // Send the array of mentors as a response
    res.status(200).json({ mentors });
  } catch (error) {
    console.error("Error happend when getting the list of mentors: ", error);
    res.status(500).json({ error: "Failed to list mentors" });
  }
});

app.get("/getMentee/:id", async (req, res) => {
  try {
    const menteeID = req.params.id;

    // Query the Firestore collection for the specific mentee
    const menteeDoc = await db.collection("mentee").doc(menteeID).get();

    // Check if the mentee exists
    if (menteeDoc.empty) {
      return res.status(404).json({ error: "Mentee not found" });
    }

    // Get the first mentee document (assuming there's only one with the given ID)
    const menteeData = menteeDoc.data();

    // Send mentee data as response
    res.status(200).json({ mentee: { id: menteeDoc.id, ...menteeData } });
  } catch (error) {
    console.error("Error retrieving mentee: ", error);
    res.status(500).json({ error: "Failed to retrieve mentee" });
  }
});

app.listen(port, () => console.log(`Server has started on port: ${port}`));
