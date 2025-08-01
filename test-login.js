// Simple test to verify login credentials
const testCredentials = [
  { email: 'Rajkarthikeya10@gmail.com', password: 'SatyaANil@0804' },
  { email: 'rajkarthikeya10@gmail.com', password: 'SatyaANil@0804' },
  { email: 'Rajkarthikeya10@gmail.com', password: 'SatyaAnil@0804' },
  { email: 'rajkarthikeya10@gmail.com', password: 'SatyaAnil@0804' }
];

testCredentials.forEach((cred, index) => {
  const validEmail = cred.email.toLowerCase() === 'rajkarthikeya10@gmail.com';
  const validPassword = cred.password === 'SatyaANil@0804' || cred.password === 'SatyaAnil@0804';
  
  console.log(`Test ${index + 1}:`, {
    email: cred.email,
    password: cred.password,
    validEmail,
    validPassword,
    shouldPass: validEmail && validPassword
  });
});
