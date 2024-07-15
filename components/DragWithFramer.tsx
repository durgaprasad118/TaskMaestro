'use client';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';

export const DraggableWithFramer = () => {
    const perDragRef = useRef<number>(0);
    const perDragOverRef = useRef<number>(0);
    const [people, setPeople] = useState([
        { id: 1, name: 'dp' },
        { id: 2, name: 'loki' },
        { id: 3, name: 'Sai' },
        { id: 4, name: 'Srinu' }
    ]);

    const handleSort = () => {
        const peopleClone = [...people];
        const temp = peopleClone[perDragRef.current];
        peopleClone[perDragRef.current] = peopleClone[perDragOverRef.current];
        peopleClone[perDragOverRef.current] = temp;
        setPeople(peopleClone);
    };

    return (
        <motion.div
            className="w-[80vw] flex mt-4 gap-4 flex-col"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            {people.map((naam, index) => {
                return (
                    <motion.div
                        key={naam.id}
                        className="border hover:bg-slate-800 hover:border-slate-700 w-[60vw] border-slate-800 px-4 py-2 flex items-center"
                        draggable
                        onDragStart={() => (perDragRef.current = index)}
                        onDragEnter={() => (perDragOverRef.current = index)}
                        onDragEnd={handleSort}
                        onDragOver={(e) => e.preventDefault()}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: 'easeIn' }}
                        whileHover={{
                            scale: 1.01,
                            boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
                        }}
                        whileDrag={{
                            scale: 0.8,
                            boxShadow: '0px 8px 15px rgba(0,0,0,0.3)'
                        }}
                        layout
                    >
                        {naam?.name}
                    </motion.div>
                );
            })}
        </motion.div>
    );
};
