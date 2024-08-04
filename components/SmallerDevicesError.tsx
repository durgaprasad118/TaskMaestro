import React from 'react';
import { Highlight } from './ui/hero-highlight';

const SmallerDevicesError = () => {
    return (
        <div className="show-on-small-screens flex  justify-center items-center     h-screen">
            <div className="flex justify-center items-center h-full">
                <Highlight className="text-black dark:text-white px-4 py-2 text-lg">
                    Please switch to larger screen
                </Highlight>
            </div>
        </div>
    );
};

export default SmallerDevicesError;
