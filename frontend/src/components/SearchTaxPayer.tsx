import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, CircularProgress } from '@mui/material';
import { backend } from 'declarations/backend';

interface TaxPayer {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const SearchTaxPayer: React.FC = () => {
  const [tid, setTid] = useState('');
  const [searchResult, setSearchResult] = useState<TaxPayer | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSearchResult(null);

    try {
      const result = await backend.searchTaxPayerByTID(tid);
      if (result.length > 0) {
        setSearchResult(result[0]);
      } else {
        setError('No TaxPayer found with the given TID');
      }
    } catch (error) {
      console.error('Error searching for TaxPayer:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Search TaxPayer
      </Typography>
      <TextField
        label="TID"
        value={tid}
        onChange={(e) => setTid(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Search'}
      </Button>
      {error && (
        <Typography color="error" style={{ marginTop: '10px' }}>
          {error}
        </Typography>
      )}
      {searchResult && (
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6">Search Result:</Typography>
          <Typography>TID: {searchResult.tid}</Typography>
          <Typography>Name: {searchResult.firstName} {searchResult.lastName}</Typography>
          <Typography>Address: {searchResult.address}</Typography>
        </div>
      )}
    </Paper>
  );
};

export default SearchTaxPayer;
