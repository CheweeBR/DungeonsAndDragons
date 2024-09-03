const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { collection: 'users' });

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.comparePassword = async function(password) {
    const compareSenha = await bcrypt.compare(password, this.password);
    console.log('Comparando senhas:', { senhaFornecida: password, hashArmazenado: this.password, compareSenha });
    return compareSenha; 
};

module.exports = mongoose.model('User', userSchema);
