import { SessionKit } from "@wharfkit/session";
import { WebRenderer } from "@wharfkit/web-renderer";
import { WalletPluginAnchor } from "@wharfkit/wallet-plugin-anchor";
import { WalletPluginCloudWallet } from "@wharfkit/wallet-plugin-cloudwallet";
import { WalletPluginScatter } from "@wharfkit/wallet-plugin-scatter";
import { WalletPluginWombat } from "@wharfkit/wallet-plugin-wombat";
import config from "../data/config.json";

const webRenderer = new WebRenderer({ minimal: true });
const network = config.networks[config.currentNetwork];

export const sessionKit = new SessionKit({
  appName: config.appName,
  chains: [
    {
      id: network.chainId,
      url: network.endpoints.chain[0]
    },
  ],
  ui: webRenderer,
  walletPlugins: [
    new WalletPluginAnchor(),
    new WalletPluginCloudWallet(),
    new WalletPluginScatter(),
    new WalletPluginWombat(),
  ],
});

export const checkWharfLogin = async (setTxModalText) => {
  let sessionString = localStorage.getItem("wharf--session");
  if (sessionString == null) {
    setTxModalText(
      "You are not logged in. Click the wallet icon in the top menu"
    );
  }
};

let session;

export const logInWithWharfkit = async (setCurrentUsername, setWharfSession) => {
  const response = await sessionKit.login();
  session = response.session;
  let this_user = session.actor.toString();
  let wallet_provider = session.walletPlugin.id;
  setCurrentUsername(this_user);
  localStorage.setItem("waxAccount", this_user);
  localStorage.setItem("walletProvider", wallet_provider);
  setWharfSession(session);
  location.reload();
};

export const logOutWharfkit = async (setCurrentUsername, setWharfSession) => {
  await sessionKit.logout();
  session = undefined;
  setCurrentUsername("");
  localStorage.removeItem("waxAccount");
  localStorage.removeItem("walletProvider");
  setWharfSession(null);
  location.reload();
};

export const switchWharfAccount = async (
  newAccount,
  newPermission,
  newWalletProvider,
  setCurrentUsername,
  setWharfSession
) => {
  const existingSessions =
    JSON.parse(localStorage.getItem("wharf--sessions")) || [];

  const foundSession = existingSessions.find(
    (session) =>
      session.actor === newAccount &&
      session.permission === newPermission &&
      session.walletPlugin.id === newWalletProvider
  );

  if (!foundSession) return;

  localStorage.setItem("wharf--session", JSON.stringify(foundSession));

  localStorage.setItem("waxAccount", newAccount);
  localStorage.setItem("walletProvider", newWalletProvider);

  setCurrentUsername(newAccount);
  setWharfSession(foundSession);

  location.reload();
};

export const removeWharfSession = (
  accountToRemove,
  permissionToRemove,
  walletProviderToRemove,
  setSessions
) => {
  const existingSessions =
    JSON.parse(localStorage.getItem("wharf--sessions")) || [];

  const sessionIndex = existingSessions.findIndex(
    (session) =>
      session.actor === accountToRemove &&
      session.permission === permissionToRemove &&
      session.walletPlugin.id === walletProviderToRemove
  );

  if (sessionIndex !== -1) {
    existingSessions.splice(sessionIndex, 1);
    localStorage.setItem("wharf--sessions", JSON.stringify(existingSessions));
  }

  fetchSessionsFromLocalStorage(setSessions);
};

export const fetchSessionsFromLocalStorage = (setSessions) => {
  const storedSessions =
    JSON.parse(localStorage.getItem("wharf--sessions")) || [];
  setSessions(storedSessions);
};
