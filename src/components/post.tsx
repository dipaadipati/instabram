'use client';

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faMessage as faMessageRegular } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import { debounce } from 'lodash';

interface postType {
    id: number;
    caption: string;
    image: string;
    likes: number;
    comments: number;
    user: {
        id: number,
        username: string,
        photo: string,
        stories: []
    };
    stories: [];
}

export default function PostCard({ post, onStoryClick, isLiked = false, likeHandler }: { post: postType; onStoryClick: (userId: string | number) => void; isLiked?: boolean; likeHandler: (postId: number, isLiked?: boolean) => void }) {
    const [showHeart, setShowHeart] = useState(false);

    const handleDoubleClick = debounce(() => {
        likeHandler(post.id, true);
        setShowHeart(true);
        setTimeout(() => setShowHeart(false), 1000);
    }, 100);

    return (
        <div className="flex flex-col gap-5 p-3 border-b-2 border-gray-700">
            <div className="flex items-center gap-2">
                <button className={"p-1 rounded-full " + (post.user.stories.length > 0 ? "bg-gradient-to-tr from-yellow-400 to-fuchsia-600" : "bg-transparent")} onClick={() => onStoryClick(post.user.id)}>
                    <Image src={post.user.photo} alt={post.user.username} width={30} height={30} className="rounded-full" />
                </button>
                <button className="font-bold">{post.user.username}</button>
            </div>
            <div className="relative">
                <Image src={post.image} alt={post.caption} className="relative" width={500} height={500} onDoubleClick={handleDoubleClick} />
                <div className={"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all ease-in-out " + (showHeart ? "opacity-100" : "opacity-0")}>
                    <FontAwesomeIcon icon={faHeartSolid} className="text-6xl text-red-600" />
                </div>
            </div>
            <div className="flex items-center gap-5">
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular}
                        onClick={() => likeHandler(post.id)}
                        className="text-2xl cursor-pointer" />
                    <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faMessageRegular} className="text-2xl cursor-pointer" />
                    <span>{post.comments}</span>
                </div>
            </div>
            <div>
                <button className="font-bold">
                    {post.user.username}
                </button>
                <span>
                    &nbsp;&nbsp;
                    {post.caption.split(' ').map((word: string, index: number) => {
                        if (/#[a-zA-Z0-9]+/.test(word)) {
                            return <button key={index} className="text-blue-500 hover:text-blue-400">{word} </button>;
                        }
                        return word + (index < post.caption.split(' ').length - 1 ? ' ' : '');
                    })}
                </span>
            </div>
        </div>
    );
}