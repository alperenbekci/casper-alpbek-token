const { CEP18Client } = require("casper-cep18-js-client");
const { Keys, CLPublicKey } = require("casper-js-sdk");
const WebSocket = require("ws");

// Config
const NODE_URL = "https://event-store-api-clarity-testnet.make.services/rpc";
const NETWORK_NAME = "casper-test";
const CEP18_CONTRACT_PACKAGE_HASH =
  "4e48d2df9457f9179c7b434db02adfe737799a4a073447bd07d73d48266b811b";
const CEP18_CONTRACT_HASH =
  "bd4a78f29240ee30c8d1f76f1e811268eff02f606e3c7bc19d326aa30ea69674";
const PAYMENT_CONTRACT_HASH =
  "63dd9fa7abc0dfead30bc483ca845e1349eb010aa69f154a8674da53b422e69e";
const CSPR_CLOUD_KEY = "e5f28f67-e9d1-4fc7-ad53-e123595bee7e";
const CSPR_CLOUD_STREAMING_URL = "wss://streaming.testnet.cspr.cloud";
const CSPR_CLOUD_REST_API_URL = "https://api.testnet.cspr.cloud";

const owner = Keys.Ed25519.parseKeyFiles(
  `../keys/public_key.pem`,
  `../keys/secret_key.pem`
);
const cep18 = new CEP18Client(NODE_URL, NETWORK_NAME);
cep18.setContractHash("hash-" + CEP18_CONTRACT_HASH);

// WebSocket Client
const ws = new WebSocket(
  CSPR_CLOUD_STREAMING_URL +
    "/contract-events?contract_hash=" +
    PAYMENT_CONTRACT_HASH +
    "&includes=raw_data"
);
ws.on("open", function open() {
  ws.on("message", function message(data) {
    console.log(data);
    if (data === "Ping") {
      return;
    }
    try {
      let event = JSON.parse(data);
      let eventType = event.data.name;
      console.log(eventType + " Event Received...");
      if (eventType === "Payment") {
        let recipient = event.data.data.recipient;
        console.log("Recipient: " + recipient);
        console.log(
          "CSPR Paid: " +
            Math.round(event.data.data.amount / 1000000000) +
            " CSPR"
        );

        // create a mint deploy to deliver the alpbek tokens
        const deploy = cep18.mint(
          {
            owner: CLPublicKey.fromHex(recipient),
            amount: 50000000,
          },
          450_000_000,
          owner.publicKey,
          NETWORK_NAME,
          [owner]
        );
        deploy.send(NODE_URL);
        console.log("Tokens sent to recipient");
      }
    } catch (e) {
      console.log(e);
    }
  });
});

// API Server
const cors = require("cors");
const express = require("express");
const e = require("express");
const app = express();
const port = 3001;
app.use(
  cors({ origin: "http://localhost:3000", methods: "GET,PUT,POST,OPTIONS" })
);

app.get("/token-activity", (req, res) => {
  const url =
    CSPR_CLOUD_REST_API_URL +
    "/contract-packages/" +
    CEP18_CONTRACT_PACKAGE_HASH +
    "/ft-token-actions?includes=to_public_key";

  fetch(url, {
    headers: {
      "Content-Type": "application/json",
      authorization: CSPR_CLOUD_KEY,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      res.type("json");
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`alpbek Server App listening on port ${port}`);
});
