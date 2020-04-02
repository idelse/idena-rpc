const app = require("express")();
const proxy = require("express-http-proxy");
const { target, apiKey, port } = require("./config");

const whitelist = [

    // List all identities (not only validated ones)
    "dna_identities",

    // Show info about identity for given address
    "dna_identity",

    // Details about the current epoch
    "dna_epoch",

    // Show info about validation ceremony
    "dna_ceremonyIntervals",

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

    // Show node version
    "dna_version",

    // https://github.com/idena-network/idena-go/blob/85b088d704fe6b2dcd8832df2da598b5f729ea06/api/blockchain_api.go#L208
    "bcn_SendRawTx",

];

app.use(proxy(target, {

    proxyReqBodyDecorator: (bodyContent) => {
        const body = JSON.parse(bodyContent);
        if (whitelist.includes(body.method)) {
            return {
                ...body,
                key: apiKey,
            };
        }
        return body;
    },

}));

app.listen(port);