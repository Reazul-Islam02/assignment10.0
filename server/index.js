const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const Vehicle = require('./models/Vehicle');
const Booking = require('./models/Booking');
const verifyToken = require('./middlewares/verifyToken');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
        'https://travelease-client.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@anm.eik10ao.mongodb.net/?appName=ANM`;

mongoose.connect(uri)
    .then(() => {
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Auth Routes
app.post('/jwt', async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    res
        .cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        .send({ success: true });
});

app.post('/logout', (req, res) => {
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    };
    res.clearCookie('token', { ...options, maxAge: 0 }).send({ success: true });
});


// Vehicle Routes
// Get All Vehicles (with search, sort, filter)
app.get('/vehicles', async (req, res) => {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;
        let query = {};

        if (search) {
            query.vehicleName = { $regex: search, $options: 'i' };
        }
        if (category) {
            query.category = category;
        }
        if (minPrice || maxPrice) {
            query.pricePerDay = {};
            if (minPrice) query.pricePerDay.$gte = Number(minPrice);
            if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
        }

        let sortOptions = {};
        if (sort === 'priceLow') sortOptions.pricePerDay = 1;
        if (sort === 'priceHigh') sortOptions.pricePerDay = -1;
        if (sort === 'latest') sortOptions.createdAt = -1;

        const vehicles = await Vehicle.find(query).sort(sortOptions);
        res.send(vehicles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Latest 6 Vehicles
app.get('/vehicles/latest', async (req, res) => {
    try {
        const vehicles = await Vehicle.find().sort({ createdAt: -1 }).limit(6);
        res.send(vehicles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Single Vehicle
app.get('/vehicle/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        res.send(vehicle);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get Vehicles by User Email (Protected)
app.get('/my-vehicles/:email', verifyToken, async (req, res) => {
    if (req.params.email !== req.user.email) {
        return res.status(403).send({ message: 'Forbidden access' });
    }
    try {
        const vehicles = await Vehicle.find({ userEmail: req.params.email });
        res.send(vehicles);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Add Vehicle (Protected)
app.post('/vehicles', verifyToken, async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        const result = await newVehicle.save();
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update Vehicle (Protected)
app.put('/vehicle/:id', verifyToken, async (req, res) => {
    try {
        const result = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Delete Vehicle (Protected)
app.delete('/vehicle/:id', verifyToken, async (req, res) => {
    try {
        const result = await Vehicle.findByIdAndDelete(req.params.id);
        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Booking Routes
// Add Booking (Protected)
app.post('/bookings', verifyToken, async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const result = await newBooking.save();

        // Optionally update booking count on vehicle
        await Vehicle.findByIdAndUpdate(req.body.vehicleId, { $inc: { bookingCount: 1 } });

        res.send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Get My Bookings (Protected)
app.get('/my-bookings/:email', verifyToken, async (req, res) => {
    if (req.params.email !== req.user.email) {
        return res.status(403).send({ message: 'Forbidden access' });
    }
    try {
        const bookings = await Booking.find({ userEmail: req.params.email });
        res.send(bookings);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Default Route
app.get('/', (req, res) => {
    res.send('TravelEase Server is running');
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
