import React, { createContext, useContext, useState } from 'react';
import CommonColors from '../units/CommonColor';
import { FONT_FAMILY } from '../units/FontsFamily';
import GlobalMetrics from '../units/GlobalMetricsStyles';

const ThemeContext = createContext({
    colors: CommonColors,
    fonts: FONT_FAMILY,
    metrics: GlobalMetrics,
});

export const ThemeProvider = ({ children }) => {
    const [colors, setColors] = useState(CommonColors);
    const [fonts, setFonts] = useState(FONT_FAMILY);
    const [metrics, setMetrics] = useState(GlobalMetrics);

    return (
        <ThemeContext.Provider value={{ colors, fonts, metrics }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);