'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faMessage as faMessageRegular } from "@fortawesome/free-regular-svg-icons";
import Footer from "@/components/footer"
import Link from "next/link";
import Image from "next/image";
import StoryView from '@/components/storyView';
import PostCard from '@/components/post';
import { debounce } from 'lodash';

interface UserType {
  id: number;
  username: string;
  photo: string;
  stories: [];
}

interface PostType {
  id: number;
  user: UserType;
  user_id: number;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  created_at: string;
  stories: [];
}

export default function Home() {
  const [userStoriesData, setUserStoriesData] = useState<UserType[] | null>(null);
  const [storyUserId, setStoryUserId] = useState<string | number | null>(null);
  const [userPostsData, setUserPostsData] = useState<PostType[] | null>(null);
  const [postLikes, setPostLikes] = useState<boolean[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      const userWithStories = await fetch(process.env.HOST_URL + "/api/stories");
      const data = await userWithStories.json();
      setUserStoriesData(data);

      const posts = await fetch(process.env.HOST_URL + "/api/posts");
      const postsData = await posts.json();
      const likes: boolean[] = [];
      postsData.forEach((post: { id: never; }) => {
        likes[post.id] = postLikes ? postLikes[post.id] : false;
      });
      setPostLikes(likes);
      setUserPostsData(postsData);
    };

    fetchData();
  }, []);


  const likeHandler = debounce((postId: number, isLiked?: boolean) => {
    const prevLikes = postLikes ? postLikes[postId] : false;
    const newPostLikes = postLikes ? [...postLikes] : [];
    newPostLikes[postId] = isLiked ? isLiked : !newPostLikes[postId];
    setPostLikes(newPostLikes);
    if (userPostsData) {
      const userPosts = userPostsData.map((post: PostType) => {
        if (post.id === postId) {
          post.likes = prevLikes ? (isLiked ? post.likes : post.likes - 1) : post.likes + 1;
        }
        return post;
      });
      setUserPostsData(userPosts);
    }
  }, 10);

  return (
    <div className='w-full'>
      <header className="fixed top-0 left-[50%] transform translate-x-[-50%] w-full z-10">
        <div className="flex justify-between items-center gap-7 px-3 h-20 bg-gray-800 text-white border-b-2 border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Instabram</span>
          </div>
          <div className="flex items-center gap-5 mr-5">
            <Link href="/activity" className="relative">
              <FontAwesomeIcon icon={faHeartRegular} className="text-2xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">3</span>
            </Link>
            <Link href="/messages" className="relative">
              <FontAwesomeIcon icon={faMessageRegular} className="text-2xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1">2</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mt-20 mb-40 flex justify-center items-center">
        <div className="w-screen md:w-[500px]">
          {storyUserId && <StoryView userId={storyUserId} onClose={() => setStoryUserId(null)} />}
          <div className={`flex items-center h-30 w-full overflow-scroll scrollbar-hidden gap-5 p-3 ${userStoriesData && "border-b-2 border-gray-700"}`}>
            {userStoriesData && userStoriesData.map((user: UserType) => (
              <div key={user.id} className="flex flex-col items-center gap-1">
                <button className="bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-1 rounded-full" onClick={() => setStoryUserId(user.id)}>
                  <Image src={user.photo} alt={user.username} width={50} height={50} className="rounded-full" />
                </button>
                <span>{user.username}</span>
              </div>
            ))}
          </div>
          {userPostsData && userPostsData.map((post: PostType) => (
            <PostCard key={post.id} post={post} onStoryClick={(userId) => post.user.stories.length > 0 ? setStoryUserId(userId) : null} isLiked={postLikes ? postLikes[post.id] : false} likeHandler={likeHandler} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
