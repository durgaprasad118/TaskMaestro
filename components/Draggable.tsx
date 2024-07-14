'use client';
import React, { useRef, useState } from 'react';

const Draggable = () => {
    const perDragRef = useRef<number>(0);
    const perDragOverRef = useRef<number>(0);
    const [people, setPeople] = useState([
        {
            id: 1,
            name: 'dp'
        },
        {
            id: 2,
            name: 'loki'
        },
        {
            id: 3,
            name: 'Sai'
        },
        {
            id: 4,
            name: 'Srinu'
        }
    ]);
    const HandleSort = () => {
        const peopleClone = [...people];
        const temp = peopleClone[perDragRef.current];
        peopleClone[perDragRef.current] = peopleClone[perDragOverRef.current];
        peopleClone[perDragOverRef.current] = temp;
        setPeople(peopleClone);
    };
    return (
        <div className="w-[80vw] flex mt-4  gap-4 flex-col">
            {people.map((naam, index) => {
                return (
                    <div
                        key={naam.id}
                        className=" border hover:bg-slate-800 hover:border-slate-700 transition-all duration-300 w-[60vw] border-slate-800 px-4 py-2 flex items-center"
                        draggable
                        onDragStart={() => (perDragRef.current = index)}
                        onDragEnter={() => (perDragOverRef.current = index)}
                        onDragEnd={HandleSort}
                        onDragOver={(e) => e.preventDefault()}
                        style={{
                            transition: 'transform 0.2s ease',
                            transform: 'scale(1)'
                        }}
                    >
                        {naam?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Draggable;
