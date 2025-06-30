import { styled } from '@mui/material/styles';
import { 
  Box,
  Button,
  TextField,
  FormControl,
  FormLabel,
  Typography
} from '@mui/material';

export const FormContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

export const FormTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.primary.main,
  fontWeight: 600,
  textAlign: 'center',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  '& .MuiFormHelperText-root': {
    position: 'relative',
    marginTop: theme.spacing(0.5),
    color: theme.palette.error.main,
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
  width: '100%',
}));

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-focused': {
    color: theme.palette.text.primary,
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  fontWeight: 600,
  fontSize: '1rem',
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.75rem',
  marginTop: theme.spacing(-1),
  marginBottom: theme.spacing(1),
}));

export const RequiredField = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.875rem',
  marginBottom: theme.spacing(0.5),
  '&:after': {
    content: '"*"',
    color: theme.palette.error.main,
    marginLeft: theme.spacing(0.5),
  },
}));