import { useEffect } from 'react';
import { Posts } from './Components/Post';
import Modal from './Components/Modal';
import './App.css'
import { usePosts } from './endpoints/usePosts';
import { Toaster } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const App: React.FC = () => {
  const {
    fetchPosts,
    posts,
    selectedPost,
    setSelectedPost,
    loading,
    searchQuery,
    setSearchQuery
  } = usePosts()

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <>
      <Toaster />
      <main className="app">
        <div className='header'>
          <div>
            <h1>Post Peek</h1>
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        {loading && <div className='loader'>
          <ClipLoader color='#006A55' />
        </div>}
        {posts.length === 0 && !loading && <p>No posts found</p>}
        <Posts posts={posts} onSelectPost={(post) => setSelectedPost(post)} />
        {selectedPost && (
          <Modal post={selectedPost} onClose={() => setSelectedPost(null)} />
        )}
      </main>
    </>
  );
};

export default App;
