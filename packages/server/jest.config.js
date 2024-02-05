const { name } = require('./package.json')

module.exports = {
  displayName: name,
  name,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  }
}
