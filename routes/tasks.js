const express = require('express');
const Task = require('../models/task');
const authMiddleware = require('../auth/middleware');
const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, user_id: req.user.id });
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    await task.update(req.body);
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, user_id: req.user.id } });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    await task.destroy();
    res.send({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
