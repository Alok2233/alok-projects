const Client = require('../models/Client');

exports.getClients = async (req, res) => {
  const clients = await Client.find().sort({ createdAt: -1 });
  res.json(clients);
};

exports.createClient = async (req, res) => {
  const client = await Client.create({
    name: req.body.name,
    designation: req.body.designation,
    description: req.body.description,
    image_url: req.file ? `/uploads/clients/${req.file.filename}` : null
  });
  res.status(201).json(client);
};

exports.deleteClient = async (req, res) => {
  await Client.findByIdAndDelete(req.params.id);
  res.json({ message: 'Client deleted' });
};
