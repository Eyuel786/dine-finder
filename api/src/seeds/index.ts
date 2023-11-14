import mongoose from "mongoose";
import Restaurant from "../models/Restaurant";

mongoose
  .connect("mongodb://127.0.0.1:27017/dine-advisor-db")
  .catch(console.error.bind(console, "Initial DB Error:"));

mongoose.connection.once("open", () => console.log("DB connected"));
mongoose.connection.on("error", console.error.bind(console, "DB error"));

const seedDB = async () => {
  await Restaurant.deleteMany({});

  const restaurants = [
    {
      name: "5 Star Chinese",
      address: "43 Hamilton Street",
      cuisine: "Chinese",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus. Netus et malesuada fames ac turpis egestas maecenas. Purus in mollis nunc sed id semper. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. In cursus turpis massa tincidunt dui ut ornare lectus. Id semper risus in hendrerit gravida rutrum. Risus commodo viverra maecenas accumsan. Fermentum odio eu feugiat pretium nibh ipsum. Enim sed faucibus turpis in eu. Duis convallis convallis tellus id interdum. Dolor magna eget est lorem ipsum dolor sit amet. Eu mi bibendum neque egestas congue quisque egestas. Condimentum id venenatis a condimentum vitae sapien pellentesque.",
    },
    {
      name: "Blue Plates",
      address: "885 High Road Leytonstone",
      cuisine: "Indian",
      image:
        "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim sit amet venenatis urna cursus. Netus et malesuada fames ac turpis egestas maecenas. Purus in mollis nunc sed id semper. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. In cursus turpis massa tincidunt dui ut ornare lectus. Id semper risus in hendrerit gravida rutrum. Risus commodo viverra maecenas accumsan. Fermentum odio eu feugiat pretium nibh ipsum. Enim sed faucibus turpis in eu. Duis convallis convallis tellus id interdum. Dolor magna eget est lorem ipsum dolor sit amet. Eu mi bibendum neque egestas congue quisque egestas. Condimentum id venenatis a condimentum vitae sapien pellentesque.",
    },
  ];

  await Restaurant.insertMany(restaurants);
};

seedDB()
  .then(() => mongoose.connection.close())
  .catch((error) => {
    console.log(error.message);
    mongoose.connection.close();
  });
