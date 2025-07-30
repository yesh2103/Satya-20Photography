import { RequestHandler } from "express";
import { z } from "zod";

// Local types to avoid circular dependency with shared types during vite config loading
type ServiceType = 'wedding' | 'prewedding' | 'newborn' | 'birthdays' | 'retirement' | 'events' | 'engagement';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  event_type: ServiceType;
  event_date: string;
  message?: string;
}

const SERVICE_TYPES: { value: ServiceType; label: string }[] = [
  { value: 'wedding', label: 'Wedding' },
  { value: 'prewedding', label: 'Pre-wedding' },
  { value: 'newborn', label: 'New Born Photoshoot' },
  { value: 'birthdays', label: 'Birthdays' },
  { value: 'retirement', label: 'Retirement' },
  { value: 'events', label: 'Events' },
  { value: 'engagement', label: 'Engagement' },
];

// Validation schema for contact form
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number too long"),
  event_type: z.enum(
    SERVICE_TYPES.map((s) => s.value) as [string, ...string[]],
    {
      errorMap: () => ({ message: "Invalid event type" }),
    },
  ),
  event_date: z.string().refine((date) => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }, "Event date must be today or in the future"),
  message: z.string().max(1000, "Message too long").optional(),
});

export const handleContactForm: RequestHandler = async (req, res) => {
  try {
    // Validate request body
    const validatedData = contactFormSchema.parse(req.body);

    // In a real implementation, you would:
    // 1. Save to database (Supabase, PostgreSQL, etc.)
    // 2. Send email notification to owner
    // 3. Send confirmation email to user

    // For now, we'll simulate the process
    console.log("Contact form submission received:", validatedData);

    // Simulate database save
    const submission = {
      id: `contact_${Date.now()}`,
      ...validatedData,
      submitted_at: new Date().toISOString(),
    };

    // Send email notifications
    try {
      const emailService = await import('../services/emailService');
      await Promise.all([
        emailService.emailService.sendOwnerNotification(validatedData as ContactFormData),
        emailService.emailService.sendUserConfirmation(validatedData as ContactFormData)
      ]);
    } catch (emailError) {
      console.error('Email sending failed, but form was submitted:', emailError);
      // Don't fail the request if email fails - form submission is more important
    }

    res.status(201).json({
      success: true,
      message: "Contact form submitted successfully",
      submission_id: submission.id,
    });
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};



// Get all contact form submissions (owner only)
export const getContactSubmissions: RequestHandler = async (req, res) => {
  try {
    // In a real implementation, you would:
    // 1. Verify user is authenticated and has owner role
    // 2. Fetch submissions from database

    // For now, return empty array
    res.json({
      success: true,
      submissions: [],
      message: "Contact submissions retrieved successfully",
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
