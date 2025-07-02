export default function FormInput({
  id,
  label = "",
  type,
  value,
  onChange,
  placeholder,
  required,
  error,
}) {
  return (
    <div className="mt-2.5  ">
      {label ? (
        <label className=" block font-medium text-[16px]" htmlFor={id}>
          {label}
        </label>
      ) : null}

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className=" w-full border rounded-sm p-2 mt-2"
        required={required}
      />
      {error && <span>{error}</span>}
    </div>
  );
}
