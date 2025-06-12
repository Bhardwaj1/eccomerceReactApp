import { useTheme } from "@mui/material/styles";
import AsyncSelect from "react-select/async";

const Dropdown = ({ options = [],onchange,name}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors(inputValue));
    }, 1000);
  };

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: isDark ? '#2c2c2c' : '#fff',
      borderColor: isDark ? '#555' : '#ccc',
      color: isDark ? '#fff' : '#000',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDark ? '#2c2c2c' : '#fff',
      color: isDark ? '#fff' : '#000',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDark
          ? '#3a3a3a'
          : '#eee'
        : 'transparent',
      color: isDark ? '#fff' : '#000',
      cursor: 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: isDark ? '#fff' : '#000',
    }),
    placeholder: (base) => ({
      ...base,
      color: isDark ? '#aaa' : '#888',
    }),
  };

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={loadOptions}
      defaultOptions={options}
      placeholder="Select"
      styles={customStyles}
      onChange={(selectedOption) =>
        onchange({
          target: {
            name: name,
            value: selectedOption?.value || null,
          },
        })
      }
    />
  );
};

export default Dropdown;
