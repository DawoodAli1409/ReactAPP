// Add these imports
import { styled } from '@mui/material/styles';

// Styled Components
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)'
  }
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
}));

// Update your table JSX
<StyledTableContainer component={Paper}>
  <Typography variant="h6" gutterBottom sx={{ 
    p: 2, 
    fontWeight: 600,
    color: 'primary.main'
  }}>
    User Records
  </Typography>
  <Table>
    <StyledTableHead>
      <TableRow>
        <TableCell sx={{ color: 'white', fontWeight: 600 }}>ID</TableCell>
        {/* Other headers */}
      </TableRow>
    </StyledTableHead>
    {/* Table body */}
  </Table>
</StyledTableContainer>

export default UserForm