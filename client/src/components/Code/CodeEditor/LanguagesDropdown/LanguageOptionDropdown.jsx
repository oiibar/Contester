import React from 'react';
import Select from 'react-select';
import { languageOptions } from 'constants/languageOptions';
import {customStyles} from "../../../../constants/customStyles";

const LanguageOptionDropdown = ({ handleLanguageChange, language }) => {
    return (
        <Select
            placeholder="Select a language"
            options={languageOptions}
            styles={customStyles}
            value={languageOptions.find(option => option.value === language)}
            onChange={(selectedOption) => handleLanguageChange(selectedOption)}
        />
    );
};

export default LanguageOptionDropdown;
