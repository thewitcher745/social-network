const getPosts = (req, res) => {
  res.json({
    posts: [{ title: "First post" }, { title: "Second post" }],
  });
};

const getNiggers = (req, res) => {
  res.send("Getting niggers");
};

module.exports = { getPosts, getNiggers };
