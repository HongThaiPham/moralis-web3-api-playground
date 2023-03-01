import AuthByMetamask from "@/components/auth/AuthByMetamask";

export default function Page() {
  return (
    <div>
      <h1>Authentication Method</h1>
      <p>Choose your authentication method:</p>
      <div className="border border-white/20 p-3">
        <AuthByMetamask />
      </div>
    </div>
  );
}
