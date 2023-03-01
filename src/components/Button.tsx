import LoadingCircle from "./LoadingCircle";

type Props = {
  className?: string;
  isLoading?: boolean;
  label: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  className,
  label,
  isLoading,
  ...props
}: Props) {
  return (
    <button
      className={`px-4 py-2 rounded-md flex items-center hover:bg-indigo-500 hover:text-white border border-indigo-500 transition-colors duration-500 ${className}`}
      {...props}
    >
      {isLoading && <LoadingCircle />}
      {label}
    </button>
  );
}
