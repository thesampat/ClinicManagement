import React from 'react'
import CustomButton from '../CommonComponents/CustomButton'

export default function SubscribeNewsLatter() {
    return (
        <section className="bg-primary-500 h-screen  flex items-center justify-center ">

            <div className="px-6 py-12 text-center md:px-12 lg:text-left w-[90vw] ">
                <div className="container mx-auto xl:px-32">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div data-aos="zoom-in" className="mt-12 lg:mt-0  ">
                            <h1 className="mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl text-secondry-400">
                                Do not miss, <br /><span className="text-primary-400  ">any updates</span>
                            </h1>
                            <p className="lead text-blaack font-medium ">
                                We will write rarely and only high-quality content.
                            </p>
                            
                             <p className="lead mb-4 text-blaack font-medium ">
                             Receive all the new offers and discounts from Us.
                            </p>
                        </div>
                        <div className="mb-12 lg:mb-0 lg:ml-8" data-aos="zoom-in">
                            <div
                                className="relative bg-primary-50 border-2 border-primary-400 px-6 py-12 rounded-md ">
                                <h2 className="mb-12 text-center text-3xl font-bold">
                                    Subscribe to the newsletter
                                </h2>

                                <input type="email"
                                    placeholder='example@gmail.com'
                                    className=" bg-white py-2 border-2 border-primary-400 w-full rounded px-4 " />

                                <CustomButton label={"Subscripbe"} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
