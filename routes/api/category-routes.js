const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product],
  }).then(categ => {
    res.json(categ);
  }).catch(err => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Category.findByPk(req.params.id, {
    include: [Product],
  }).then(categ => {
    res.status(200).json(categ);
  }).catch(err => {
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Category.create(req.body)
    .then(data => {
      res.status(200).json(data);
    }).catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  },
  ).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  },).then(data => {
    res.status(200).json(data);
  }).catch(err => {
    res.status(500).json(err);
  })
});

module.exports = router;
