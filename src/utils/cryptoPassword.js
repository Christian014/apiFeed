const bcrypt = require('bcrypt');
const saltRounds = 10;

class Crypto{
    constructor(passwordHash) {
        this.passwordHash = passwordHash;
      }

    async cryptoPassword(password){
        const passwordHash = await  bcrypt.hash(password, saltRounds);
        return passwordHash
    }

    async cryptoCompare(password, hash){
        const compare = await bcrypt.compare(password, hash)
        return compare
    }
}

module.exports = Crypto;