import Link from "next/link";
import Button from "./Button";
import LoadingCircle from "./LoadingCircle";

type Props = {
  className?: string;
  isLoading?: boolean;
  label: string;
  href: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function LinkButton({
  className,
  label,
  isLoading,
  href,
  ...props
}: Props) {
  return (
    <Link href={href}>
      <Button
        className={className}
        label={label}
        isLoading={isLoading}
        {...props}
      />
    </Link>
  );
}
