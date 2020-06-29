const auth = {
  renderPage: (req, res) => {
    res.send('Authorized route...')
  }
}

module.exports = auth;