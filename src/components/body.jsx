import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './Card';
import PostForm from './PostForm';
import usePosts from '../hooks/usePosts';

const API_URL = 'http://localhost:8000/posts';

function Body({ searchTerm, searchBy }) {
  const { t } = useTranslation('home');
  const {
    posts,
    loading,
    submitting,
    editingPost,
    updateReaction,
    deletePost,
    editPost,
    handleSubmitPost,
  } = usePosts(API_URL);

  const normalizedQuery = useMemo(
    () => searchTerm.trim().toLowerCase(),
    [searchTerm],
  );

  const filteredPosts = useMemo(() => {
    if (!normalizedQuery) {
      return posts;
    }

    return posts.filter((post) => {
      const titleMatch = (post.ai_name || '').toLowerCase().includes(normalizedQuery);
      const categoryMatch = String(post.category ?? '')
        .trim()
        .toLowerCase()
        .includes(normalizedQuery);

      return searchBy === 'category' ? categoryMatch : titleMatch;
    });
  }, [posts, normalizedQuery, searchBy]);

  const handleLike = useCallback(
    (post) => {
      updateReaction(post.id, 'likes', post.likes || 0);
    },
    [updateReaction],
  );

  const handleDislike = useCallback(
    (post) => {
      updateReaction(post.id, 'dislikes', post.dislikes || 0);
    },
    [updateReaction],
  );

  const handleEdit = useCallback(
    (post) => {
      editPost(post);
    },
    [editPost],
  );

  const handleDelete = useCallback(
    (postId) => {
      deletePost(postId);
    },
    [deletePost],
  );

  return (
    <main style={styles.contentStyle}>
      <PostForm
        key={editingPost?.id ?? 'new'}
        post={editingPost}
        submitting={submitting}
        onSubmit={handleSubmitPost}
      />
      {loading ? (
        <p>{t('posts.loading')}</p>
      ) : (
        <div style={styles.postsGrid}>
          {filteredPosts.map((item) => (
            <Card
              key={item.id}
              data={item}
              onLike={handleLike}
              onDislike={handleDislike}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}

const styles = {
  contentStyle: {
    display: 'block',
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    alignItems: 'start',
  },
};

export default Body;