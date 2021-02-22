const mongoose = require("mongoose"),
  Campground = require("../models/campground"),
  url =
    "mongodb+srv://volo:frnhyVviRqz7n3di@cluster0.1jvws.mongodb.net/bootcamp?retryWrites=true&w=majority",
  cities = require("./cities"),
  { places, descriptors } = require("./description");

mongoose.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => console.log("MongoDB connected")
);

const db = mongoose.connection;
db.on("error", console.error.bind(console.log("connection error")));
db.once("open", () => console.log("DB connected"));

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const rand1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6025bafa3d34c37b1cd9309d",
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "Some lorem ipsum text",
      price,
      geometry: {
        type: "Point",
        coordinates: [cities[rand1000].longitude, cities[rand1000].latitude],
      },
      images: [
        {
          url:
            "https://res.cloudinary.com/grushvolo/image/upload/v1612999944/ysi4ukueqydoxhggsrra.jpg",
          filename: "Yelcamp/vy7oqxchp2ddyrexsdnr",
        },
        {
          url:
            "https://res.cloudinary.com/grushvolo/image/upload/v1612999733/mmc5uymglhoi4j6dbx0w.jpg",
          filename: "Yelcamp/pofwspzufgnvyfpfossc",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => mongoose.connection.close());
