import React from 'react';
import { TypewriterEffectSmooth } from './ui/typewriter-effect';
const SmallerDevicesError = () => {
    const words = [
        {
            text: 'Please',
            className: ' text-xl '
        },
        {
            text: 'switch',
            className: ' text-xl '
        },
        {
            text: 'to  ',
            className: ' text-xl '
        },

        {
            text: 'Larger',

            className: 'dark:text-purple-500 text-2xl '
        },
        {
            text: 'screen ',

            className: 'dark:text-purple-500 text-xl '
        }
    ];
    return (
        <div className="show-on-small-screens flex  justify-center items-center     h-screen">
            <div className="flex justify-center items-center h-full">
                <TypewriterEffectSmooth
                    className="text-black dark:text-white px-4 py-2 text-2xl"
                    words={words}
                />
            </div>
        </div>
    );
};

export default SmallerDevicesError;
