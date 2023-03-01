type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return <div className="flex flex-col min-h-screen">{children}</div>;
}
