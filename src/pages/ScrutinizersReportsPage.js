import React from 'react';
import { Container, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

function ScrutinizersReportsPage() {
  const fileName = 'Scrutinizer Report_Globlegreen.pdf';
  const href = `${process.env.PUBLIC_URL}/pdf/${encodeURIComponent(fileName)}`;

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Scrutinizer's Reports
      </Typography>

      <Stack spacing={2}>
        <Card variant="outlined">
          <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Scrutinizer Report - 1st AGM
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              component="a"
              href={href}
              download="Scrutinizer-Report_Globlegreen.pdf"
            >
              Download PDF
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}

export default ScrutinizersReportsPage;
