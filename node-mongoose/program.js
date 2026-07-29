const connect = require("./db");
const { ObjectId } = require("mongodb");

const runDatabaseQueries = async () => {
  const db = await connect();
  const movies = db.collection("movies");
  const users = db.collection("users");
  const comments = db.collection("comments");

  // Create 1: Insert User:

  const insertUser = await users.insertOne({
    name: "Delcy Falk",
    email: "burnin_off_the_crazy@yahoo.com",
  });
  console.log("Ineserted User: ", insertUser);

  const foundUser = await users.findOne({
    email: "burnin_off_the_crazy@yahoo.com",
  });
  console.log(foundUser);

  //Read 1:  Nolan Movies
  const nolanMovies = await movies
    .find({ directors: "Christopher Nolan" })
    .project({ title: 1, year: 1 })
    .toArray();
  console.log("Nolan Movies: ", nolanMovies);

  // Read 2: Action Movies descending by year
  const actionMovies = await movies
    .find({ genres: "Action" })
    .project({ title: 1, year: 1 })
    .sort({ year: -1 })
    .toArray();
  console.log("Action Movies: ", actionMovies);

  // Read 3: Rated > 8
  const topRatedMovies = await movies
    .find({ "imdb.rating": { $gt: 8.0 } })
    .project({ title: 1, imdb: 1 })
    .toArray();
  console.log("Top Rated Movies: ", topRatedMovies);

  // Read 4: Movies that starred both Tom Hanks & Tim Allen
  const hanksAndAllenMovies = await movies
    .find({ cast: { $all: ["Tom Hanks", "Tim Allen"] } })
    .project({ title: 1, cast: 1 })
    .toArray();
  console.log(
    "Movies with Tom Hanks and Tim Allen in them: ",
    hanksAndAllenMovies,
  );

  // Read 5: Movies that ONLY starred Tom Hanks & Tim Allen
  const onlyHanksAndAllenMovies = await movies
    .find({
      cast: { $all: ["Tom Hanks", "Tim Allen"], $size: 2 },
    })
    .project({ title: 1, cast: 1 })
    .toArray();

  console.log(
    "Movies starring only Tom Hanks and Tim Allen: ",
    onlyHanksAndAllenMovies,
  );

  // Read 6: Spielberg Movies
  const spielbergMovies = await movies
    .find({ directors: "Steven Spielberg", genres: "Comedy" })
    .project({ title: 1, directors: 1 })
    .toArray();

  console.log("Spielberg Movies: ", spielbergMovies);

  // Update 1: Add field
  const addField = await movies.updateOne(
    { title: "The Matrix" },
    { $set: { available_on: "Sflix" } },
  );

  console.log(
    await movies.findOne({
      title: "The Matrix",
    }),
  );

  // Update 2: Increment
  const incrementMetacritic = await movies.updateOne(
    { title: "The Matrix" },
    { $inc: { metacritic: 1 } },
  );
  console.log(
    await movies
      .find({ title: "The Matrix" })
      .project({ title: 1, metacritic: 1 })
      .toArray(),
  );

  // Update 3: Add new genre
  const addGenre = await movies.updateMany(
    { year: 1997 },
    { $push: { genres: "Gen Z" } },
  );
  console.log(
    await movies
      .find({ genres: "Gen Z" })
      .project({ title: 1, genres: 1 })
      .toArray(),
  );

  // Update 4: Increase rating
  console.log(
    await movies
      .find({ "imdb.rating": { $lt: 5.0 } })
      .project({ title: 1, "imdb.rating": 1 })
      .toArray(),
  );
  await movies.updateMany(
    { "imdb.rating": { $lt: 5.0 } },
    { $inc: { "imdb.rating": 1 } },
  );
  console.log(
    await movies
      .find({ title: "Sheena" })
      .project({ title: 1, "imdb.rating": 1 })
      .toArray(),
  );

  // Delete 1: Delete comment by ID
  const commentByIdDelete = await comments.deleteOne({
    _id: new ObjectId("5a9427648b0beebeb6957b1a"),
  });
  console.log(commentByIdDelete);

  // Delete 2: Delete all comments for The Matrix
  const matrix = await movies.findOne({ title: "The Matrix" });
  console.log(matrix._id);
  const deleteAllComments = await comments.deleteMany({ movie_id: matrix._id });
  console.log(deleteAllComments);

  // Delete 3: Delete movies with no genre:
  const noGenreDelete = await movies.deleteMany({
    $or: [{ genres: { $exists: false } }, { genres: { $size: 0 } }],
  });
  console.log(noGenreDelete);

  // Aggregate 1: Count how many movies released each year displayed ascending
  const findMoviesByYear = await movies
    .aggregate([
      { $group: { _id: "$year", count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ])
    .toArray();
  console.log(findMoviesByYear);

  // Aggregate 2: Average rating grouped by director descending
  const findAveRatingGroupByDirector = await movies
    .aggregate([
      { $unwind: "$directors" },
      { $group: { _id: "$directors", average: { $avg: "$imdb.rating" } } },
      { $sort: { average: -1 } },
    ])
    .toArray();
  console.log(findAveRatingGroupByDirector);
  process.exit(0);
};

runDatabaseQueries();
