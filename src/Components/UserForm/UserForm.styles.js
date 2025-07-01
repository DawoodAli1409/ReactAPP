// UserForm.styles.js
import { styled } from '@mui/material/styles';
import { 
  TextField, 
  FormControl, 
  Typography, 
  Button,
  FormLabel,
  Box
} from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0.5),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
  fontWeight: 600,
  textAlign: 'center',
  fontSize: '1.25rem'
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: 42,  // Slightly larger than small but not too big
    fontSize: '0.875rem'
  },
  '& .MuiFormHelperText-root': {
    fontSize: '0.75rem',
    marginTop: 4,
    lineHeight: 1.2
  }
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  height: 42,
  fontSize: '0.9rem',
  fontWeight: 600,
  textTransform: 'uppercase'
}));

export const RequiredField = styled(FormLabel)(({ theme }) => ({
  fontSize: '0.85rem',
  fontWeight: 500,
  color: theme.palette.text.primary,
  display: 'block'
}));