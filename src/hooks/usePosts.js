import { useCallback, useEffect, useState } from 'react';

async function request(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response;
}

async function requestJson(url, options) {
  const response = await request(url, options);

  const text = await response.text();

  return text ? JSON.parse(text) : null;
}

function toPostPayload(formData) {
  return {
    ai_name: formData.ai_name.trim(),
    provider: formData.provider.trim(),
    description: formData.description.trim(),
    category: formData.category.trim(),
    image: formData.image.trim(),
    link: formData.link.trim(),
    likes: formData.likes ?? 0,
    dislikes: formData.dislikes ?? 0,
  };
}

export default function usePosts(apiUrl) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await requestJson(apiUrl);
        setPosts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [apiUrl]);

  const patchPostList = useCallback((postId, field, value) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === postId ? { ...post, [field]: value } : post)),
    );
  }, []);

  const updateReaction = useCallback(
    async (postId, field, currentValue = 0) => {
      try {
        const updatedValue = currentValue + 1;
        await request(`${apiUrl}/${postId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: updatedValue }),
        });
        patchPostList(postId, field, updatedValue);
      } catch (error) {
        console.error(error);
      }
    },
    [apiUrl, patchPostList],
  );

  const deletePost = useCallback(
    async (postId) => {
      try {
        await request(`${apiUrl}/${postId}`, {
          method: 'DELETE',
        });

        setPosts((prev) => prev.filter((item) => item.id !== postId));
      } catch (error) {
        console.error(error);
      }
    },
    [apiUrl],
  );

  const editPost = useCallback((post) => {
    setEditingPost(post);
  }, []);

  const handleSubmitPost = useCallback(
    async (formData) => {
      try {
        setSubmitting(true);
        const post = toPostPayload(formData);

        if (editingPost) {
          const updatedPost = await requestJson(`${apiUrl}/${editingPost.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...editingPost, ...post }),
          });

          setPosts((prev) =>
            prev.map((item) => (item.id === updatedPost.id ? updatedPost : item)),
          );
          setEditingPost(null);
          return;
        }

        const createdPost = await requestJson(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });
        setPosts((prev) => [createdPost, ...prev]);
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
    [apiUrl, editingPost],
  );

  return {
    posts,
    loading,
    submitting,
    editingPost,
    updateReaction,
    deletePost,
    editPost,
    handleSubmitPost,
  };
}