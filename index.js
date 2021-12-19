import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()

// sample data of rooms
const rooms = [
    {
        "id": "100",
        "roomname": "1st room",
        "seats": 200,
        "amenities": ["ac", "water"],
        "priceperhr": 5000,
        "bookeddetails": {
            "customername": "mani",
            "date": "3-12-2021",
            "starttime": "10am",
            "endtime": "12pm",
        }
    },
    {
        "id": "101",
        "roomname": "2nd room",
        "seats": 300,
        "amenities": ["ac", "water"],
        "priceperhr": 7000,
    }
]

const PORT = process.env.PORT

app.use(express.json())

app.get("/", (request, response) => {
    response.send(rooms)
})

// route to insert data of new room
app.post("/create-room", (request, response) => {
    const data = request.body
    rooms.push(data)
    response.send(rooms)
})

// route to book a room with the room id
app.post("/book-room/:id", (request, response) => {
    const { id } = request.params
    const data = request.body
    const room = rooms.find(x => x.id == id)
    if (room.bookeddetails) {
        response.send("Room was already booked")
    } else {
        room.bookeddetails = data
        response.send(rooms)
    }
})

// route to list the booked rooms
app.get("/booked-rooms", (request, response) => {
    const bookedrooms = rooms.filter(room => room.bookeddetails)
    console.log(bookedrooms)
    response.send(bookedrooms)
})

// route to list all the customers
app.use("/customers", (request, response) => {
    response.send(rooms)
})

app.listen(PORT, () => console.log("App started in ", PORT))