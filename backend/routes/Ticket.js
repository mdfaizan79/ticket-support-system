const express = require("express");
const router = express.Router();
const Ticket = require("../models/Tickets");

// Create a new ticket
router.post("/", async (req, res) => {
  // Parse request data, validate, and create a new ticket using the Ticket model
  try {
    // You can access the Ticket model through req, as you passed it as middleware
    const { title, description, status, createdBy, assignedTo } = req.body;
    const newTicket = await Ticket.create({
      title,
      description,
      status,
      createdBy,
      assignedTo,
    });
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a list of all tickets
router.get("/", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define other CRUD routes such as fetching a single ticket, updating, and deleting

// Fetching a Single Ticket:

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updating a Ticket:

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Data to update the ticket

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deleting a Ticket:

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(204).end(); // No content, successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Updating a Ticket (PATCH):
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; // Data to update the ticket

  try {
    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
