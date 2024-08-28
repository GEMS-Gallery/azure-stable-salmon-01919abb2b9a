import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import TaxPayerList from './components/TaxPayerList';
import TaxPayerForm from './components/TaxPayerForm';
import SearchTaxPayer from './components/SearchTaxPayer';
import { backend } from 'declarations/backend';

const HeaderImage = styled('div')(({ theme }) => ({
  backgroundImage: 'url(https://images.unsplash.com/photo-1554325139-bbd006cd3e5a?ixid=M3w2MzIxNTd8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MjQ4Nzc4Nzh8&ixlib=rb-4.0.3)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
}));

const App: React.FC = () => {
  const [taxPayers, setTaxPayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaxPayers();
  }, []);

  const fetchTaxPayers = async () => {
    try {
      const result = await backend.getAllTaxPayers();
      setTaxPayers(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tax payers:', error);
      setLoading(false);
    }
  };

  const handleAddTaxPayer = async (newTaxPayer: any) => {
    setLoading(true);
    try {
      await backend.addTaxPayer(newTaxPayer);
      await fetchTaxPayers();
    } catch (error) {
      console.error('Error adding tax payer:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <HeaderImage>
        <Typography variant="h2" component="h1" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          TaxPayer Management System
        </Typography>
      </HeaderImage>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {loading ? (
            <CircularProgress />
          ) : (
            <TaxPayerList taxPayers={taxPayers} />
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <TaxPayerForm onAddTaxPayer={handleAddTaxPayer} />
          <SearchTaxPayer />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
