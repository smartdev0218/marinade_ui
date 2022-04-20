import { PublicKey } from "@solana/web3.js";

export type Action = {
  type: ActionType;
  item: any;
};

export enum ActionType {
  CommonTriggerShutdown,
  CommonDidShutdown,
  CommonWalletDidConnect,
  CommonWalletDidDisconnect,
  CommonWalletSetProvider,
  CommonSetNetwork,
}

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  let newState = {
    common: { ...state.common },
  };
  switch (action.type) {
    case ActionType.CommonWalletSetProvider:
      newState.common.walletProvider = action.item.walletProvider;
      return newState;
    case ActionType.CommonWalletDidConnect:
      newState.common.isWalletConnected = true;
      return newState;
    case ActionType.CommonWalletDidDisconnect:
      newState.common.isWalletConnected = false;
      return newState;
    case ActionType.CommonSetNetwork:
      if (newState.common.network.label !== action.item.network.label) {
        newState.common.network = action.item.network;
      }
      return newState;
    default:
      return newState;
  }
}

export type State = {
  common: CommonState;
};

export type CommonState = {
  walletProvider?: string;
  isWalletConnected: boolean;
  network: Network;
};

export const networks: Networks = {
  mainnet: {
    // Cluster.
    label: "marinade.rpcpool.com",
    url: "https://marinade.rpcpool.com",
    explorerClusterSuffix: "",
    multisigProgramId: new PublicKey(
      "H88LfRBiJLZ7wYkHGuwkKTaijfQxexq8JvzUndu7fyjL"
    ),
    multisigUpgradeAuthority: new PublicKey(
      "EYpNb3zURb2C9TuVexxV5kf5mwsDc5ziSJJKyKF2wJTW"
    ),
    defaultMultisig: new PublicKey(
      "9aN4drMhmd8AX3eRdYvH1gbZiPmwgGJfjvneCECF97HD" // multisig-4 treasury
      // "7mSA2bgzmUCi4wh16NQEfT76XMqJULni6sheZRCjcyx7" // multisig-3 admin
    ),
  },
  mainnet1: {
    // Cluster.
    label: "Mainnet Beta",
    url: "https://api.mainnet-beta.solana.com",
    explorerClusterSuffix: "",
    multisigProgramId: new PublicKey(
      "H88LfRBiJLZ7wYkHGuwkKTaijfQxexq8JvzUndu7fyjL"
    ),
    multisigUpgradeAuthority: new PublicKey(
      "EYpNb3zURb2C9TuVexxV5kf5mwsDc5ziSJJKyKF2wJTW"
    ),
    defaultMultisig: new PublicKey(
      "9aN4drMhmd8AX3eRdYvH1gbZiPmwgGJfjvneCECF97HD" // multisig-4 treasury
      // "7mSA2bgzmUCi4wh16NQEfT76XMqJULni6sheZRCjcyx7" // multisig-3 admin
    ),
  },
  testnet: {
    // Cluster.
    label: "Testnet",
    url: "https://api.testnet.solana.com",
    explorerClusterSuffix: "devnet",
    multisigProgramId: new PublicKey(
      "H88LfRBiJLZ7wYkHGuwkKTaijfQxexq8JvzUndu7fyjL"
      //"A6ZR2g7UiGobEr2YkRxd1HSbc5PoKMnyDGAKh2JkWgMg"
    ),
    multisigUpgradeAuthority: new PublicKey(
      "EYpNb3zURb2C9TuVexxV5kf5mwsDc5ziSJJKyKF2wJTW"
    ),
    defaultMultisig: new PublicKey(
      "7mSA2bgzmUCi4wh16NQEfT76XMqJULni6sheZRCjcyx7" // multisig-3 admin
      //"EYpNb3zURb2C9TuVexxV5kf5mwsDc5ziSJJKyKF2wJTW" // multisig-1 upgrade multisig
      //"6FhtU8Q9bbuhKeRDFL7H7NeMxa1EqL5KP7HU9XRGSyRy" // multisig-2 upgrade marinade
      //"7mSA2bgzmUCi4wh16NQEfT76XMqJULni6sheZRCjcyx7" // multisig-3 admin
      //"9aN4drMhmd8AX3eRdYvH1gbZiPmwgGJfjvneCECF97HD" // multisig-4 treasury
    ),
  },
  devnet: {
    // Cluster.
    label: "Devnet",
    url: "https://api.devnet.solana.com",
    explorerClusterSuffix: "devnet",
    multisigProgramId: new PublicKey(
      "H88LfRBiJLZ7wYkHGuwkKTaijfQxexq8JvzUndu7fyjL"
    ),
  },
  // Fill in with your local cluster addresses.
  localhost: {
    // Cluster.
    label: "Localhost",
    url: "http://localhost:8899",
    explorerClusterSuffix: "localhost",
    multisigProgramId: new PublicKey(
      "H88LfRBiJLZ7wYkHGuwkKTaijfQxexq8JvzUndu7fyjL"
    ),
  },
};

export const initialState: State = {
  common: {
    isWalletConnected: false,
    walletProvider: "https://www.sollet.io",
    network: networks.mainnet,
  },
};

type Networks = { [label: string]: Network };

export type Network = {
  // Cluster.
  label: string;
  url: string;
  explorerClusterSuffix: string;
  multisigProgramId: PublicKey;
  defaultMultisig?: PublicKey;
  multisigUpgradeAuthority?: PublicKey;
};
