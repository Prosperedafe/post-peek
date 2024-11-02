import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Post } from "../Types/types";

export const usePosts = () => {

    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const fetchPosts = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(response?.data);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (!error.response) {
                    toast.error('Network error: Please check your internet connection.');
                } else if (error.response.status >= 500) {
                    toast.error('Server error: Please try again later.');
                } else if (error.response.status === 404) {
                    toast.error('Not found: The requested resource was not found.');
                } else if (error.response.status === 403) {
                    toast.error('Access denied: You do not have permission to access this resource.');
                }
            } else {
                toast.error('An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return {
        loading,
        fetchPosts,
        selectedPost,
        setSelectedPost,
        posts: filteredPosts,
        searchQuery,
        setSearchQuery
    }
}