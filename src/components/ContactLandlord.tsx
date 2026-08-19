'use client';

interface ContactLandlordProps {
  landlordName: string;
  landlordPhone: string;
  propertyTitle: string;
  landlordEmail?: string;
}

export default function ContactLandlord({
  landlordName,
  landlordPhone,
  propertyTitle,
  landlordEmail,
}: ContactLandlordProps) {
  const message = `Hi ${landlordName}, I saw your listing for ${propertyTitle} on Academic Abodes and I'm interested in a viewing.`;

  if (!landlordPhone) {
    const mailtoSubject = encodeURIComponent(`Viewing request: ${propertyTitle}`);
    const mailtoBody = encodeURIComponent(message);
    const mailtoHref = landlordEmail
      ? `mailto:${landlordEmail}?subject=${mailtoSubject}&body=${mailtoBody}`
      : `mailto:?subject=${mailtoSubject}&body=${mailtoBody}`;

    return (
      <a
        href={mailtoHref}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-body-md font-semibold text-white transition hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <span className="material-symbols-outlined text-base">mail</span>
        Email Landlord
      </a>
    );
  }

  const phoneDigits = landlordPhone.replace(/\D/g, '');
  const waLink = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-body-md font-semibold text-white transition hover:bg-[#1ebe5d] focus:outline-none focus:ring-2 focus:ring-[#25D366]"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.13c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
      </svg>
      Contact on WhatsApp
    </a>
  );
}
