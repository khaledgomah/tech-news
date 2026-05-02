import React from 'react';
import Card from './Card';
import PostForm from './PostForm';

const API_URL = 'http://localhost:8000/posts';

class Body extends React.Component {
  state = {
    posts: [],
    loading: true,
    editingPost: null,
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    try {
      this.setState({ loading: true });
      const response = await fetch(API_URL);
      const data = await response.json();
      this.setState({ posts: data });
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  updateReaction = async (post, field) => {
    try {
      const updatedValue = (post[field] || 0) + 1;
      const response = await fetch(`${API_URL}/${post.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ [field]: updatedValue }),
      });

      if (!response.ok) {
        throw new Error('Failed to update reaction');
      }

      this.setState({
        posts: this.state.posts.map((item) =>
          item.id === post.id ? { ...item, [field]: updatedValue } : item,
        ),
      });
    } catch (error) {
      console.error(error);
    }
  };

  deletePost = async (postId) => {
    try {
      const response = await fetch(`${API_URL}/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      this.setState((prevState) => ({
        posts: prevState.posts.filter((item) => item.id !== postId),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  editPost = (post) => {
    this.setState({ editingPost: post });
  };



  handleSubmitPost = async (formData) => {
    try {
      const post = {
        ai_name: formData.ai_name.trim(),
        provider: formData.provider.trim(),
        description: formData.description.trim(),
        tags: formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        image: formData.image.trim(),
        link: formData.link.trim(),
        likes: formData.likes ?? 0,
        dislikes: formData.dislikes ?? 0,
      };

      if (this.state.editingPost) {
        const response = await fetch(`${API_URL}/${this.state.editingPost.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...this.state.editingPost, ...post }),
        });

        if (!response.ok) {
          throw new Error('Failed to update post');
        }

        const updatedPost = await response.json();
        this.setState((prevState) => ({
          posts: prevState.posts.map((item) =>
            item.id === updatedPost.id ? updatedPost : item,
          ),
          editingPost: null,
        }));
        return;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }

      const createdPost = await response.json();
      this.setState((prevState) => ({
        posts: [createdPost, ...prevState.posts],
      }));
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { posts, loading, editingPost } = this.state;

    return (
      <main style={styles.contentStyle}>
        <PostForm
          key={editingPost?.id ?? 'new'}
          post={editingPost}
          onSubmit={this.handleSubmitPost}
        />
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div style={styles.postsGrid}>
            {posts.map((item) => (
              <Card
                key={item.id}
                data={item}
                onLike={() => this.updateReaction(item, 'likes')}
                onDislike={() => this.updateReaction(item, 'dislikes')}
                onEdit={() => this.editPost(item)}
                onDelete={() => this.deletePost(item.id)}
              />
            ))}
          </div>
        )}
      </main>
    );
  }
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