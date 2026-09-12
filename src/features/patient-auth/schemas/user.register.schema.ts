import  * as Yup from 'yup';
import { differenceInYears } from 'date-fns';

export  const registrationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters').max(20,"Name must be less than 20 characters"),

  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),

  phone: Yup.string()
    .required('Phone number is required')
    .min(10,"Phone number should be 10 digits").max(13),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters').max(15),

  dateOfBirth: Yup.string()
    .required('Date of birth is required')
    .test('is-18+', 'You must be at least 18 years old', (value) => {
      if (!value) return false;
      const dob = new Date(value);
      const age = differenceInYears(new Date(), dob);
      return age >= 18;
    }),

  role: Yup.mixed<'user'>()
    .oneOf(['user'], 'Invalid role')
    .optional(),

  profilePhoto: Yup.string()
    .url('Profile photo must be a valid URL')
    .optional(),
});


export const loginSchema = Yup.object().shape({
  email:Yup.string().required("Email is required"),
  password:Yup.string().required("Password is required").min(8,"Must will have 8 characters")
})

