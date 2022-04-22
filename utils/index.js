const sendError = (err) => {
  return err
}

const sendSuccess = (message, data) => {
  return {
      message,
      data: data
  }
}

module.exports = {
  sendError,
  sendSuccess,
}