import React from 'react';
import Select from 'react-select';
import { languageOptions } from 'constants/languageOptions';
import {customStyles} from "constants/customStyles";

const LanguageOptionDropdown = ({ handleLanguageChange, language }) => {
    const selectedOption = languageOptions.find(option => option.value === language.value);

    return (
        <Select
            placeholder="Select a language"
            options={languageOptions}
            styles={customStyles}
            defaultValue={languageOptions[0]}
            value={selectedOption}
            onChange={handleLanguageChange}
        />
    );
};

export default LanguageOptionDropdown;
