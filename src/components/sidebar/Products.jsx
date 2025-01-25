import React, { useEffect, useState } from 'react';
import { getProducts } from '../../data/api/getApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import Skeleton from 'react-loading-skeleton';
import { HiMiniFunnel } from 'react-icons/hi2';
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import CategoryBar from './CategoryBar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/reducers/cartSlice';
import debounce from "lodash.debounce";
import { useParams } from 'react-router-dom';

export default function Products() {
    const dispatch = useDispatch();

    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearch = debounce((query) => {
        setSearchQuery(query);
    }, 300);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['products', { priceRange, selectedCategory, searchQuery, name }],
        queryFn: ({ pageParam = 0, queryKey }) => {
            const { priceRange, selectedCategory, searchQuery } = queryKey[1];
            return getProducts(pageParam, selectedCategory, priceRange.min, priceRange.max, searchQuery);
        },
        getNextPageParam: (lastPage, pages) => {
            return lastPage.length ? pages.length * 10 : undefined;
        },
    });

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 50 &&
            hasNextPage &&
            !isFetchingNextPage
        ) {
            fetchNextPage();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasNextPage, isFetchingNextPage]);

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [cartState, setCartState] = useState({});
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        setCartState((prevState) => ({
            ...prevState,
            [product.id]: { added: true }
        }));
    };

    return (
        <div>
            <div className="d-flex align-items-baseline justify-content-between">
                <h1 className="display-3">Products</h1>
                <div className="">
                    <button className="btn border shadow" onClick={toggle}>
                        <HiMiniFunnel size={24} />
                    </button>
                </div>
            </div>
            <Offcanvas isOpen={isOpen} toggle={toggle} direction="start">
                <OffcanvasHeader toggle={toggle}></OffcanvasHeader>
                <OffcanvasBody>
                    <CategoryBar
                        onPriceRangeChange={(min, max) => setPriceRange({ min, max })}
                        onCategoryChange={setSelectedCategory}
                        onSearchChange={debouncedSearch}
                    />

                </OffcanvasBody>
            </Offcanvas>
            <div className="mt-2">
                <div className="row">
                    {isLoading
                        ? Array.from({ length: 12 }).map((_, index) => (
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
                                <div
                                    className="col-md-4 col-sm-6"
                                    key={`${product.id}-${pageIndex}`}
                                >
                                    <div className="card mb-4">
                                        <div className="p-3">
                                            <img
                                                src={product.images[0]}
                                                alt={product.title}
                                                className="card-img-top rounded"
                                                onError={(e) =>
                                                    (e.target.onerror = null)(
                                                        (e.target.src =
                                                            'https://placehold.co/1080?text=image+not+found')
                                                    )
                                                }
                                            />
                                            <h6 className="fw-bold m-0 mt-2">{product.title}</h6>
                                            <small>{product.category.name}</small>
                                            <p className="m-0 product-card-desc">
                                                {product.description}
                                            </p>
                                        </div>
                                        <div className="card-footer d-flex justify-content-between align-items-center">
                                            <h6 className="fw-bold mt-2">USD {product.price}</h6>
                                            <button
                                                className="product-cart-button"
                                                onClick={() => handleAddToCart(product)}
                                                disabled={cartState[product.id]?.added}
                                            >
                                                {cartState[product.id]?.added ? 'Added' : 'Add To Cart'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    {isFetchingNextPage &&
                        Array.from({ length: 4 }).map((_, index) => (
                            <div className="col-md-4 col-sm-6" key={`loading-${index}`}>
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
            </div>
        </div>
    );
}
