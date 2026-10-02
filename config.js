// Site settings — edit these, then re-upload this file. See README.md for details.
window.SAFARI_CONFIG = {
  // Where the planner signup form posts. lead.php (same folder) saves each lead and emails inquiries@safari.today.
  signupEndpoint: '/lead.php',

  // WhatsApp number in international format, digits only. Leave empty to hide every WhatsApp button.
  whatsappNumber: '14694500886',

  // Pre-filled first message for each WhatsApp entry point (tells you where the lead came from).
  whatsappMessages: {
    float: 'Hi Safari.today, I’m planning a safari and would love some advice.',
    planner: 'Hi Safari.today, I’d like the First-Time African Safari Planner. I’m planning a trip and have a few questions.',
    zambezi: 'Hi Safari.today, I’m interested in a Lower Zambezi safari. Can you help me plan it?',
    footer: 'Hi Safari.today, I have a question about planning a safari.'
  },

  // Google Analytics 4 measurement ID (e.g. 'G-ABC123XYZ'). Leave empty to load no analytics.
  // Signups and WhatsApp clicks are sent as 'generate_lead' events — mark it as a key event in GA4.
  ga4MeasurementId: ''
};
