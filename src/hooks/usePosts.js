import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts, addPost, updatePost, deletePost, setLoading } from '../redux/slices/newsSlice';

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
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.news);
  const [submitting, setSubmitting] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        dispatch(setLoading(true));
        const data = await requestJson(apiUrl);
        dispatch(setPosts(data));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPosts();
  }, [apiUrl, dispatch]);

  const updateReaction = useCallback(
    async (postId, field, currentValue = 0) => {
      try {
        const updatedValue = currentValue + 1;
        const response = await requestJson(`${apiUrl}/${postId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: updatedValue }),
        });
        dispatch(updatePost(response));
      } catch (error) {
        console.error(error);
      }
    },
    [apiUrl, dispatch],
  );

  const removePost = useCallback(
    async (postId) => {
      try {
        await request(`${apiUrl}/${postId}`, {
          method: 'DELETE',
        });
        dispatch(deletePost(postId));
      } catch (error) {
        console.error(error);
      }
    },
    [apiUrl, dispatch],
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

          dispatch(updatePost(updatedPost));
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
        dispatch(addPost(createdPost));
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
    [apiUrl, editingPost, dispatch],
  );

  return {
    posts,
    loading,
    submitting,
    editingPost,
    updateReaction,
    deletePost: removePost,
    editPost,
    handleSubmitPost,
  };
}