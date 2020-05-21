const bcrypt = require('bcryptjs');

module.exports = {
  async compare(passwordGiven, passwordDB) {
    const isMatch = await bcrypt.compare(passwordGiven, passwordDB);

    return isMatch;
  },
};
