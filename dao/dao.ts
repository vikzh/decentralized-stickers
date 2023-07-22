import {
  Client,
  CreateDaoParams,
  DaoCreationSteps,
  DaoMetadata,
  TokenVotingClient,
  TokenVotingPluginInstall,
  VotingMode,
} from "@aragon/sdk-client";
import { GasFeeEstimation } from "@aragon/sdk-client-common";
import { context } from "../index";

// Insantiate the general purpose client from the Aragon OSx SDK context.
const client: Client = new Client(context);

// You can do different types of installations, depending on your needs.
// For ex, these would be the plugin params if you want to use an already-existing ERC20 token.
const tokenVotingPluginInstallParams1: TokenVotingPluginInstall = {
  votingSettings: {
    minDuration: 60 * 60 * 24 * 2, // seconds (minimum amount is 3600)
    minParticipation: 0.25, // 25%
    supportThreshold: 0.5, // 50%
    minProposerVotingPower: BigInt("5000"), // default 0
    votingMode: VotingMode.STANDARD, // default standard, other options: EARLY_EXECUTION, VOTE_REPLACEMENT
  },
  useToken: {
    tokenAddress: "0xb7b31a6bc18e48888545ce79e83e06003be70930", // contract address of the token to use as the voting token
    wrappedToken: {
      name: "Wrapped ApeCoin", // the name of your token
      symbol: "gApe", // the symbol for your token. shouldn't be more than 5 letters
    },
  },
};

// Creates a TokenVoting plugin client with the parameteres defined above (with an existing token).
const tokenVotingPluginInstallItem1 = TokenVotingClient.encoding
  .getPluginInstallItem(tokenVotingPluginInstallParams1);

const daoMetadata: DaoMetadata = {
  name: "Decentralized Stickers",
  description: "Telegram Stickers managed by the community",
  avatar: "",
  links: [{
    name: "Web site",
    url: "https://...",
  }],
};

// Pins the DAO's metadata in IPFS to get back the URI.
const metadataUri: string = await client.methods.pinMetadata(daoMetadata);

const createParams: CreateDaoParams = {
  metadataUri,
  ensSubdomain: "decentralized-stickers", // my-org.dao.eth
  plugins: [tokenVotingPluginInstallItem1, tokenVotingPluginInstallItem2], // optional, this will determine the plugins installed in your DAO upon creation. 1 is mandatory, more than that is optional based on the DAO's needs.
};

// Estimate how much gas the transaction will cost.
const estimatedGas: GasFeeEstimation = await client.estimation.createDao(
  createParams,
);
console.log({ avg: estimatedGas.average, max: estimatedGas.max });

// Create the DAO with the two token voting plugins installed. This means that the DAO will be able to use either of the two tokens to vote depending on which TokenVoting plugin created the proposal.
const steps = client.methods.createDao(createParams);

for await (const step of steps) {
  try {
    switch (step.key) {
      case DaoCreationSteps.CREATING:
        console.log({ txHash: step.txHash });
        break;
      case DaoCreationSteps.DONE:
        console.log({
          daoAddress: step.address,
          pluginAddresses: step.pluginAddresses,
        });
        break;
    }
  } catch (err) {
    console.error(err);
  }
}