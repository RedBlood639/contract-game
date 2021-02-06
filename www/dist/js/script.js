"use strict";

let polkadot = null;
let gameController = null;

function maybeLoad() {
    window.addEventListener("load", (event) => {
        onLoad();
    });
}

function onLoad() {
    loadApis();

    gameController = {
    };

    initPage();
}

function loadApis() {
    console.assert(document.polkadotApiBundle);
    polkadot = document.polkadotApiBundle;
}

function initPage() {
    initAccountPage();
}

function initAccountPage() {
    let nodeStatusSpan = document.getElementById("node-status");
    let nodeConnectButton = document.getElementById("node-connect");

    let keyringStatusSpan = document.getElementById("wallet-status");
    let walletConnectButton = document.getElementById("wallet-connect");
    let accountIdSpan = document.getElementById("account-id");
    let accountStatusSpan = document.getElementById("account-status");

    let createGameAccountButton = document.getElementById("create-game-account");
    let gameAccountLevelSpan = document.getElementById("account-level");

    nodeConnectButton.disabled = false;

    nodeConnectButton.addEventListener("click", (event) => {
        setInnerMessageNeutral(nodeStatusSpan, "waiting");
        nodeConnectButton.disabled = true;
        nodeConnect()
            .then((msg) => {
                setInnerMessageSuccess(nodeStatusSpan, msg);
            })
            .catch((error) => {
                setInnerMessageFail(nodeStatusSpan, error);
                nodeConnectButton.disabled = false;
            });
    });
}

async function nodeConnect() {
    let addr = "ws://127.0.0.1:9944"
    console.log(`Trying to connect to ${addr}`);
    
    const provider = new polkadot.WsProvider(addr);
    const api = await polkadot.ApiPromise.create({ provider });

    const [chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);

    let msg = `Connected to ${chain} using ${nodeName} v${nodeVersion}`;
    console.log(msg);
    return msg;
}

function setInnerMessageSuccess(elt, msg) {
    elt.innerText = msg;
    elt.classList.remove("msg-fail");
    elt.classList.add("msg-success");
}

function setInnerMessageFail(elt, msg) {
    elt.innerText = msg;
    elt.classList.remove("msg-success");
    elt.classList.add("msg-fail");
}

function setInnerMessageNeutral(elt, msg) {
    elt.innerText = msg;
    elt.classList.remove("msg-success");
    elt.classList.remove("msg-fail");
}







maybeLoad();
