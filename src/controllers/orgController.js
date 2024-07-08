const { Organisation, User } = require('../models');

const createOrganisation = async (req, res) => {
  const { name, description } = req.body;
  const userId = req.userId;

  try {
    const orgId = `${name}_Org_${Date.now()}`;
    const organisation = await Organisation.create({
      orgId,
      name,
      description
    });

    const user = await User.findByPk(userId);
    await user.addOrganisation(organisation);

    res.status(201).json({
      status: 'success',
      message: 'Organisation created successfully',
      data: {
        orgId: organisation.orgId,
        name: organisation.name,
        description: organisation.description
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      message: 'Client error',
      statusCode: 400
    });
  }
};

module.exports = { createOrganisation };
