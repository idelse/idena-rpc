module.exports = {
  target: "http://localhost:9009",
  apiExplorer: "https://api.idena.org",
  apiKey: "<insert content of datadir/api.key file>",
  port: 80,
  whitelist: [
    "dna_identity",
    "dna_epoch",
    "dna_getBalance",
    "bcn_transaction",
    "bcn_transactions",
    "bcn_pendingTransactions",
    "bcn_syncing",
    "bcn_sendRawTx",
    "bcn_feePerGas",
    'dna_ceremonyIntervals',
    'dna_isValidationReady',
    'dna_wordsSeed',
    'flip_getRaw',
    'flip_getKeys',
    'flip_words',
    'flip_shortHashes',
    'flip_longHashes',
    'flip_privateEncryptionKeyCandidates',
    'flip_sendPrivateEncryptionKeysPackage',
    'flip_sendPublicEncryptionKey',
    'bcn_getRawTx'
  ]
};
