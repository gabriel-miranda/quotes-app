const jwt = require('jsonwebtoken');
const { ManagementClient } = require('auth0');
const AUTH0_CONFIG = require('./auth0-variables');
const AUTH0_CONFIG_WEB_CLIENT = require('../www/utils/auth0-variables');

const METADATA_FIELDS = ['bio', 'birthdate', 'favorite_color'];

const auth0 = new ManagementClient({
  domain: AUTH0_CONFIG.domain,
  clientId: AUTH0_CONFIG.clientId,
  clientSecret: AUTH0_CONFIG.secret,
  scope: 'update:users',
});

const verifyToken = token => jwt.verify(
  token,
  AUTH0_CONFIG_WEB_CLIENT.secret,
);

const v = (t, m) => {
  if (!t) {
    throw new Error(`Validation Error: ${m} is not valid`);
  }
};

// TODO: Tests
const validators = {
  bio: arg =>
    v((typeof arg === 'string' && arg.length <= 500), 'bio'),
  birthdate: arg =>
    v(!Number.isNaN(Date.parse(arg) && /^\d{4}(-\d{2}){2}$/.test()), 'birthdate'),
  favorite_color: arg =>
    v((typeof arg === 'string' && /^#[0-9A-F]{6}$/i.test(arg)), 'favorite_color'),
};

const update = async (req, res) => {
  try {
    if (!req.body.data) {
      throw new Error('No data provided in body: {data}');
    }
    const payload = {};
    // TODO: Use RAML or Swagger
    Object.keys(req.body.data).forEach((k) => {
      if (METADATA_FIELDS.includes(k)) {
        validators[k](req.body.data[k]);
        payload[k] = req.body.data[k];
      }
    });
    const decoded = verifyToken(req.cookies.id_token);
    const { user_metadata } = await auth0.updateUserMetadata( // eslint-disable-line
      { id: decoded.sub },
      { ...payload },
    );
    res.send(user_metadata);
  } catch (e) {
    console.error(e);
    res.status(400).json({message: e.message || e});
  }
};

module.exports = update;
