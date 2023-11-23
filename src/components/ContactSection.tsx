import '../css/ContactSection.css';
import { useTheme } from '../utils/themeContext';

const ContactSection = () => {
  const recipientEmail = 'zeinabkordeh@yahoo.com'; 
  const { theme } = useTheme();

  const emailSubject = 'Contact Inquiry';
  const emailBody = 'I would like to get in touch with you regarding...'; 

  const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const sharedStyles = {
    color: theme.secondaryColor,
    backgroundColor: theme.primaryColor,
    border: `1px solid ${theme.secondaryColor}`,
  };

  return (
    <>
      <div className='ContactMe' id='contact-section'>
        <h1 className='contact-title'>Get in touch</h1>
        <p>Now that you know a lot about me, let me know if you are interested in working with me.</p>
        <a href={mailtoLink} className='contact-button' style={sharedStyles}>
          Contact Me
        </a>
      </div>
    </>
  );
}

export default ContactSection;
