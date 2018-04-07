import { check, validationResult } from 'express-validator/check'

export function notBlank(name) {
  return check(name)
  .exists().withMessage('必須です。')
  .not().isEmpty().withMessage('必須です。')
}

export function validate (rules, topMessage = '入力内容に誤りがあります。') {
  return [rules, function (req, res, next) {
    const errors = validationResult(req)

    if (errors.isEmpty()) {
      next()
    } else {
      res.status(400).json({ top: topMessage, fields: errors.mapped() })
    }
  }]
}
