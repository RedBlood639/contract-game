"use strict";

let ApiPromise = null;
let gameController = null;

function maybeLoad() {
    if (document.readyState == "loading") {
        document.addEventListener("DOMContentLoaded", (event) => {
            onLoad();
        });
    } else {
        onLoad();
    }
}

function onLoad() {
    loadApis();

    gameController = {
    };

    initPage();
}

function loadApis() {
    console.assert(document.apiBundle);

    ApiPromise = document.apiBundle.ApiPromise;

    console.assert(ApiPromise);

    console.log(ApiPromise);
}

function initPage() {
    if (document.getElementById("account-page") != null) {
        initAccountPage();
    }
}

function initAccountPage() {
    let walletStatusSpan = document.getElementById("wallet-status");
    let walletConnectButton = document.getElementById("wallet-connect");
    let accountIdSpan = document.getElementById("account-id");
    let accountStatusSpan = document.getElementById("account-status");
    let createAccountButton = document.getElementById("create-account");
    let accountLevelSpan = document.getElementById("account-level");

    console.assert(walletStatusSpan);
    console.assert(walletConnectButton);
    console.assert(accountIdSpan);
    console.assert(accountStatusSpan);
    console.assert(createAccountButton);
    console.assert(accountLevelSpan);

    walletConnectButton.disabled = false;

    walletConnectButton.addEventListener("click", (event) => {
    });
}





maybeLoad();