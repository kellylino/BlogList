const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}


const userExtractor = (request, response, next) => {
  if (request.token === null) {
    return response.status(401).json(
      ' Unauthorized. Token missing or invalid'
    )
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  request.userId = decodedToken.id
  next()
}

module.exports = {
  tokenExtractor,
  userExtractor
}