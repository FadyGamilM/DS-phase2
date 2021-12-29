const crypto = require("crypto");

const access_token_key = crypto.randomBytes(32).toString("hex");
const refresh_token_key = crypto.randomBytes(32).toString("hex");

console.table({ access_token_key, refresh_token_key });

// whenever our app is hacked, we can change/re-generate a new key for each token
// so the old tokens will be invalid dierctly as the keys we generated are updated in .env
// so the tokens will be updated too
