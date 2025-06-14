import { capitalize } from "../utils";

interface TextInputProps {
  name: string;
  id: string;
  value: string;
  onChange(value: string): void;
}

export function TextInput({ name, id, value, onChange }: TextInputProps) {
  return (
    <div className="flex justify-between">
      <label htmlFor={id}>{`${capitalize(name)}: `}</label>
      <input
        type="text"
        name={name}
        id={id}
        className="border w-[85%] rounded-sm px-2"
        value={value}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChange(e.target.value);
        }}
      />
    </div>
  );
}
