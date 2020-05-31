const fetch = require("node-fetch");
const { target, apiExplorer, apiKey } = require("../config");

async function isNodeUp () {
  return fetch(target, {
    timeout: 5000,
    method: 'post',
    body:    JSON.stringify({
      method: "bcn_syncing",
      id: 1,
      key: apiKey,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(r => r.json())
    .then(r => !r.result.syncing && !r.result.wrongTime)
    .catch(r => false);
}

async function getNodeHighestBlock () {
  return fetch(target, {
    timeout: 5000,
    method: 'post',
    body:    JSON.stringify({
      method: "bcn_syncing",
      id: 1,
      key: apiKey,
    }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(r => r.json())
    .then(r => parseInt(r.result.highestBlock))
    .catch(r => 0);
}

async function getApiHighestBlock () {
  const epoch = await fetch(`${apiExplorer}/api/Epoch/last`, { timeout: 5000 })
    .then(r => r.json())
    .then(r => parseInt(r.result.epoch))
    .catch(() => 0);
  if (epoch === 0)
    return 0;
  return fetch(`${apiExplorer}/api/Epoch/${epoch}/Blocks?skip=0&limit=1`)
    .then(r => r.json())
    .then(r => {
      return r.result[0].height;
    })
    .catch(r => 0);
}

module.exports = async function isNodeSynced () {

  // 1. If node is down, node can't be synced
  const nodeHighestBlock = await getNodeHighestBlock();
  const isNodeDown = nodeHighestBlock === 0;
  if (isNodeDown)
    return {
      latestBlock: 0,
      synced: false,
    };

  // 2. If apiHighestBlock is greater than nodeHighestBlock
  // node can't be synced. (-3 is delta blocks)
  const apiHighestBlock = await getApiHighestBlock();
  if (nodeHighestBlock < apiHighestBlock - 3)
    return {
      latestBlock: nodeHighestBlock,
      synced: false,
    }

  // 3. If APIs are down and node is up, node is synced.
  const nodeIsUp = await isNodeUp();
  const isApiDown = apiHighestBlock === 0;
  if (isApiDown && !nodeIsUp)
    return {
      latestBlock: nodeHighestBlock,
      synced: false,
    }

  // 4. If APIs are down and node is not synced, node is synced.
  return {
    latestBlock: nodeHighestBlock,
    synced: true,
  }

}
