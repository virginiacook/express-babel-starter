import Post from '../models/post_model';

const cleanPosts = (posts) => {
  return posts.map(post => {
    return { id: post._id, title: post.title, tags: post.tags };
  });
};

export const createPost = (req, res) => {
  const post = new Post();
  res.send(req.body.title);
  post.title = req.body.title;
  post.content = req.body.content;
  //post.tags = req.body.tags;

  var tagSplit = req.body.tags.split(" ");
  // tagSplit.forEach(tgg => {
  //   console.log(tgg);
  //   post.tags.push(tgg);
  // });

  // post.tags.push(tagSplit[0]);
  // post.tags.push(tagSplit[1]);

  post.tags = tagSplit;

  post.save().then(result => {
    res.json({ message: 'Post created!' });
  }).catch(error => {
    res.json({ error });
  });
};

export const getPosts = (req, res) => {
  Post.find().then(result => {
    res.json(cleanPosts(result));
  }).catch(error => {
    res.json({ error });
  });
};

export const getPost = (req, res) => {
  Post.findById(req.params.id).then(result => {
    res.json(result);
  }).catch(error => {
    res.json(error);
  });
};

export const deletePost = (req, res) => {
  Post.findById(req.params.id).remove().then(result=>{
    res.json(result);
  }).catch(error => {
    res.json(error);
  });
};

export const updatePost = (req, res) => {

  Post.update({_id: req.params.id }, req.body).catch(error => {
    res.json(error);
  });
  Post.findById(req.params.id).then(result => {
    res.json(result);
  }).catch(error => {
    res.json(error);
  });
};
