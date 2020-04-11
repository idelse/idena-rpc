module.exports = {
    target: "http://localhost:9009",
    apiKey: "",
    port: 80,
    whitelist: [

	    // Show info about identity for given address
	    "dna_identity",
	    
	    // Details about the current epoch
	    "dna_epoch",
	    
	    // Show DNA balance for address
	    "dna_getBalance",
	    
	    // Details about a specific transaction
	    "bcn_transaction",
	    
	    // List specific number of transactions for given address
	    "bcn_transactions",
	    
	    // List specific number of pending transactions for given address
	    "bcn_pendingTransactions",
	    
	    // Show if node is synchronized
	    "bcn_syncing",
	    
	    // https://github.com/idena-network/idena-go/blob/85b088d704fe6b2dcd8832df2da598b5f729ea06/api/blockchain_api.go#L208
	    "bcn_SendRawTx",

    ]
};
