import '../css/ContactSection.css';

const ContactSection = () => {
  const recipientEmail = 'zeinabkordeh@yahoo.com'; 

  const emailSubject = 'Contact Inquiry';
  const emailBody = 'I would like to get in touch with you regarding...'; 

  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <>
      <div className='ContactMe'>
        <h1 className='contact-title'>Get in touch</h1>
        <p>Now that you know a lot about me, let me know if you are interested in working with me.</p>
        <a href={mailtoLink} className='contact-button'>
          Contact Me
        </a>
      </div>
    </>
  );
}

export default ContactSection;
