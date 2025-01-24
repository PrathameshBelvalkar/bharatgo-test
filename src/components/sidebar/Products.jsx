import React, { useEffect, useState } from 'react';
import { getProducts } from '../../data/api/getApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { HiMiniFunnel, HiOutlineFunnel } from 'react-icons/hi2';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import CategoryBar from './CategoryBar';

export default function Products() {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['products'],
        queryFn: ({ pageParam = 0 }) => getProducts(pageParam),
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length ? pages.length * 10 : undefined;
        },
    });

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage]);
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <div>
            <div className="d-flex align-items-baseline justify-content-between">
                <h1 className="display-3">Products</h1>
                <div className='small-block'>
                    <button className='btn border shadow' onClick={toggle}><HiMiniFunnel size={24} /></button>
                </div>
            </div>
            <Offcanvas isOpen={isOpen} toggle={toggle} direction="start">
                <OffcanvasHeader toggle={toggle}></OffcanvasHeader>
                <OffcanvasBody>
                    <CategoryBar />
                </OffcanvasBody>
            </Offcanvas>
            <div className="mt-2">
                <div className="row">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, index) => (
                            <div className="col-md-4 col-sm-6" key={index}>
                                <div className="card mb-2">
                                    <div className="p-3">
                                        <Skeleton height={150} className="card-img-top rounded" />
                                        <Skeleton width="60%" height={20} className="mt-2" />
                                        <Skeleton width="40%" height={15} />
                                        <Skeleton count={2} className="mt-2" />
                                    </div>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <Skeleton width="30%" height={20} />
                                        <Skeleton width="40%" height={35} className="rounded" />
                                    </div>
                                </div>
                            </div>
                        ))
                        : data?.pages.map((page, pageIndex) =>
                            page.map((product) => (
                                <div className="col-md-4 col-sm-6" key={`${product.id}-${pageIndex}`}>
                                    <div className="card mb-4">
                                        <div className="p-3">
                                            <img
                                                src={product.images}
                                                alt={product.title}
                                                className="card-img-top rounded"
                                                onError={(e) =>
                                                    (e.target.onerror = null)(
                                                        (e.target.src =
                                                            "https://placehold.co/1080?text=image+not+found")
                                                    )
                                                }
                                            />
                                            <h6 className="fw-bold m-0 mt-2">{product.title}</h6>
                                            <small>{product.category.name}</small>
                                            <p className="m-0 product-card-desc">{product.description}</p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between align-items-center">
                                            <h6 className="fw-bold mt-2">USD {product.price}</h6>
                                            <button className="product-cart-button">Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                </div>

                {isFetchingNextPage && (
                    <div className="row">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div className="col-md-4 col-sm-6" key={index}>
                                <div className="card mb-2">
                                    <div className="p-3">
                                        <Skeleton height={150} className="card-img-top rounded" />
                                        <Skeleton width="60%" height={20} className="mt-2" />
                                        <Skeleton width="40%" height={15} />
                                        <Skeleton count={2} className="mt-2" />
                                    </div>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <Skeleton width="30%" height={20} />
                                        <Skeleton width="40%" height={35} className="rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
