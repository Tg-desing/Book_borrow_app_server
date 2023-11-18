const fs = require('fs');
const crypto = require('crypto');

function generateSecretKey() {
	return crypto.randomBytes(32).toString('hex');
}

function updateSecretKey() {
	const newSecretKey = generateSecretKey();
	fs.writeFileSync('.env', `SECRET_KEY=${newSecretKey}\n`);
	console.log('Secret key updated:', newSecretKey);
}

// 초기 실행
exports.updateSecretKey = updateSecretKey;
