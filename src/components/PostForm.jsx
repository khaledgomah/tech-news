import { useCallback, useState } from 'react';

const initialState = {
  ai_name: '',
  provider: '',
  description: '',
  category: '',
  image: '',
  link: '',
  likes: 0,
  dislikes: 0,
};

function getFormState(post) {
  if (!post) {
    return { ...initialState };
  }

  return {
    ...initialState,
    ...post,
    category: post.category ?? '',
  };
}

function PostForm({ onSubmit, post, submitting = false }) {
  const [formState, setFormState] = useState(() => getFormState(post));

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await onSubmit(formState);
      setFormState(getFormState(post));
    },
    [onSubmit, formState, post],
  );

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3 style={styles.title}>{post ? 'Update AI Post' : 'Add New AI Post'}</h3>
      <input style={styles.input} name="ai_name" value={formState.ai_name} onChange={handleChange} placeholder="AI Name" required />
      <input style={styles.input} name="provider" value={formState.provider} onChange={handleChange} placeholder="Provider" required />
      <textarea style={styles.textarea} name="description" value={formState.description} onChange={handleChange} placeholder="Description" required />
      <input style={styles.input} name="category" value={formState.category} onChange={handleChange} placeholder="Category" required />
      <input style={styles.input} name="image" value={formState.image} onChange={handleChange} placeholder="Image URL" />
      <input style={styles.input} type="url" name="link" value={formState.link} onChange={handleChange} placeholder="https://example.com" required />
      <div style={styles.actionsRow}>
        <button style={styles.submit} type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : post ? 'Update Post' : 'Add Post'}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px',
    padding: '16px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    backgroundColor: '#f9fafb',
  },
  title: {
    margin: 0,
    color: '#111827',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
  },
  textarea: {
    minHeight: '90px',
    resize: 'vertical',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
  },
  actionsRow: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  submit: {
    padding: '10px 12px',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#111827',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
  },
};

export default PostForm;
