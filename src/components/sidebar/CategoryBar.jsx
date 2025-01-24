import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { GoDash } from 'react-icons/go'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { getCategories } from '../../data/api/getApi';
import DualRangeSlider from './components/DualRangeSlider';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function CategoryBar({ className }) {
    const { data: categoryData, isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategories
    });

    return (
        <div className={`category-sidebar ${className}`}>
            {/* <div className='all-added-filters d-flex flex-column p-3'>
                <span className='text-muted text-decoration-underline'>Reset all filter</span>
                <span className='text-dark mt-1 added-filters'><HiMiniXMark size={20} className='cursor-pointer' />Clothes</span>
            </div> */}
            <div className='ps-3 mt-2'>
                <div className="search-container">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search..."
                    />
                    <HiMagnifyingGlass className="search-icon" size={20} />
                </div>

            </div>
            <div className='ps-3 mt-2'>
                <span className='fw-medium fs-6 text-dark mt-2'>Price:</span>
                <div className='mt-2 d-flex justify-content-between align-items-center'>
                    <div className='bg-body-secondary price-limit fw-bold'>$100</div>
                    <div><GoDash /></div>
                    <div className='bg-body-secondary price-limit fw-bold'>$10000</div>
                </div>
                <DualRangeSlider />
            </div>
            <hr />
            <div className='ps-3 mt-2'>
                {/* https://api.escuelajs.co/api/v1/categories */}
                <span className='fw-medium fs-6 text-dark mt-2'>Shopping Category:</span>
                <div className='mt-2 d-flex flex-column gap-2 category-table'>
                    {isLoading ? <Skeleton count={8} /> : categoryData?.map((category, index) => (
                        <span className='text-muted fw-medium cursor-pointer' key={index}>{category.name}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}
