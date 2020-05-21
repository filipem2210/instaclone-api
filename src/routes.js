const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const multer = require('multer');
const rateLimit = require('express-rate-limit');

const rateLimitConfig = require('./config/rateLimit');
const uploadConfig = require('./config/uploadFile');

const apiLimiter = rateLimit(rateLimitConfig);
const upload = multer(uploadConfig);

const authMiddleware = require('./app/middleware/auth');

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const PostController = require('./app/controllers/PostController');
const LikeController = require('./app/controllers/LikeController');

const router = express.Router();

router.post(
  '/signup',
  apiLimiter,
  upload.single('avatar'),
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().allow(''),
      username: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required().messages({
        'string.email': 'Email inválido',
      }),
      password: Joi.string().min(6).max(10).required(),
    }),
  }),
  UserController.create,
);

router.get(
  '/me',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  authMiddleware,
  UserController.show,
);

router.put(
  '/me/edit',
  upload.single('avatar'),
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      avatar: Joi.string().allow(''),
      username: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required().messages({
        'string.email': 'Email inválido',
      }),
    }),
  }),
  authMiddleware,
  UserController.update,
);

router.post(
  '/signin',
  apiLimiter,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required().messages({
        'string.email': 'Email inválido',
      }),
      password: Joi.string().min(6).max(10).required(),
    }),
  }),
  SessionController.create,
);

router.get(
  '/posts',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  authMiddleware,
  PostController.index,
);

router.post(
  '/posts',
  upload.single('image'),
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      image: Joi.string().allow(''),
      place: Joi.string().allow(''),
      description: Joi.string().required(),
      hashtags: Joi.string().allow(''),
    }),
  }),
  authMiddleware,
  PostController.create,
);

router.get(
  '/posts/:postID',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      postID: Joi.number().required(),
    }),
  }),
  authMiddleware,
  PostController.show,
);

router.put(
  '/posts/:postID',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      postID: Joi.number().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      place: Joi.string().allow(''),
      description: Joi.string().required(),
      hashtags: Joi.string().allow(''),
    }),
  }),
  authMiddleware,
  PostController.update,
);

router.delete(
  '/posts/:postID',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      postID: Joi.number().required(),
    }),
  }),
  authMiddleware,
  PostController.delete,
);

router.post(
  '/posts/:postID/like',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      postID: Joi.number().required(),
    }),
  }),
  authMiddleware,
  LikeController.create,
);

router.delete(
  '/posts/:postID/dislike',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: Joi.object().keys({
      postID: Joi.number().required(),
    }),
  }),
  authMiddleware,
  LikeController.delete,
);

module.exports = router;
