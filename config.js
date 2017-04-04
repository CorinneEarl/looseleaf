
var dev = process.env.NODE_ENV === 'development'
module.exports = {
  'secret': 'ihatejavascript',
  'database': process.env.MONGODB_URI || 'mongodb://localhost/Looseleaf',
  'webpack': 'http://localhost:3000',
  'serverRoute':'http://localhost:3002/api',
  'deployed' : !dev,
  'saltRounds' : 10,
  'myPlaintextPassword' : 's0/\/\P4$$w0rD',
  'someOtherPlaintextPassword' : 'not_bacon',
  port : process.env.PORT || 3002
  // 'usernamePlaceholder': "User's Name"
}

/* Change lines 6 & 7 for deployment */
// 'webpack': !dev ? '/' : 'http://localhost:3000',
// 'serverRoute':!dev ? '/api' : 'http://localhost:3002/api',
