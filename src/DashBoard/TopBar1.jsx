import React, { useState, useEffect, useRef } from 'react';

const TopBar1 = () => {
    const [topBarHeight, setTopBarHeight] = useState(0);
    const topBarRef = useRef(null); // Reference to the TopBar div

    useEffect(() => {
        const calculateHeight = () => {
            if (topBarRef.current) {
                setTopBarHeight(topBarRef.current.offsetHeight);
            }
        };

        calculateHeight(); // Calculate on initial render
        window.addEventListener('resize', calculateHeight); // Recalculate on resize

        return () => {
            window.removeEventListener('resize', calculateHeight); // Clean up
        };
    }, []);

    const user = {
        username: "Saharsh",
        level: 9,
    };
    const notifications = 3;
    const currentStreak = 12;
    const points = 1582;

    return (
        <>
            <div style={{ height: topBarHeight, width: '100%' }}></div>  {/* Spacer div */}

            <div
                className="fixed top-0 left-0 w-full flex items-center justify-between bg-darkBg text-textPrimary shadow-md z-10 py-3 px-4 border-b-2 border-purple-600"
                ref={topBarRef}   // Attach the ref
            >
                {/* ... (Your TopBar1 content) */}
                <div className="flex items-center">
                    <span className="font-bold text-xl text-purple-400 mr-4">My Interview App</span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex items-center">
                        <span className="text-highlight">💎 {points}</span>
                        <span className="ml-1 text-sm text-gray-400">Points</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-accent">🔥 {currentStreak}</span>
                        <span className="ml-1 text-sm text-gray-400">Streak</span>
                    </div>
                    <div className="flex items-center">
                        <span className="text-blue-300">🏅 Lv. {user.level}</span>
                        <span className="ml-1 text-sm text-gray-400">Level</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="hover:text-blue-300">
                        Notifications ({notifications})
                    </button>
                    <span className="text-gray-500">|</span>
                    <span className="font-semibold">{user.username}</span>
                </div>
            </div>
        </>
    );
};

export default TopBar1;