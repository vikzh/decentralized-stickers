import { Client, DaoDetails } from "@aragon/sdk-client";
import { context } from "./index";

const main = async () => {
// Instantiate the general purpose client from the Aragon OSx SDK context.
const client: Client = new Client(context);

// Address or ENS of the DAO whose metadata you want to retrieve.
const daoAddressOrEns: string = "0x16f9891b5f290cf1aacbdaea3c0c8328480201a6"; // test.dao.eth

// Get a DAO's details.
const dao: DaoDetails = await client.methods.getDao(daoAddressOrEns);
console.log(dao);
}

main();