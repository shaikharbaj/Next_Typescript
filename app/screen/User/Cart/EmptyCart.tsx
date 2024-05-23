import React from 'react'
import './cart.css'
const EmptyCart = () => {
    return (
        <>
            <section className="bg-light emptycart">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 box">
                            <h1>Your Cart Is Empty....!🤷‍♂️</h1>
                            <button>Order Product Now👈</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EmptyCart