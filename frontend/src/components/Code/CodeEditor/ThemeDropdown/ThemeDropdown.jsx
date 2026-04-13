import React from 'react';
import Select from 'react-select';
import monacoThemes from 'monaco-themes/themes/themelist';
import { customStyles } from 'shared/constants/customStyles';

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const options = Object.entries(monacoThemes).map(([themeId, themeName]) => ({
    label: themeName,
    value: themeId,
  }));

  const selectedOption = options.find((option) => option.value === theme);

  return (
    <Select
      placeholder="Select Theme"
      options={options}
      value={selectedOption}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
