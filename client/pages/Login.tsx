import PlaceholderPage from './Placeholder';

export default function Login() {
  return (
    <PlaceholderPage
      title="Login"
      description="This page will provide authentication for users and admin access."
      features={[
        "Google OAuth integration",
        "Email/password authentication",
        "User registration form",
        "Admin login portal",
        "Password recovery"
      ]}
    />
  );
}
