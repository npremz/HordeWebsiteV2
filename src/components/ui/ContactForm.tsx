import { useState, useRef, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';

interface FormData {
  besoin: string;
  objectif: string;
  societe: string;
  nom: string;
  email: string;
}

interface FormErrors {
  besoin?: string;
  objectif?: string;
  nom?: string;
  email?: string;
}

interface FormTranslations {
  needLabel: string;
  objectifLabel: string;
  objectifPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  companyLabel: string;
  companyPlaceholder: string;
  submit: string;
  submitting: string;
  successMessage: string;
  errorMessage: string;
  requiredField: string;
  invalidEmail: string;
  options: {
    auditPerformance: string;
    optimisationRefonte: string;
    fromScratchMvp: string;
    autre: string;
  };
}

interface ContactFormProps {
  translations: FormTranslations;
}

export default function ContactForm({ translations: t }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    besoin: '',
    objectif: '',
    societe: '',
    nom: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [formData.objectif]);

  const besoinOptions = [
    { value: 'audit-performance', label: t.options.auditPerformance },
    { value: 'optimisation-refonte', label: t.options.optimisationRefonte },
    { value: 'from-scratch-mvp', label: t.options.fromScratchMvp },
    { value: 'autre', label: t.options.autre },
  ];

  const MAX_LENGTHS = {
    objectif: 2000,
    nom: 100,
    email: 254,
    societe: 200,
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.besoin) {
      newErrors.besoin = t.requiredField;
    }

    if (!formData.objectif.trim()) {
      newErrors.objectif = t.requiredField;
    } else if (formData.objectif.length > MAX_LENGTHS.objectif) {
      newErrors.objectif = `Max ${MAX_LENGTHS.objectif} caractères`;
    }

    if (!formData.nom.trim()) {
      newErrors.nom = t.requiredField;
    } else if (formData.nom.length > MAX_LENGTHS.nom) {
      newErrors.nom = `Max ${MAX_LENGTHS.nom} caractères`;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    } else if (formData.email.length > MAX_LENGTHS.email) {
      newErrors.email = `Max ${MAX_LENGTHS.email} caractères`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: JSX.TargetedEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          besoin: '',
          objectif: '',
          societe: '',
          nom: '',
          email: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form className="mt-10 sm:mt-16 md:mt-24 lg:mt-30 flex flex-col gap-10" onSubmit={handleSubmit} noValidate>
      <fieldset className='flex flex-col gap-5 '>
        <div className='relative flex flex-col md:flex-row gap-5 md:gap-16 lg:gap-32 md:items-center w-full'>
          <legend className='section-label block md:w-36 md:shrink-0 relative'>
            {t.needLabel}<span aria-hidden="true">*</span>
          </legend>
          <div className="w-full flex flex-wrap gap-[1.25rem] lg:gap-[2.5rem] mt-5 pb-5 md:pb-10">
            {besoinOptions.map((option) => (
              <label
                key={option.value}
                className={`uppercase font-mono text-[1rem] leading-[0.6] py-6 px-5 border transition-all duration-300 ease-in-out cursor-pointer ${formData.besoin === option.value
                  ? 'bg-bg-light text-black border-bg-light'
                  : errors.besoin
                    ? 'border-err text-err'
                    : 'border-lines-dark hover:border-bg-light'
                  }`}
              >
                <input
                  type="radio"
                  name="besoin"
                  value={option.value}
                  checked={formData.besoin === option.value}
                  onChange={(e) => handleChange('besoin', e.target.value)}
                  className="sr-only "
                  aria-describedby={errors.besoin ? 'besoin-error' : undefined}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </fieldset>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-32 gap-2.5 sm:gap-5 '>
        <label htmlFor="objectif" className='section-label block md:w-36 md:shrink-0 relative'>
          {t.objectifLabel}<span aria-hidden="true">*</span>
          {errors.objectif && (
            <span id="objectif-error" role="alert" className="md:hidden text-err absolute right-0 top-0">{errors.objectif}</span>
          )}
        </label>
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            id="objectif"
            name="objectif"
            rows={1}
            maxLength={MAX_LENGTHS.objectif}
            className={`py-5 xl:py-8 px-5 md:px-[30px] w-full text-2xl sm:text-[2rem] border bg-transparent focus:outline-none focus-visible:outline-none transition-colors resize-none overflow-hidden ${errors.objectif
              ? 'border-err placeholder:text-err'
              : 'border-lines-dark focus:border-lines'
              }`}
            placeholder={t.objectifPlaceholder}
            value={formData.objectif}
            onInput={(e) => handleChange('objectif', (e.target as HTMLTextAreaElement).value)}
            aria-required="true"
            aria-invalid={!!errors.objectif}
            aria-describedby={errors.objectif ? 'objectif-error' : undefined}
          />
          {errors.objectif && (
            <span id="objectif-error" role="alert" className="section-label text-err block mt-1 absolute right-[30px] top-6 lg:top-8 xl:top-12 hidden md:block">
              {errors.objectif}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-32 gap-2.5 sm:gap-5 '>
        <label htmlFor="nom" className='section-label block md:w-36 md:shrink-0 relative'>
          {t.nameLabel}<span aria-hidden="true">*</span>
          {errors.nom && (
            <span className="md:hidden text-err absolute right-0 top-0">{errors.nom}</span>
          )}
        </label>
        <div className="relative flex-1">
          <input
            type="text"
            id="nom"
            name="nom"
            maxLength={MAX_LENGTHS.nom}
            className={`py-5 xl:py-8 px-5 md:px-[30px] w-full text-2xl sm:text-[2rem] border bg-transparent focus:outline-none focus-visible:outline-none transition-colors ${errors.nom
              ? 'border-err placeholder:text-err'
              : 'border-lines-dark focus:border-lines'
              }`}
            placeholder={t.namePlaceholder}
            value={formData.nom}
            onChange={(e) => handleChange('nom', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? 'nom-error' : undefined}
          />
          {errors.nom && (
            <span id="nom-error" role="alert" className="section-label text-err block mt-1 absolute right-[30px] top-6 lg:top-8 xl:top-12 hidden md:block">
              {errors.nom}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-32 gap-2.5 sm:gap-5 '>
        <label htmlFor="email" className='section-label block md:w-36 md:shrink-0 relative'>
          {t.emailLabel}<span aria-hidden="true">*</span>
          {errors.email && (
            <span className="md:hidden text-err absolute right-0 top-0">{errors.email}</span>
          )}
        </label>
        <div className="relative flex-1">
          <input
            type="email"
            id="email"
            name="email"
            maxLength={MAX_LENGTHS.email}
            className={`py-5 xl:py-8 px-5 md:px-[30px] w-full text-2xl sm:text-[2rem] border bg-transparent focus:outline-none focus-visible:outline-none transition-colors ${errors.email
              ? 'border-err placeholder:text-err'
              : 'border-lines-dark focus:border-lines'
              }`}
            placeholder="@"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" role="alert" className="section-label text-err block mt-1 absolute right-[30px] top-6 lg:top-8 xl:top-12 hidden md:block">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 lg:gap-32 gap-2.5 sm:gap-5 '>
        <label htmlFor="societe" className='section-label block md:w-36 md:shrink-0'>{t.companyLabel}</label>
        <input
          type="text"
          id="societe"
          name="societe"
          maxLength={MAX_LENGTHS.societe}
          className='py-5 xl:py-8 px-5 md:px-[30px] flex-1 text-2xl sm:text-[2rem] border-lines-dark border bg-transparent focus:outline-none focus-visible:outline-none focus:border-lines transition-colors'
          placeholder={t.companyPlaceholder}
          value={formData.societe}
          onChange={(e) => handleChange('societe', e.target.value)}
        />
      </div>

      <div className='flex flex-col md:flex-row md:gap-16 lg:gap-32 md:justify-end'>
        <button type="submit" disabled={isSubmitting} className='group relative overflow-hidden mt-5 sm:mt-10 xl:mt-16 uppercase font-mono text-[1rem] leading-[0.6] py-6 px-5 flex justify-center w-full md:w-fit border border-bg-light bg-bg-light text-black transition-colors duration-300 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed self-center md:self-end'>
          <span className='absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]'></span>
          <span className='relative z-10 text-black group-hover:text-bg-light'>{isSubmitting ? t.submitting : t.submit}</span>
        </button>
      </div>

      {submitStatus === 'success' && (
        <p role="status">{t.successMessage}</p>
      )}

      {submitStatus === 'error' && (
        <p role="alert">{t.errorMessage}</p>
      )}
    </form>
  );
}
