import React from 'react';
import { getProducts } from '../../data/api/getApi';
import { useQuery } from '@tanstack/react-query';

export default function Products() {
    const {
        data: productData,
        isLoading,
        isError
    } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(0),
    });

    return (
        <div>
            <div className="d-flex align-items-baseline">
                <h1 className="display-3">Products</h1>
                <span className="text-muted ms-4">
                    Found: <span className="text-dark"> Products</span>
                </span>
            </div>

            <div className="mt-2">
                <div className="row">
                    {productData && productData.map((product) =>
                        <div className="col-md-4 col-sm-6" key={product.id}>
                            <div className="card mb-2">
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
                    )}
                </div>
            </div>
        </div>
    );
}
