import React from 'react';

const initialState = {
  ai_name: '',
  provider: '',
  description: '',
  tags: '',
  image: '',
  link: '',
  likes: 0,
  dislikes: 0,
};

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getFormState(props.post);
  }

  getFormState = (post) => {
    if (!post) {
      return { ...initialState };
    }

    return {
      ...initialState,
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags ?? '',
    };
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.onSubmit(this.state);
    this.setState(this.getFormState(this.props.post));

  };

  render() {
    const { submitting = false, post } = this.props;

    return (
      <form onSubmit={this.handleSubmit} style={styles.form}>
        <h3 style={styles.title}>{post ? 'Update AI Post' : 'Add New AI Post'}</h3>
        <input style={styles.input} name="ai_name" value={this.state.ai_name} onChange={this.handleChange} placeholder="AI Name" required />
        <input style={styles.input} name="provider" value={this.state.provider} onChange={this.handleChange} placeholder="Provider" required />
        <textarea style={styles.textarea} name="description" value={this.state.description} onChange={this.handleChange} placeholder="Description" required />
        <input style={styles.input} name="tags" value={this.state.tags} onChange={this.handleChange} placeholder="Tags" required />
        <input style={styles.input} name="image" value={this.state.image} onChange={this.handleChange} placeholder="Image URL" />
        <input style={styles.input} type="url" name="link" value={this.state.link} onChange={this.handleChange} placeholder="https://example.com" required />
        <div style={styles.actionsRow}>
          <button style={styles.submit} type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : post ? 'Update Post' : 'Add Post'}
          </button>
        </div>
      </form>
    );
  }
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
