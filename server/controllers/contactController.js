const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

exports.createContact = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};
