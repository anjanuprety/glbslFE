import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Utility functions for date conversion between BS and AD
const convertBStoAD = (bsDate: string): string => {
  if (!bsDate || bsDate.length !== 10) return '';
  
  try {
    const [bsYear, bsMonth, bsDay] = bsDate.split('-').map(Number);
    
    // Basic conversion with approximate month/day adjustment
    // In a real app, you'd use a proper conversion library like nepali-date
    let adYear = bsYear - 57;
    let adMonth = bsMonth;
    let adDay = bsDay;
    
    // Rough adjustment for BS/AD calendar differences
    if (bsMonth >= 1 && bsMonth <= 3) {
      // Chaitra, Baishakh, Jestha roughly correspond to April-June
      adMonth = bsMonth + 3;
      if (adMonth > 12) {
        adMonth -= 12;
        adYear += 1;
      }
    } else if (bsMonth >= 4 && bsMonth <= 9) {
      // Mid-year months have less offset
      adMonth = bsMonth + 3;
      if (adMonth > 12) {
        adMonth -= 12;
        adYear += 1;
      }
    } else {
      // Later months (Aswin, Kartik, Mangsir, Poush)
      adMonth = bsMonth - 9;
      if (adMonth <= 0) {
        adMonth += 12;
        adYear -= 1;
      }
    }
    
    // Adjust day if necessary
    if (adDay > 28 && adMonth === 2) adDay = 28; // February adjustment
    if (adDay > 30 && [4, 6, 9, 11].includes(adMonth)) adDay = 30; // 30-day months
    
    return `${adYear}-${adMonth.toString().padStart(2, '0')}-${adDay.toString().padStart(2, '0')}`;
  } catch {
    return '';
  }
};

const convertADtoBS = (adDate: string): string => {
  if (!adDate || adDate.length !== 10) return '';
  
  try {
    const [adYear, adMonth, adDay] = adDate.split('-').map(Number);
    
    // Basic conversion with approximate month/day adjustment
    let bsYear = adYear + 57;
    let bsMonth = adMonth;
    let bsDay = adDay;
    
    // Rough adjustment for AD/BS calendar differences
    if (adMonth >= 4 && adMonth <= 6) {
      // April-June roughly correspond to Chaitra, Baishakh, Jestha
      bsMonth = adMonth - 3;
      if (bsMonth <= 0) {
        bsMonth += 12;
        bsYear -= 1;
      }
    } else if (adMonth >= 7 && adMonth <= 12) {
      // Mid to late year
      bsMonth = adMonth - 3;
    } else {
      // January-March
      bsMonth = adMonth + 9;
      bsYear -= 1;
    }
    
    // Adjust day if necessary for Nepali calendar
    if (bsDay > 32) bsDay = 32; // Some Nepali months can have 32 days
    
    return `${bsYear}-${bsMonth.toString().padStart(2, '0')}-${bsDay.toString().padStart(2, '0')}`;
  } catch {
    return '';
  }
};

// Calculate age from date of birth
const calculateAge = (dateOfBirth: string): string => {
  if (!dateOfBirth) return '';
  
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return `${years}Y ${months}M ${days}D`;
};

// Validation schema for the job application form
const validationSchema = Yup.object({
  // Personal Information
  fullName: Yup.string().required('Full Name is required'),
  fullNameNepali: Yup.string().required('नाम थर (देवनागरीमा) is required'),
  fatherName: Yup.string().required('Father\'s Name is required'),
  motherName: Yup.string().required('Mother\'s Name is required'),
  grandfatherName: Yup.string().required('Grandfather\'s Name is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  dateOfBirthAD: Yup.date().required('Date of Birth (AD) is required'),
  calculatedAge: Yup.string(),
  age: Yup.number().required('Age is required').min(18, 'Must be at least 18 years old'),
  gender: Yup.string().required('Gender is required'),
  maritalStatus: Yup.string().required('Marital Status is required'),
  nationality: Yup.string().required('Nationality is required'),
  
  // Address Information
  permanentAddress: Yup.string().required('Permanent Address is required'),
  temporaryAddress: Yup.string().required('Temporary Address is required'),
  sameAsPermAddress: Yup.boolean(),
  contactNumber: Yup.string().required('Contact Number is required'),
  alternateNumber: Yup.string(),
  email: Yup.string().email('Invalid email').required('Email is required'),
  
  // Citizenship Information
  citizenshipNumber: Yup.string().required('Citizenship Number is required'),
  citizenshipIssueDate: Yup.date().required('Citizenship Issue Date is required'),
  citizenshipIssuePlace: Yup.string().required('Citizenship Issue Place is required'),
  
  // Driving License Information
  hasDrivingLicense: Yup.boolean(),
  drivingLicenseCategory: Yup.string(),
  drivingLicenseNumber: Yup.string(),
  
  // Educational Qualifications
  slcYear: Yup.number().required('SLC/SEE Year is required'),
  slcGrade: Yup.string().required('SLC/SEE Grade is required'),
  slcBoard: Yup.string().required('SLC/SEE Board is required'),
  
  plusTwoYear: Yup.number(),
  plusTwoGrade: Yup.string(),
  plusTwoBoard: Yup.string(),
  
  bachelorYear: Yup.number(),
  bachelorGrade: Yup.string(),
  bachelorUniversity: Yup.string(),
  bachelorSubject: Yup.string(),
  
  masterYear: Yup.number(),
  masterGrade: Yup.string(),
  masterUniversity: Yup.string(),
  masterSubject: Yup.string(),
  
  // Work Experience
  hasWorkExperience: Yup.boolean(),
  workExperiences: Yup.array().of(
    Yup.object().shape({
      position: Yup.string(),
      company: Yup.string(),
      duration: Yup.string(),
      responsibilities: Yup.string(),
    })
  ),
  
  // Training and Certifications
  hasTrainingCertifications: Yup.boolean(),
  trainingCertifications: Yup.array().of(
    Yup.object().shape({
      title: Yup.string(),
      institution: Yup.string(),
      duration: Yup.string(),
      description: Yup.string(),
    })
  ),
  
  // Position Applied For
  positionAppliedFor: Yup.string().required('Position Applied For is required'),
});

// Initial form values
const initialValues = {
  // Personal Information
  fullName: '',
  fullNameNepali: '',
  fatherName: '',
  motherName: '',
  grandfatherName: '',
  age: '',
  gender: '',
  maritalStatus: '',
  nationality: 'Nepali',
  dateOfBirth: '',
  dateOfBirthAD: '',
  calculatedAge: '',
  
  // Address Information
  permanentAddress: '',
  temporaryAddress: '',
  sameAsPermAddress: false,
  contactNumber: '',
  alternateNumber: '',
  email: '',
  
  // Citizenship Information
  citizenshipNumber: '',
  citizenshipIssueDate: '',
  citizenshipIssuePlace: '',
  
  // Driving License Information
  hasDrivingLicense: false,
  drivingLicenseCategory: '',
  drivingLicenseNumber: '',
  
  // Educational Qualifications
  slcYear: '',
  slcGrade: '',
  slcBoard: '',
  
  plusTwoYear: '',
  plusTwoGrade: '',
  plusTwoBoard: '',
  
  bachelorYear: '',
  bachelorGrade: '',
  bachelorUniversity: '',
  bachelorSubject: '',
  
  masterYear: '',
  masterGrade: '',
  masterUniversity: '',
  masterSubject: '',
  
  // Work Experience
  hasWorkExperience: false,
  workExperiences: [{ position: '', company: '', duration: '', responsibilities: '' }],
  
  // Training and Certifications
  hasTrainingCertifications: false,
  trainingCertifications: [{ title: '', institution: '', duration: '', description: '' }],
  
  // Position Applied For
  positionAppliedFor: '',
};

interface JobApplicationFormProps {
  onSubmit: (values: any, photo: File | null) => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string>('');

  const totalSteps = 5;

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setPhotoError('');

    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setPhotoError('Please select an image file (JPEG, PNG, etc.)');
        return;
      }

      // Validate file size (300KB = 307200 bytes)
      if (file.size > 307200) {
        setPhotoError('Photo size must be less than 300KB');
        return;
      }

      setUploadedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (values: any) => {
    onSubmit(values, uploadedPhoto);
  };

  const renderProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {Math.round((currentStep / totalSteps) * 100)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div 
          className="bg-khaki h-2 rounded-full transition-all duration-300" 
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStepContent = (values: any, setFieldValue: any) => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Personal Information / व्यक्तिगत विवरण
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name (English) / पूरा नाम (अंग्रेजीमा) *
                </label>
                <Field
                  name="fullName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name (Nepali) / नाम थर (देवनागरीमा) *
                </label>
                <Field
                  name="fullNameNepali"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="fullNameNepali" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Father's Name / बुबाको नाम *
                </label>
                <Field
                  name="fatherName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="fatherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mother's Name / आमाको नाम *
                </label>
                <Field
                  name="motherName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="motherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grandfather's Name / हजुरबुबाको नाम *
                </label>
                <Field
                  name="grandfatherName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="grandfatherName" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth (BS) / जन्म मिति (वि.सं.) *
                </label>
                <Field
                  name="dateOfBirth"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value;
                    // Allow only numbers and hyphens, limit year to 4 digits
                    value = value.replace(/[^\d-]/g, '');
                    
                    // Format as YYYY-MM-DD
                    if (value.length >= 4 && value.indexOf('-') === -1) {
                      value = value.substring(0, 4) + '-' + value.substring(4);
                    }
                    if (value.length >= 7 && value.lastIndexOf('-') === 4) {
                      value = value.substring(0, 7) + '-' + value.substring(7, 9);
                    }
                    
                    setFieldValue('dateOfBirth', value);
                    // Auto-convert to AD and update the AD field
                    if (value.length === 10) {
                      const adDate = convertBStoAD(value);
                      setFieldValue('dateOfBirthAD', adDate);
                      const age = calculateAge(adDate);
                      setFieldValue('calculatedAge', age);
                    }
                  }}
                />
                <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth (AD) / जन्म मिति (इ.सं.) *
                </label>
                <Field
                  name="dateOfBirthAD"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  maxLength={10}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    let value = e.target.value;
                    // Allow only numbers and hyphens, limit year to 4 digits
                    value = value.replace(/[^\d-]/g, '');
                    
                    // Format as YYYY-MM-DD
                    if (value.length >= 4 && value.indexOf('-') === -1) {
                      value = value.substring(0, 4) + '-' + value.substring(4);
                    }
                    if (value.length >= 7 && value.lastIndexOf('-') === 4) {
                      value = value.substring(0, 7) + '-' + value.substring(7, 9);
                    }
                    
                    setFieldValue('dateOfBirthAD', value);
                    // Auto-convert to BS and update the BS field
                    if (value.length === 10) {
                      const bsDate = convertADtoBS(value);
                      setFieldValue('dateOfBirth', bsDate);
                      const age = calculateAge(value);
                      setFieldValue('calculatedAge', age);
                    }
                  }}
                />
                <ErrorMessage name="dateOfBirthAD" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Age / उमेर *
                </label>
                <Field
                  name="age"
                  type="number"
                  min="18"
                  max="100"
                  placeholder={values.calculatedAge ? `Calculated: ${values.calculatedAge}` : "Enter age"}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender / लिङ्ग *
                </label>
                <Field
                  as="select"
                  name="gender"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                >
                  <option value="">Select Gender / लिङ्ग छन्नुहोस्</option>
                  <option value="male">Male / पुरुष</option>
                  <option value="female">Female / महिला</option>
                  <option value="other">Other / अन्य</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marital Status / वैवाहिक स्थिति *
                </label>
                <Field
                  as="select"
                  name="maritalStatus"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                >
                  <option value="">Select Status / स्थिति छन्नुहोस्</option>
                  <option value="single">Single / अविवाहित</option>
                  <option value="married">Married / विवाहित</option>
                  <option value="divorced">Divorced / सम्बन्ध विच्छेद</option>
                  <option value="widowed">Widowed / विधवा/विधुर</option>
                </Field>
                <ErrorMessage name="maritalStatus" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nationality / राष्ट्रियता *
                </label>
                <Field
                  name="nationality"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="nationality" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Contact Information / सम्पर्क विवरण
            </h3>
            
            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Permanent Address / स्थायी ठेगाना *
                </label>
                <Field
                  as="textarea"
                  name="permanentAddress"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="permanentAddress" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Temporary Address / अस्थायी ठेगाना *
                </label>
                <div className="mb-2">
                  <label className="flex items-center space-x-2">
                    <Field
                      name="sameAsPermAddress"
                      type="checkbox"
                      className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue('sameAsPermAddress', e.target.checked);
                        if (e.target.checked) {
                          setFieldValue('temporaryAddress', values.permanentAddress);
                        } else {
                          setFieldValue('temporaryAddress', '');
                        }
                      }}
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Same as permanent address / स्थायी ठेगाना जस्तै
                    </span>
                  </label>
                </div>
                <Field
                  as="textarea"
                  name="temporaryAddress"
                  rows={3}
                  disabled={values.sameAsPermAddress}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white disabled:bg-gray-100 disabled:text-gray-500"
                />
                <ErrorMessage name="temporaryAddress" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Number / सम्पर्क नम्बर *
                  </label>
                  <Field
                    name="contactNumber"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="contactNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Alternate Number / वैकल्पिक नम्बर
                  </label>
                  <Field
                    name="alternateNumber"
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="alternateNumber" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address / इमेल ठेगाना *
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <h4 className="text-lg font-semibold text-lightBlack dark:text-white font-Garamond mt-8 mb-4">
              Citizenship Information / नागरिकता विवरण
            </h4>

            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Citizenship Number / नागरिकता नम्बर *
                </label>
                <Field
                  name="citizenshipNumber"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="citizenshipNumber" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Date / जारी मिति *
                  </label>
                  <Field
                    name="citizenshipIssueDate"
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="citizenshipIssueDate" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issue Place / जारी गर्ने ठाउँ *
                  </label>
                  <Field
                    name="citizenshipIssuePlace"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="citizenshipIssuePlace" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-lightBlack dark:text-white font-Garamond mt-8 mb-4">
              Driving License Information / सवारी चालक अनुमतिपत्र विवरण
            </h4>

            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="flex items-center space-x-2 mb-4">
                  <Field
                    name="hasDrivingLicense"
                    type="checkbox"
                    className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    I have a driving license / मसँग सवारी चालक अनुमतिपत्र छ
                  </span>
                </label>
              </div>

              {values.hasDrivingLicense && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      License Category / अनुमतिपत्र श्रेणी
                    </label>
                    <Field
                      as="select"
                      name="drivingLicenseCategory"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                    >
                      <option value="">Select Category / श्रेणी छन्नुहोस्</option>
                      <option value="bike">Bike / मोटरसाइकल</option>
                      <option value="scooter">Scooter / स्कुटर</option>
                      <option value="car_jeep">Car/Jeep / कार/जीप</option>
                      <option value="multiple">Multiple Categories / धेरै श्रेणी</option>
                    </Field>
                    <ErrorMessage name="drivingLicenseCategory" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      License Number / अनुमतिपत्र नम्बर
                    </label>
                    <Field
                      name="drivingLicenseNumber"
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                    />
                    <ErrorMessage name="drivingLicenseNumber" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Educational Qualifications / शैक्षिक योग्यता
            </h3>
            
            {/* SLC/SEE */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                SLC/SEE
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष *
                  </label>
                  <Field
                    name="slcYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="slcYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी *
                  </label>
                  <Field
                    name="slcGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="slcGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Board / बोर्ड *
                  </label>
                  <Field
                    name="slcBoard"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="slcBoard" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* +2/Intermediate */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                +2/Intermediate / उच्च माध्यमिक
              </h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष
                  </label>
                  <Field
                    name="plusTwoYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="plusTwoYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी
                  </label>
                  <Field
                    name="plusTwoGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="plusTwoGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Board / बोर्ड
                  </label>
                  <Field
                    name="plusTwoBoard"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="plusTwoBoard" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Bachelor */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                Bachelor's Degree / स्नातक
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष
                  </label>
                  <Field
                    name="bachelorYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी
                  </label>
                  <Field
                    name="bachelorGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University / विश्वविद्यालय
                  </label>
                  <Field
                    name="bachelorUniversity"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorUniversity" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject / विषय
                  </label>
                  <Field
                    name="bachelorSubject"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="bachelorSubject" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>

            {/* Master */}
            <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
              <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                Master's Degree / स्नातकोत्तर
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Year / वर्ष
                  </label>
                  <Field
                    name="masterYear"
                    type="number"
                    min="1980"
                    max="2030"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterYear" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grade/Division / श्रेणी
                  </label>
                  <Field
                    name="masterGrade"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterGrade" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    University / विश्वविद्यालय
                  </label>
                  <Field
                    name="masterUniversity"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterUniversity" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject / विषय
                  </label>
                  <Field
                    name="masterSubject"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                  />
                  <ErrorMessage name="masterSubject" component="div" className="text-red-500 text-sm mt-1" />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Work Experience & Training / कार्य अनुभव र तालिम
            </h3>
            
            <div>
              <label className="flex items-center space-x-2">
                <Field
                  name="hasWorkExperience"
                  type="checkbox"
                  className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  I have work experience / मसँग कार्य अनुभव छ
                </span>
              </label>
            </div>

            {values.hasWorkExperience && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                  Work Experience Details / कार्य अनुभवको विवरण
                </h4>
                {values.workExperiences.map((experience: any, index: number) => (
                  <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Position / पद
                        </label>
                        <Field
                          name={`workExperiences.${index}.position`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Company / कम्पनी
                        </label>
                        <Field
                          name={`workExperiences.${index}.company`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration / अवधि
                        </label>
                        <Field
                          name={`workExperiences.${index}.duration`}
                          type="text"
                          placeholder="e.g., Jan 2020 - Dec 2022"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Key Responsibilities / मुख्य जिम्मेवारीहरू
                        </label>
                        <Field
                          as="textarea"
                          name={`workExperiences.${index}.responsibilities`}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                    </div>
                    {values.workExperiences.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newExperiences = values.workExperiences.filter((_: any, i: number) => i !== index);
                          setFieldValue('workExperiences', newExperiences);
                        }}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Experience / अनुभव हटाउनुहोस्
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newExperiences = [...values.workExperiences, { position: '', company: '', duration: '', responsibilities: '' }];
                    setFieldValue('workExperiences', newExperiences);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-300"
                >
                  Add Another Experience / अर्को अनुभव थप्नुहोस्
                </button>
              </div>
            )}

            <div>
              <label className="flex items-center space-x-2">
                <Field
                  name="hasTrainingCertifications"
                  type="checkbox"
                  className="w-4 h-4 text-khaki bg-gray-100 border-gray-300 rounded focus:ring-khaki focus:ring-2"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  I have training or certifications / मसँग तालिम वा प्रमाणपत्रहरू छन्
                </span>
              </label>
            </div>

            {values.hasTrainingCertifications && (
              <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                <h4 className="text-lg font-medium text-lightBlack dark:text-white mb-4">
                  Training & Certifications / तालिम र प्रमाणपत्रहरू
                </h4>
                {values.trainingCertifications.map((training: any, index: number) => (
                  <div key={index} className="border border-gray-100 dark:border-gray-700 rounded-lg p-4 mb-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Training/Certification Title / तालिम/प्रमाणपत्रको शीर्षक
                        </label>
                        <Field
                          name={`trainingCertifications.${index}.title`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Institution / संस्था
                        </label>
                        <Field
                          name={`trainingCertifications.${index}.institution`}
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Duration / अवधि
                        </label>
                        <Field
                          name={`trainingCertifications.${index}.duration`}
                          type="text"
                          placeholder="e.g., 3 months, 2021"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Description / विवरण
                        </label>
                        <Field
                          as="textarea"
                          name={`trainingCertifications.${index}.description`}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                        />
                      </div>
                    </div>
                    {values.trainingCertifications.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          const newTrainings = values.trainingCertifications.filter((_: any, i: number) => i !== index);
                          setFieldValue('trainingCertifications', newTrainings);
                        }}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm"
                      >
                        Remove Training / तालिम हटाउनुहोस्
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const newTrainings = [...values.trainingCertifications, { title: '', institution: '', duration: '', description: '' }];
                    setFieldValue('trainingCertifications', newTrainings);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-300"
                >
                  Add Another Training / अर्को तालिम थप्नुहोस्
                </button>
              </div>
            )}

            <h4 className="text-lg font-semibold text-lightBlack dark:text-white font-Garamond mt-8 mb-4">
              Position Applied For / आवेदन दिएको पद
            </h4>

            <div className="grid md:grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Position Applied For / आवेदन दिएको पद *
                </label>
                <Field
                  name="positionAppliedFor"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-khaki focus:border-transparent bg-white dark:bg-normalBlack text-lightBlack dark:text-white"
                />
                <ErrorMessage name="positionAppliedFor" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-lightBlack dark:text-white font-Garamond mb-4">
              Photo Upload / तस्बिर अपलोड
            </h3>
            
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
              <div className="text-center">
                <div className="mb-4">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
                <div className="mb-4">
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer bg-khaki hover:bg-opacity-90 text-white px-4 py-2 rounded-md font-medium transition-colors duration-300"
                  >
                    Select Photo / तस्बिर छन्नुहोस्
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  PNG, JPG, JPEG files up to 300KB / PNG, JPG, JPEG फाइलहरू ३०० KB सम्म
                </p>
                
                {photoError && (
                  <p className="text-red-500 text-sm mt-2">{photoError}</p>
                )}
              </div>
              
              {photoPreview && (
                <div className="mt-6 text-center">
                  <img
                    src={photoPreview}
                    alt="Photo preview"
                    className="mx-auto h-32 w-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                  />
                  <p className="text-sm text-green-600 mt-2">
                    Photo uploaded successfully / तस्बिर सफलतापूर्वक अपलोड भयो
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Photo Requirements / तस्बिरका आवश्यकताहरू:
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Passport size photo / राहदानी साइजको तस्बिर</li>
                <li>• Clear and recent photo / स्पष्ट र हालको तस्बिर</li>
                <li>• Maximum file size: 300KB / अधिकतम फाइल साइज: ३०० KB</li>
                <li>• Supported formats: JPG, JPEG, PNG / समर्थित ढाँचा: JPG, JPEG, PNG</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="max-w-4xl mx-auto bg-white dark:bg-normalBlack border border-gray-200 dark:border-gray-700 rounded-lg p-8 shadow-lg">
          {renderProgressBar()}
          
          {renderStepContent(values, setFieldValue)}
          
          <div className="flex justify-between pt-8 border-t border-gray-200 dark:border-gray-600 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="px-6 py-2 rounded-md font-medium transition-colors duration-300 bg-green-600 text-white hover:bg-green-700"
              >
                Previous / अघिल्लो
              </button>
            )}
            
            <div className={currentStep === 1 ? 'ml-auto' : ''}>
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-2 bg-khaki text-white rounded-md font-medium hover:bg-opacity-90 transition-colors duration-300"
                >
                  Next / अर्को
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors duration-300"
                >
                  Submit Application / आवेदन पेश गर्नुहोस्
                </button>
              )}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default JobApplicationForm;
