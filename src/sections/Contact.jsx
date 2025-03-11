import emailjs from '@emailjs/browser';
import { useRef, useState, useEffect } from 'react';

import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';

// Initialize EmailJS with the public key
emailjs.init(import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);

const Contact = () => {
  const formRef = useRef();

  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({ 
    from_name: '', 
    from_email: '', 
    message: '',
    to_name: 'Ahmet Sekerci',
    to_email: 'met.sekerci@gmail.com' 
  });

  useEffect(() => {
    console.log('Using hardcoded credentials for testing');
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Debug log to see form data
    console.log('Form data being sent:', {
      formData: form,
      formElements: {
        from_name: formRef.current.from_name.value,
        from_email: formRef.current.from_email.value,
        message: formRef.current.message.value,
        reply_to: formRef.current.from_email.value,
      }
    });

    // Add reply_to to the form before sending
    const formElement = formRef.current;
    const replyToInput = document.createElement('input');
    replyToInput.type = 'hidden';
    replyToInput.name = 'reply_to';
    replyToInput.value = form.from_email;
    formElement.appendChild(replyToInput);

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result);
          // Remove the temporary reply_to input
          formElement.removeChild(replyToInput);
          setLoading(false);
          showAlert({
            show: true,
            text: 'Thank you for your message 😃',
            type: 'success',
          });

          setTimeout(() => {
            hideAlert(false);
            setForm({
              from_name: '',
              from_email: '',
              message: '',
              to_name: 'Ahmet Sekerci',
              to_email: 'met.sekerci@gmail.com'
            });
          }, [3000]);
        },
        (error) => {
          // Remove the temporary reply_to input in case of error
          formElement.removeChild(replyToInput);
          console.error('EmailJS error:', error);
          setLoading(false);
          
          showAlert({
            show: true,
            text: `Failed to send message: ${error.text || 'Unknown error'}`,
            type: 'danger',
          });
        },
      );
  };

  return (
    <section className="c-space my-20" id="contact">
      {alert.show && <Alert {...alert} />}

      <div className="relative min-h-screen flex items-center justify-center flex-col">
        <img src="/assets/terminal.png" alt="terminal-bg" className="absolute inset-0 min-h-screen" />

        <div className="contact-container">
          <h3 className="head-text">Let's talk</h3>
          <p className="text-lg text-white-600 mt-3">
            Looking for a skilled software developer with strong testing expertise? I combine development skills with a robust QA background, 
            ensuring high-quality, well-tested applications. Let's discuss how I can help with your project.
          </p>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="from_name"
                value={form.from_name}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., John Doe"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email address</span>
              <input
                type="email"
                name="from_email"
                value={form.from_email}
                onChange={handleChange}
                required
                className="field-input"
                placeholder="ex., johndoe@gmail.com"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Your message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="field-input"
                placeholder="Share your thoughts or inquiries..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}

              <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
