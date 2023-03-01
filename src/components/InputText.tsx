type Props = {
  className?: string;
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export default function InputText({ className, label, ...props }: Props) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">{label}</label>
      <input
        className={`px-4 py-2 rounded-md border border-gray-300 transition-colors duration-500 ${className}`}
        {...props}
      />
    </div>
  );
}
