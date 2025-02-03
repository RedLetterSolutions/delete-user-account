import { copilotApi } from "copilot-node-sdk";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const copilot = copilotApi({
	  apiKey: '9b7c3cbf8db741d597acad6e57b6960c.37aa52274364203b',
	  token: "token" in searchParams && typeof searchParams.token === "string"
      ? searchParams.token
      : undefined,
  });

  const tokenObject = copilot && copilot.getTokenPayload ? await copilot.getTokenPayload() : undefined;
  const clientId = tokenObject?.clientId

  // copilot.deleteClient({ id: clientId });
  // const clients = await copilot.retrieveClient({ id: clientId });
  return (
    <div>
      <h1>Client ID: {clientId}</h1>
      {/* <h2>Clients: {clients}</h2> */}
    </div>
  );

};

