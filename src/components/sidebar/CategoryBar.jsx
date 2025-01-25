import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GoDash } from "react-icons/go";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { getCategories } from "../../data/api/getApi";
import DualRangeSlider from "./components/DualRangeSlider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CategoryBar({ className }) {
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const queryClient = useQueryClient();
    const { data: categoryData, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const handleRangeChange = (min, max) => {
        setPriceRange({ min, max });
        // queryClient.invalidateQueries(["products", { min, max }]);
    };

    return (
        <div className={`category-sidebar ${className}`}>
            <div className="ps-3 mt-2">
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search..."
                    />
                    <HiMagnifyingGlass className="search-icon" size={20} />
                </div>
            </div>
            <div className="ps-3 mt-2">
                <span className="fw-medium fs-6 text-dark mt-2">Price:</span>
                <div className="mt-2 d-flex justify-content-between align-items-center">
                    <div className="bg-body-secondary price-limit fw-bold">
                        ${priceRange.min}
                    </div>
                    <div>
                        <GoDash />
                    </div>
                    <div className="bg-body-secondary price-limit fw-bold">
                        ${priceRange.max}
                    </div>
                </div>
                <DualRangeSlider
                    min={0}
                    max={10000}
                    step={100}
                    initialMin={priceRange.min}
                    initialMax={priceRange.max}
                    onRangeChange={handleRangeChange}
                />
            </div>
            <hr />
            <div className="ps-3 mt-2">
                <span className="fw-medium fs-6 text-dark mt-2">Shopping Category:</span>
                <div className="mt-2 d-flex flex-column gap-2 category-table">
                    {isLoading ? (
                        <Skeleton count={8} />
                    ) : (
                        categoryData?.map((category, index) => (
                            <span className="text-muted fw-medium cursor-pointer" key={index}>
                                {category.name}
                            </span>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
