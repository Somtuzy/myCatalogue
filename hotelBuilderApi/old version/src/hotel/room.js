const express = require("express");
const Room = require("../models/roomSchema");
const { MESSAGES } = require("../app/constants")
const app = require("../app/app")
const cors = require("cors")

app.use(cors())
app.use(express.json())

// Create room
app.post("/api/v1/rooms", async (req, res) => {
    const room = await Room.create(req.body);
    try {
        res.status(200).send({message: MESSAGES.ROOM.CREATED, success: true, room})
    } catch (err) {
      res.status(500).send({message: err.message || MESSAGES.ERROR, success: false})
    }
  });


// Filter and fetch all rooms
const url = "/api/v1/rooms?search={searchRoomNameMatch}&roomType={searchRoomTypeNameMatch}&minPrice={searchRoomMinimumPriceMatch}&maxPrice={searchRoomMaximumPriceMatch}"
app.get(url, async (req, res) => {
    const search = req.query.search;
    const roomType = req.query.roomType;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
  try {
    let filter = {};
    if (search) {
        filter.name = {$regex: search}
    }
    if (roomType) {
        filter.roomType = roomType;
    }
    if (minPrice) {
        filter.price = {$gte: minPrice}
    }
    if (maxPrice) {
        filter.price = {$lte: maxPrice}
    }
    const rooms = await Room.find({filter});
    res.status(200)
    .send({message: MESSAGES.ROOM.FETCHED, success: true, rooms: rooms})
} catch (err) {
    res.status(500).send({message: err.message || MESSAGES.ERROR, success: false})
}
})

// Edit a room by its id
app.patch("/api/v1/rooms/:id", async (req, res) => {
    const { id, data } = req.params
    try {
        const room = await Room.findByIdAndUpdate(id, data)
        res.status(200).send({message: MESSAGES.ROOM.UPDATED, success: true, room})
    } catch (err) {
        res.status(500).send({message: err.message || MESSAGES.ERROR, success: false})
    }
})

// Remove a room by its id
app.delete("/api/v1/rooms/:id", async (req, res) => {
    const { id } = req.params
    try { 
        const room = await Room.findByIdAndDelete(id);
        res.status(200).send({message: MESSAGES.ROOM.DELETED, success: true, room})
    } catch (err) {
        res.status(500).send({message: err.message || MESSAGES.ERROR, success: false})
    }
})

// get a room
app.get("/api/v1/rooms/:id", async (req, res) => {
    const { id } = req.params
    try {
        const room = await Room.findById(id)
        res.status(200).send({message: MESSAGES.ROOM.FETCHED, success: true, room})
    } catch (err) {
        res.status(500).send({message: err.message || MESSAGES.ERROR, success: false})
    }
})
