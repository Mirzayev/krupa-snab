import React from 'react';
import Layout from "../../whs-manager/Layout/index.jsx"; // Adjust this import according to your project structure
import SDiagram from "../../components/diagrams/SDiagram.jsx";
import Diagram2 from "../../components/diagrams/SDiagram2.jsx";
import SDiagram3 from "../../components/diagrams/SDiagram3.jsx";
import SDiagram4 from "../../components/diagrams/SDiagram4.jsx";

export default function MainPage() {
    return (
        <Layout>
            <div className='px-4 md:px-8 lg:px-16 xl:px-24'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='shadow-lg my-5 md:my-10 py-5 px-3 mx-2 md:mx-5 rounded-lg'>
                        <p className='text-lg md:text-xl lg:text-2xl font-bold mb-5'>Sotuv Buyurtmalari</p>
                        <Diagram2 className='w-full' />
                    </div>
                    <div className='shadow-lg my-5 md:my-10 py-5 px-3 mx-2 md:mx-5 rounded-3xl'>
                        <p className='text-lg md:text-xl lg:text-2xl font-bold'>Rozi Mijozlar</p>
                        <SDiagram className='w-full' />
                    </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='shadow-lg my-5 md:my-10 py-5 px-3 mx-2 md:mx-5 rounded-lg'>
                        <p className='text-lg md:text-xl lg:text-2xl font-bold mb-10'>Umumiy tushum</p>
                        <SDiagram3 className='w-full' />
                    </div>
                    <div className='shadow-lg my-5 md:my-10 py-5 px-3 mx-2 md:mx-5 rounded-lg'>
                        <p className='text-lg md:text-xl lg:text-2xl font-bold mb-10'>Maqsad va haqiqat</p>
                        <SDiagram4 className='w-full' />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
