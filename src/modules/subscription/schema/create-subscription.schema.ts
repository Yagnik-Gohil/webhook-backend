import * as Joi from 'joi';

export const createSubscriptionSchema = Joi.object({
  source: Joi.string().uuid().required(),
  events: Joi.array().items(Joi.string()).required().min(1),
  callback_url: Joi.string().required(),
});
