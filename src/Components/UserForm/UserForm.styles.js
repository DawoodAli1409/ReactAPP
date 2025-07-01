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
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  fontWeight: 600,
  textAlign: 'center',
  fontSize: '1.5rem'
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  width: '100%',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(1),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: '1rem',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)'
  }
}));

export const RequiredField = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(1),
  display: 'block',
  fontWeight: 500,
  '&:after': {
    content: '"*"',
    color: theme.palette.error.main,
    marginLeft: theme.spacing(0.5),
  },
}));