const jwt = require('jsonwebtoken');
const Utils = require('../utils/sendResponse')
const { SuccessMassage, ErrorMessage } = require('../constants/messages.js');
const statusCode = require('../constants/statusCodes.js');


exports.authenticate = async (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    if (auth) {
      let token = auth.split(" ");
      if (token[0] == 'Bearer') {

        const { exp: expiresIn } = jwt.decode(token[1])
        const now = new Date().toISOString();
        const expiryDate = new Date(expiresIn * 1000).toISOString();
        const isExpired = now > expiryDate;
        // If token is expired, deny access
        if (isExpired) {
          return Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.TOKEN_EXPIRE);
        }
        req.currUser = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
        if (req.currUser) {
          next();
        }

        else {
          Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
        }
      } else {
        Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
      }
    } else {
      Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
    }

  } catch (error) {
    console.log(error);
    Utils.sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INVALID_TOKEN);
  }

}

exports.authenticateAdmin = async (req, res) => {
  const auth = req.headers.authorization;
  try {
    if (auth) {
      let token = auth.split(" ");
      if (token[0] == 'Bearer') {

        const { exp: expiresIn } = jwt.decode(token[1])
        const now = new Date().toISOString();
        const expiryDate = new Date(expiresIn * 1000).toISOString();
        const isExpired = now > expiryDate;
        // If token is expired, deny access
        if (isExpired) {
          return Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.TOKEN_EXPIRE);
        }
        req.currUser = jwt.verify(token[1], process.env.JWT_SECRET_KEY);
        if (req.currUser) {
          return true
        }

        else {
          Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
        }
      } else {
        Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
      }
    } else {
      Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
    }

  } catch (error) {
    console.log(error);
    Utils.sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INVALID_TOKEN);
  }

}


exports.authAdmin = async (req, res, next) => {

  try {

    const isTokenVaild = await this.authenticateAdmin(req, res)

    if (isTokenVaild) {

      if (req.currUser.role == "admin") {
        next()
      } else {
        Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED_USER);
      }

    }

  } catch (error) {
    console.log(error);
    Utils.sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INVALID_TOKEN);
  }


}

exports.authenticateReset = async (req, res, next) => {
  const auth = req.params.id;
  try {
    if (auth) {
     
      let token = auth
      if (token) {
        const result = jwt.decode(token)
        const { exp } = jwt.decode(token)
        const now = new Date().toISOString();
        const expiryDate = new Date(exp * 1000).toISOString();
        const isExpired = now > expiryDate;
        // If token is expired, deny access
        if (isExpired) {
          return Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.TOKEN_EXPIRE);
        }
        req.currUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (req.currUser) {
          next();
        }

        else {
          Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
        }
      } else {
        Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
      }
    } else {
      Utils.sendResponse(res, statusCode.UNAUTHORIZED, false, ErrorMessage.UNAUTHORIZED);
    }

  } catch (error) {
    console.log(error);
    Utils.sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INVALID_TOKEN);
  }

}