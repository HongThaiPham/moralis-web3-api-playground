"use client";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import axios from "axios";
import { bscTestnet } from "wagmi/chains";

export default function AuthByMetamask() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleAuth = async () => {
    //disconnects the web3 provider if it's already active
    if (isConnected) {
      await disconnectAsync();
    }
    // enabling the web3 provider metamask
    const { account, chain } = await connectAsync({
      connector: new InjectedConnector({
        chains: [bscTestnet],
      }),
    });

    const userData = { address: account, chain: chain.id, network: "evm" };

    // making a post request to our 'request-message' endpoint
    const { data } = await axios.post(`/api/request-message`, userData);
    const { message } = data.message;
    // signing the received message via metamask
    const signature = await signMessageAsync({ message });

    await axios.post(
      `/api/verify`,
      {
        message,
        signature,
      },
      { withCredentials: true } // set cookie from Express server
    );
  };

  return (
    <div>
      <h1>AuthByMetamask</h1>
      <button
        onClick={handleAuth}
        className="bg-orange-500 px-4 py-2 text-white rounded-md"
      >
        Connect with Metamask
      </button>
    </div>
  );
}
