import React, { useState } from "react";
import { MdEmail, MdOutlineShareLocation } from "react-icons/md";
import BreadCrumb from "../../BreadCrumb/BreadCrumb";
import { IoIosCall } from "react-icons/io";
import Swal from "sweetalert2";
import { useLanguage } from "../../contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Show loading state
      Swal.fire({
        title: t('contact.sending'),
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          data: {
            ...formData,
            language: language
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      // Success
      Swal.fire({
        icon: 'success',
        title: t('contact.success'),
        text: t('contact.successMessage'),
        confirmButtonColor: '#DAA520'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('Error sending email:', error);
      Swal.fire({
        icon: 'error',
        title: t('contact.error'),
        text: t('contact.errorMessage'),
        confirmButtonColor: '#1a3a1a'
      });
    }
  };

  return (
    <div>
      <BreadCrumb title="Contact " />

      {/* Contact */}
      {/* Contact with Us */}
      <div className="py-20 2xl:py-[120px] dark:bg-lightBlack">
        <div className="Container bg-whiteSmoke dark:bg-normalBlack px-7 md:px-10 lg:px-14 2xl:px-20 py-10 md:py-14 lg:py-18 xl:py-20 2xl:py-[100px] ">
          <div className="flex items-center flex-col md:flex-row">
            <div
              className="py-5 sm:p-5 flex-1"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <p className="text-Garamond text-base leading-[26px] text-khaki font-medium">
                CONTACT US
              </p>
              <h2 className="text-Garamond text-[22px] sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-[38px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-uppercase text-lightBlack dark:text-white font-semibold my-3 md:my-5">
                CONTACT WITH US
              </h2>
              <p className="text-Lora text-sm sm:text-base leading-[26px]  text-gray dark:text-lightGray font-normal">
                Rapidiously myocardinate cross-platform intellectual capital
                after the model. Appropriately create interactive
                infrastructures after maintance Holisticly facilitate
                stand-alone
              </p>

              {/* call */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                  <IoIosCall
                    size={22}
                    className="text-khaki group-hover:text-whiteSmoke"
                  />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">
                    Call Us Now
                  </p>
                  <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium">
                    +980 123 (4567) 890
                  </p>
                </div>
              </div>
              <hr className="dark:text-gray dark:bg-gray text-lightGray bg-lightGray h-[1px]" />
              {/* email */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                  <MdEmail
                    size={22}
                    className="text-khaki group-hover:text-whiteSmoke"
                  />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">
                    Send Email
                  </p>
                  <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium ">
                    example@gmail.com
                  </p>
                </div>
              </div>
              <hr className="dark:text-gray dark:bg-gray text-lightGray bg-lightGray h-[1px]" />
              {/* location */}
              <div className="flex items-center my-4 md:my-5 lg:my-[26px] group">
                <div className="w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[50px] lg:h-[50px] 2xl:w-[60px] 2xl:h-[60px] bg-white dark:bg-lightBlack group-hover:bg-khaki dark:group-hover:bg-khaki grid items-center justify-center rounded-full transition-all duration-300">
                  <MdOutlineShareLocation
                    size={22}
                    className="text-khaki group-hover:text-whiteSmoke"
                  />
                </div>
                <div className="ml-3 md:ml-4">
                  <p className="font-Lora text-sm leading-[26px] text-gray dark:text-lightGray font-normal">
                    Our Locations
                  </p>
                  <p className="font-Garamond text-lg sm:text-xl md:text-[22px] leading-[26px] text-lightBlack dark:text-white font-medium ">
                    New elephant Road, Dhanmondi <br />
                    Dhaka - 1212
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex-1 py-5 sm:p-5"
              data-aos="zoom-in-up"
              data-aos-duration="1000"
            >
              <div className="bg-lightBlack  p-[30px] lg:p-[45px] 2xl:p-[61px]">
                <h2 className="font-Garamond text-[22px] sm:text-2xl md:text-[28px] leading-7 md:leading-8 lg:leading-9 xl:leading-10 2xl:leading-[44px] text-white font-semibold text-center">
                  GET IN TOUCH
                </h2>
                <form onSubmit={handleSubmit} className="grid items-center grid-cols-1 gap-2 mt-8">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Your Name"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-13 lg:h-[59px] px-4 border  border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Enter E-mail"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-13 lg:h-[59px] px-4 border  border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Phone Number"
                    required
                  />
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full h-12 md:h-13 lg:h-[59px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0  focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    required
                    onFocus={(e) => {
                      e.target.size = 6;
                    }}
                    onBlur={(e) => {
                      e.target.size = 0;
                    }}
                  >
                    <option
                      className="bg-khaki text-white px-3 py-3"
                      value=""
                      disabled
                    >
                      Select Subject
                    </option>
                    <option
                      className="bg-whiteSmoke dark:bg-normalBlack text-lightBlack dark:text-white px-3 py-3"
                      value="General Inquiry"
                    >
                      General Inquiry
                    </option>
                    <option
                      className="bg-whiteSmoke dark:bg-normalBlack text-lightBlack dark:text-white px-3 py-3"
                      value="Loan Information"
                    >
                      Loan Information
                    </option>
                    <option
                      className="bg-whiteSmoke dark:bg-normalBlack text-lightBlack dark:text-white px-3 py-3"
                      value="Account Services"
                    >
                      Account Services
                    </option>
                    <option
                      className="bg-whiteSmoke dark:bg-normalBlack text-lightBlack dark:text-white px-3 py-3"
                      value="Other"
                    >
                      Other
                    </option>
                  </select>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    cols={30}
                    rows={10}
                    className="w-full h-[121px] px-4 border border-gray dark:border-lightGray text-gray dark:text-lightGray outline-none  bg-transparent mt-4 focus:ring-0 placeholder:text-gray resize-none focus:border-gray dark:focus:border-lightGray focus:outline-none"
                    placeholder="Write Message:"
                    required
                  ></textarea>
                  <button type="submit" className="w-full bg-khaki text-white text-center h-10 2xl:h-[55px] mt-5">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* google map */}
      <div data-aos="fade-down" data-aos-duration="1000">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.279909073!2d-74.25987368715491!3d40.69767006458873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1633418400558!5m2!1sen!2sbd"
          height={450}
          allowFullScreen={true}
          loading="lazy"
          className="w-full"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
