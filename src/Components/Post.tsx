import React from 'react';
import { Post } from '../Types/types';

interface ItemListProps {
    posts: Post[];
    onSelectPost: (post: Post) => void;
}

export const Posts: React.FC<ItemListProps> = ({ posts, onSelectPost }) => (
    <ul className="post-list">
        {posts.map((post) => (
            <li key={post.id} onClick={() => onSelectPost(post)}>
                {post.title}
            </li>
        ))}
    </ul>
);

