function Header({ searchTerm, searchBy, onSearchTermChange, onSearchByChange }) {
  return (
    <header style={styles.headerStyle}>
      <h1 style={styles.title}>Tech News</h1>
      <div style={styles.searchRow}>
        <input
          style={styles.searchInput}
          type="search"
          placeholder={searchBy === 'title' ? 'Search by title' : 'Search by category'}
          value={searchTerm}
          onChange={(event) => onSearchTermChange(event.target.value)}
        />
        <select
          style={styles.searchSelect}
          value={searchBy}
          onChange={(event) => onSearchByChange(event.target.value)}
        >
          <option value="title">Title</option>
          <option value="category">Category</option>
        </select>
      </div>
    </header>
  );
}

const styles = { headerStyle : {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    marginBottom: '20px'
  },
  title: {
    margin: '0 0 12px',
  },
  searchRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  searchInput: {
    minWidth: '240px',
    maxWidth: '380px',
    width: '100%',
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
  },
  searchSelect: {
    padding: '8px 10px',
    borderRadius: '6px',
    border: '1px solid #d1d5db',
  },
}
export default Header;
