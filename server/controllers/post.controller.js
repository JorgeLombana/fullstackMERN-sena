const Post = require('../models/post.model')
const image = require('../utils/image')

function createPost(req, res) {
  const post = new Post(req.body)
  post.created_at = new Date()

  const imagePath = image.getFilePath(req.files.miniature)
  post.miniature = imagePath

  post.save((error, postStored) => {
    if (error) {
      res.status(400).send({ msg: 'error al crear el post' })
    } else {
      res.status(200).send(postStored)
    }
  })
}

function getPosts(req, res) {
  const { page = 1, limit = 10 } = req.body

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { created_at: 'desc' },
  }

  Post.paginate({}, options, (error, postStored) => {
    if (error) {
      res.status(400).send({ msg: 'error al obtener el post' })
    } else {
      res.status(200).send(postStored)
    }
  })
}

function updatePost(req, res) {
  const { id } = req.params
  const postData = req.body

  if (req.files.miniature) {
    const imagePath = image.getFilePath(req.files.miniature)
    postData.miniature = imagePath
  }

  Post.findByIdAndUpdate({ _id: id }, postData, (error) => {
    if (error) {
      res.status(400).send({ msg: 'error actualizando el post' })
    } else {
      res.status(200).send({ msg: 'actuliseichon correcta ' })
    }
  })
}

function deletePost(req, res) {
  const { id } = req.params
  Post.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: 'error al eliminar el post' })
    } else {
      res.status(200).send({ msg: 'post deleteado :L' })
    }
  })
}

function getPost(req, res) {
  const { path } = req.params

  Post.findOne({ path }, (error, postStored) => {
    if (error) {
      res.status(500).send({ msg: 'error del server side :v' })
    } else if (!postStored) {
      res.status(400).send({ msg: 'no se ha encotrao el post ' })
    } else {
      res.status(200).send(postStored)
    }
  })
}

module.exports = {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  getPost,
}
