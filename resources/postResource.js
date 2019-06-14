const base_url = '/posts'

module.exports = (app, db) => {  

  app.get(`${base_url}`, (req, res) => {        
    const { Op } = db.Sequelize
    const options = {
      attributes: ['id_post', 'title'],
      include: [{
        model: db.author,
        as: 'author', // specifies how we want to be able to access our joined rows on the returned data,
        attributes: ['firstName'] 
      }],
      page: req.query.page, 
      paginate: +req.query.pageSize, 
      order: [[req.query.orderBy || db.sequelize.models.post.rawAttributes[Object.keys(db.sequelize.models.post.rawAttributes)[0]], req.query.direction || 'ASC']],
      [req.query.campo && req.query.condicao ? 'where':'']: { [req.query.campo || '']: { [Op.like]: `%${req.query.condicao|| ''}%` } }
    }
    db.post.paginate(options).then(result => res.json(result))
  });

  app.get(`${base_url}/:id`, (req, res) =>
    db.post.findByPk(req.params.id).then((result) => res.json(result))
  );

  app.post(`${base_url}`, (req, res, next) =>
    db.post.create({
      title: req.body.title,
      content: req.body.content
    }).then((result) => res.json(result))
    
  );

  app.put(`${base_url}/:id`, (req, res) =>
    db.post.update({
      title: req.body.title,
      content: req.body.content
    },
      {
        where: {
          id_post: req.params.id
        }
      }).then((result) => res.json(result))
  );

  app.delete(`${base_url}/:id`, (req, res) =>
    db.post.destroy({
      where: {
        id_post: req.params.id
      }
    }).then((result) => res.json(result))
  );
}