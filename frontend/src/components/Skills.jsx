import React, { useState } from "react";

const SkillsInput = ({ skills, setSkills }) => {
  // const [skills, setSkills] = useState([]); // Store added skills
  const [inputValue, setInputValue] = useState(""); // Track input field value
  const suggestions = [
    "JavaScript", "React", "Node.js", "Python", "CSS", "HTML", "Java", "C++"
  ] // Example skills list

  const addSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setInputValue(""); // Clear input after adding
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((item) => item !== skill));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addSkill(inputValue.trim());
      e.preventDefault(); // Prevent form submission
    }
  };

  const filteredSuggestions = suggestions.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase()) && !skills.includes(item)
  );

  return (
    <div className="p-4 w-80 border border-gray-300 rounded-md">
      {/* Input Field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a skill and press Enter..."
        className="w-full p-2 border rounded-md focus:outline-none"
      />

      {/* Suggestions Dropdown */}
      {inputValue && filteredSuggestions.length > 0 && (
        <ul className="border mt-1 bg-white rounded-md shadow-md">
          {filteredSuggestions.map((suggestion) => (
            <li
              key={suggestion}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => addSkill(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}

      {/* Selected Skills */}
      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full"
          >
            {skill}
            <button
              className="ml-2 text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
              onClick={() => removeSkill(skill)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsInput;