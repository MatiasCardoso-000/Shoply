
import React from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';

const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form className="max-w-lg mx-auto">
        <div className="mb-4">
          <Input label="Name" type="text" placeholder="Your Name" />
        </div>
        <div className="mb-4">
          <Input label="Email" type="email" placeholder="Your Email" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-shadow duration-300"
            placeholder="Your Message"
          ></textarea>
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
};

export default Contact;
