import React, {useState, useEffect} from 'react';
import Select from 'react-select';
import { languageOptions } from 'constants/languageOptions';
import {customStyles} from "constants/customStyles";

const LanguageOptionDropdown = ({ handleLanguageChange, language }) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
        import('constants/languageOptions').then((mod) => {
            setOptions(mod.languageOptions);

            const defaultOption = mod.languageOptions.find(opt => opt.value === language.value) || mod.languageOptions[0];
            setSelectedOption(defaultOption);
        });
    }, [language]);

    return (
        <Select
            placeholder="Select a language"
            options={options}
            styles={customStyles}
            value={selectedOption}
            onChange={(val) => {
                setSelectedOption(val);
                handleLanguageChange(val);
            }}
        />
    );
};

export default LanguageOptionDropdown;
