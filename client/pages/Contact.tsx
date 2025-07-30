import PlaceholderPage from './Placeholder';

export default function Contact() {
  return (
    <PlaceholderPage
      title="Contact"
      description="This page will feature our contact form and business information (login required for form)."
      features={[
        "Contact form with event details",
        "Email integration for inquiries",
        "Business location and hours",
        "Social media links",
        "Booking calendar integration"
      ]}
    />
  );
}
