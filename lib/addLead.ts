import { Contact } from "@/app/actions";
import Sentry from "@sentry/nextjs";
import { z } from "zod";

if (!process.env.MONDAY_API_TOKEN) {
  throw new Error("Please provide MONDAY_API_TOKEN in your environment.");
}

const ADD_CLIENT_MUTATION = `
mutation addClient($name: String!, $columnValues: JSON!) {
  create_item(
    board_id: 7002702691
    item_name: $name
    column_values: $columnValues
  ) {
    id
  }
}
`;
const ADD_UPDATE_MUTATION = `
  mutation addUpdate($id: ID $message: String!) {
  create_update (item_id: $id, body: $message) {
    id
  }
}
`;
const MONDAY_URL = new URL("https://api.monday.com/v2/");
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Authorization: process.env.MONDAY_API_TOKEN,
  "API-Version": "2024-07",
} as const;

const schema = z.object({
  data: z.object({ create_item: z.object({ id: z.coerce.number() }) }),
});

async function executeMondayMutation(
  query: string,
  variables?: Record<string, any>,
) {
  return await fetch(MONDAY_URL, {
    method: "POST",
    cache: "no-cache",
    headers: DEFAULT_HEADERS,
    body: JSON.stringify({ query, variables }),
  });
}

export async function addNewLead(contact: Contact) {
  const response = await executeMondayMutation(ADD_CLIENT_MUTATION, {
    name: `${contact.firstName} ${contact.lastName}`,
    columnValues: JSON.stringify({
      status: "New Lead",
      // Monday requires this formatting for type email
      // The second string determines the value that is visible to us in Monday.com and can't be left empty
      email: `${contact.email} ${contact.email}`,
      text8: contact.website || "",
      phone: contact.phone || "",
    }),
  });

  if (!response.ok) {
    Sentry.captureMessage(
      `Error adding new lead to Monday: ${response.status} ${response.statusText}`,
      "error",
    );
  }

  const item = schema.safeParse(await response.json());

  if (item.success && contact.message && contact.message !== "") {
    await executeMondayMutation(ADD_UPDATE_MUTATION, {
      id: item.data.data.create_item.id,
      message: contact.message,
    });
  } else {
    const message = "There was an error adding a new lead to the Monday CRM";
    console.error(message);
    Sentry.captureMessage(message);
  }
}
