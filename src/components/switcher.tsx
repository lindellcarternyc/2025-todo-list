interface SwitcherProps {
  name: string;
  id: string;
  checked: boolean;
  onChange: () => void;
}

export default function Switcher({
  checked,
  onChange,
  name,
  id,
}: SwitcherProps) {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          name={name}
          id={id}
          title="Switcher"
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <div className={`block h-8 w-14 rounded-full bg-[#E5E7EB]`}></div>
        <div
          className={`dot absolute ${
            checked ? "right-1" : "left-1"
          } top-1 h-6 w-6 rounded-full ${
            checked ? "bg-blue-500" : "bg-white"
          } transition`}
        ></div>
      </div>
    </label>
  );
}
