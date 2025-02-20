'use client';

import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';

export default function StoryView({ userId, onClose }: { userId: string, onClose: () => void }) {
    const [userStories, setUserStories] = useState<any>([]);
    const [user, setUser] = useState<any>(null);
    const [storyId, setStoryId] = useState<number>(1);
    const [duration, setDuration] = useState<number>(0);
    const [isViewing, setIsViewing] = useState<boolean>(false);

    useEffect(() => {
        setStoryId(1);
        setUser(null);
        setUserStories([]);
        const fetchUserStories = async () => {
            const userWithStories = await fetch(`http://localhost:3000/api/stories/${userId}`);
            const userStoriesData = await userWithStories.json();

            setUserStories(userStoriesData.stories);
            setUser(userStoriesData);
            setDuration(0);
        };

        fetchUserStories();
        setIsViewing(true);
    }, [userId]);

    useEffect(() => {
        if (isViewing) {
            const interval = setInterval(() => {
                setDuration(duration + 1);

                if (userStories.length > 0) {
                    if (duration >= userStories.find((s: { id: number; }) => s.id === storyId).duration) {
                        if (storyId + 1 <= userStories.length) {
                            setStoryId(storyId + 1);
                            setDuration(0);
                        } else {
                            close();
                        }
                    }
                }
            }, 1);

            return () => clearInterval(interval);
        }

    }, [duration, isViewing]);

    function close() {
        setIsViewing(false);
        onClose();
    }

    const prevStory = debounce(() => {
        if (storyId > 1) {
            setStoryId(storyId - 1);
            setDuration(0);
        } else {
            close();
        }
    }, 10);

    const nextStory = debounce(() => {
        if (storyId + 1 <= userStories.length) {
            setStoryId(storyId + 1);
            setDuration(0);
        } else {
            close();
        }
    }, 10);

    if (!isViewing)
        return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300">
                <div className="absolute inset-0 flex justify-center items-center">
                    {userStories.length > 0 &&
                        <div className="relative w-screen h-screen">
                            <img src={userStories.find((s: { id: number; }) => s.id === storyId).image} className="absolute w-full h-full object-cover -z-10" />
                            <div className="absolute top-0 w-full px-2">
                                <div className="flex flex-column gap-2">
                                    {userStories.map((story: { id: number; duration: number }) => (
                                        <div key={story.id} className="rounded-lg bg-white w-full p-0.5 mt-1 -z-2">
                                            <div className="bg-black rounded-lg p-0.5 z-2" style={{
                                                width: `${(storyId === story.id ? (duration / story.duration) * 100 : (story.id < storyId ? 100 : 0))}%`,
                                                display: story.id <= storyId ? 'block' : 'none'
                                            }}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-5 p-3 pt-5 z-20">
                                <div className="flex items-center gap-2 z-20">
                                    <button className="bg-gray-300 p-0.5 rounded-full w-10 h-10">
                                        <img src={user && user.photo} alt={user && user.username} className="rounded-full" />
                                    </button>
                                    <span className="font-bold">{user && user.username}</span>
                                </div>
                                <button className="text-white font-bold text-3xl z-10" onClick={close}>
                                    &times;
                                </button>
                            </div>
                            <div className="flex h-full w-full z-5">
                                <button className="absolute top-0 left-0 w-1/2 h-full bg-opacity-0 cursor-default" onClick={prevStory}></button>
                                <button className="absolute top-0 right-0 w-1/2 h-full bg-opacity-0 cursor-default" onClick={nextStory}></button>
                            </div>
                        </div>
                    }
                </div>
            </div >
        </>
    );
}