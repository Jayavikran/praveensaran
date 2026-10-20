/**
 * Utility for generating RFC 5545 .ics calendar files and Google Calendar links.
 * Event: Praveen & Saran Baby Shower Function
 * Date: October 25, 2026 at 10:00 AM IST (+05:30)
 */

export function downloadCalendarInvite() {
  const event = {
    title: 'Baby Shower – Praveen & Saran',
    description:
      'We are delighted to invite you to our Baby Shower function! Join us as we celebrate a precious new chapter filled with love, blessings, and happiness.\\n\\nCouple: Praveen & Saran\\nVenue: Sivakasi Mandapam\\nTime: 10:00 AM IST',
    location: 'Sivakasi Mandapam',
    // 10:00 AM IST (UTC+5:30) = 04:30 UTC
    startUtc: '20261025T043000Z',
    // 1:30 PM IST = 08:00 UTC
    endUtc: '20261025T080000Z',
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Praveen & Saran//Baby Shower Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:praveen-saran-babyshower-20261025@invitation.app`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${event.startUtc}`,
    `DTEND:${event.endUtc}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Praveen & Saran Baby Shower tomorrow at 10:00 AM!',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'Praveen_Saran_Baby_Shower.ics';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  window.URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent('Baby Shower – Praveen & Saran');
  const details = encodeURIComponent(
    'We are delighted to invite you to our Baby Shower function. Join us as we celebrate a precious new chapter filled with love, blessings, and happiness!\n\nCouple: Praveen & Saran\nVenue: Sivakasi Mandapam\nTime: 10:00 AM IST'
  );
  const location = encodeURIComponent('Sivakasi Mandapam');
  const dates = '20261025T043000Z/20261025T080000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}
