import React, { useState } from "react";
import "./dualrangeSlider.css";

const DualRangeSlider = ({
    min = 0,
    max = 10000,
    step = 100,
    initialMin = 0,
    initialMax = 10000,
    onRangeChange,
}) => {
    const [minValue, setMinValue] = useState(initialMin);
    const [maxValue, setMaxValue] = useState(initialMax);

    const handleMinChange = (e) => {
        const value = Math.min(parseInt(e.target.value), maxValue - step);
        setMinValue(value);
        if (onRangeChange) onRangeChange(value, maxValue);
    };

    const handleMaxChange = (e) => {
        const value = Math.max(parseInt(e.target.value), minValue + step);
        setMaxValue(value);
        if (onRangeChange) onRangeChange(minValue, value);
    };

    const progressStyle = {
        left: `${((minValue - min) / (max - min)) * 100}%`,
        right: `${100 - ((maxValue - min) / (max - min)) * 100}%`,
    };

    return (
        <div className="slider-container mt-4">
            <div className="slider">
                <div className="progress" style={progressStyle}></div>
            </div>
            <div className="range-input">
                <input
                    type="range"
                    className="range-min"
                    min={min}
                    max={max}
                    value={minValue}
                    step={step}
                    onChange={handleMinChange}
                />
                <input
                    type="range"
                    className="range-max"
                    min={min}
                    max={max}
                    value={maxValue}
                    step={step}
                    onChange={handleMaxChange}
                />
            </div>
        </div>
    );
};

export default DualRangeSlider;

