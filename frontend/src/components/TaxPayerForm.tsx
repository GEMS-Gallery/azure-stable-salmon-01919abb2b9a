import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Paper, Typography, Grid } from '@mui/material';

interface TaxPayerFormProps {
  onAddTaxPayer: (data: TaxPayerFormData) => void;
}

interface TaxPayerFormData {
  tid: string;
  firstName: string;
  lastName: string;
  address: string;
}

const TaxPayerForm: React.FC<TaxPayerFormProps> = ({ onAddTaxPayer }) => {
  const { control, handleSubmit, reset } = useForm<TaxPayerFormData>();

  const onSubmit = (data: TaxPayerFormData) => {
    onAddTaxPayer(data);
    reset();
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Add New TaxPayer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="tid"
              control={control}
              defaultValue=""
              rules={{ required: 'TID is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="TID"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{ required: 'First name is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="First Name"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{ required: 'Last name is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Last Name"
                  fullWidth
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{ required: 'Address is required' }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  label="Address"
                  fullWidth
                  multiline
                  rows={3}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add TaxPayer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default TaxPayerForm;
