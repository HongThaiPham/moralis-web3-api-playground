"use client";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import axios from "axios";
import { bscTestnet } from "wagmi/chains";
import { useEffect, useState } from "react";
import LoadingCircle from "../LoadingCircle";

export default function AuthByMetamask() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);
  const [authData, setAuthData] = useState<any>(null);
  const handleAuth = async () => {
    try {
      setLoading(true);
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
      const { data: requestMessage } = await axios.post(
        `/api/request-message`,
        userData
      );

      const { message } = requestMessage;
      // signing the received message via metamask
      const signature = await signMessageAsync({ message });

      const { data: requestVerify } = await axios.post(
        `/api/verify`,
        {
          message,
          signature,
        },
        { withCredentials: true } // set cookie from Express server
      );
      setAuthData(requestVerify.user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getAuthData = async () => {
    if (isConnected)
      try {
        setLoading(true);
        const { data } = await axios(`/api/authenticate`, {
          withCredentials: true,
        });
        const { iat, ...authData } = data; // remove unimportant iat value
        setAuthData(authData);
      } catch (error) {
      } finally {
        setLoading(false);
      }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await disconnectAsync();
      await axios(`/api/logout`, {
        withCredentials: true,
      });
      setAuthData(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="border border-orange-500 rounded-md">
      <h1 className="uppercase p-2 mb-2 border-b bg-orange-500 text-white">
        Auth by Metamask
      </h1>
      <div className="p-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleAuth}
            className="bg-orange-500 px-4 py-2 text-white rounded-md flex items-center"
          >
            {loading && <LoadingCircle />} Connect with Metamask
          </button>{" "}
          {isConnected && authData && (
            <button
              onClick={handleLogout}
              className="bg-orange-500 px-4 py-2 text-white rounded-md flex items-center"
            >
              {loading && <LoadingCircle />} Logout
            </button>
          )}
        </div>

        {authData && (
          <div className="mt-2">
            <p className="text-sm">You are logged in as:</p>
            <p className="text-sm">
              <span className="font-bold">Address:</span>{" "}
              {authData.metadata.address}
            </p>
            <p className="text-sm">
              <span className="font-bold">Chain:</span>{" "}
              {authData.metadata.chainId}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
