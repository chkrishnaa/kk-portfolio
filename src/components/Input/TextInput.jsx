import React from "react";

const TextInput = ({
  isDarkMode,
  value,
  handleInputChange,
  textarea,
  label,
}) => {
  const InputComponent = textarea ? "textarea" : "input";
  return (
    <div className="relative">
      <label className="text-sm absolute left-4 top-2 pointer-events-none origin-left text-gray-500">
        {label}
      </label>
      <InputComponent
        type={textarea ? undefined : "text"}
        className={`${textarea?"resize-none h-64":""} w-full px-4 pt-6 pb-2 border rounded-xl transition-all duration-300 ${
          isDarkMode
            ? "bg-gray-800/50 border-gray-700 text-gray-50 focus:border-blue-500 focus:bg-gray-800/70"
            : "bg-gray-50/80 border-gray-300 text-gray-900 focus:border-blue-500 focus:bg-white"
        }`}
        value={value}
        onChange={({ target }) => handleInputChange(target.value)}
      />
    </div>
  );
};

export default TextInput;
