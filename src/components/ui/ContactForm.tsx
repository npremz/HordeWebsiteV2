import { useState, type FormEvent } from 'react';

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

export default function ContactForm() {
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

  const besoinOptions = [
    { value: 'audit-performance', label: 'Audit & performance' },
    { value: 'optimisation-refonte', label: 'Optimisation & refonte' },
    { value: 'from-scratch-mvp', label: 'From scratch & MVP' },
    { value: 'autre', label: 'Autre' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.besoin) {
      newErrors.besoin = 'Ce champ est obligatoire';
    }

    if (!formData.objectif.trim()) {
      newErrors.objectif = 'Ce champ est obligatoire';
    }

    if (!formData.nom.trim()) {
      newErrors.nom = 'Ce champ est obligatoire';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Ce champ est obligatoire';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Adresse email invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
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
    <form className="mt-10 sm:mt-16 md:mt-24 lg:mt-30 flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
      <fieldset className='flex flex-col gap-5 '>
        <div className='flex flex-col md:flex-row gap-5 md:gap-16 md:items-center w-full'>
          <legend className='section-label block md:w-36 md:shrink-0'>
            J'ai besoin de<span aria-hidden="true">*</span>
          </legend>
          <div className="flex flex-wrap gap-5 mt-5 border-b pb-5 md:pb-10 border-lines-dark">
            {besoinOptions.map((option) => (
              <label 
                key={option.value} 
                className={`uppercase font-mono py-5 px-4 border transition-all duration-300 ease-in-out cursor-pointer ${
                  formData.besoin === option.value 
                    ? 'bg-bg-light text-black border-bg-light' 
                    : 'border-lines-dark hover:border-bg/50'
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
          {errors.besoin && (
            <span id="besoin-error" role="alert">
              {errors.besoin}
            </span>
          )}
        </div>
      </fieldset>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-2.5 sm:gap-5 '>
        <label htmlFor="objectif" className='section-label block md:w-36 md:shrink-0'>
          Objectif<span aria-hidden="true">*</span>
        </label>
        <div className="flex-1">
          <input
            type="text"
            id="objectif"
            name="objectif"
            className='py-5 xl:py-8 w-full text-2xl sm:text-[2rem] lg:text-[2.5rem] xl:text-[3.125rem] border-lines-dark border-b bg-transparent'
            placeholder='Ce que vous avez en tête...'
            value={formData.objectif}
            onChange={(e) => handleChange('objectif', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.objectif}
            aria-describedby={errors.objectif ? 'objectif-error' : undefined}
          />
          {errors.objectif && (
            <span id="objectif-error" role="alert" className="block mt-1">
              {errors.objectif}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-2.5 sm:gap-5 '>
        <label htmlFor="societe" className='section-label block md:w-36 md:shrink-0'>Societe</label>
        <input
          type="text"
          id="societe"
          name="societe"
          className='py-5 xl:py-8 flex-1 text-2xl sm:text-[2rem] lg:text-[2.5rem] xl:text-[3.125rem] border-lines-dark border-b bg-transparent'
          placeholder='Nom de société'
          value={formData.societe}
          onChange={(e) => handleChange('societe', e.target.value)}
        />
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-2.5 sm:gap-5 '>
        <label htmlFor="nom" className='section-label block md:w-36 md:shrink-0'>
          Nom<span aria-hidden="true">*</span>
        </label>
        <div className="flex-1">
          <input
            type="text"
            id="nom"
            name="nom"
            className='py-5 xl:py-8 w-full text-2xl sm:text-[2rem] lg:text-[2.5rem] xl:text-[3.125rem] border-lines-dark border-b bg-transparent'
            placeholder="Un autographe, s’il vous plaît"
            value={formData.nom}
            onChange={(e) => handleChange('nom', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? 'nom-error' : undefined}
          />
          {errors.nom && (
            <span id="nom-error" role="alert" className="block mt-1">
              {errors.nom}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-2.5 sm:gap-5 '>
        <label htmlFor="email" className='section-label block md:w-36 md:shrink-0'>
          Email<span aria-hidden="true">*</span>
        </label>
        <div className="flex-1">
          <input
            type="email"
            id="email"
            name="email"
            className='py-5 xl:py-8 w-full text-2xl sm:text-[2rem] lg:text-[2.5rem] xl:text-[3.125rem] border-lines-dark border-b bg-transparent'
            placeholder="@"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" role="alert" className="block mt-1">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:gap-16'>
        <div className="block md:w-36 md:shrink-0"></div>
        <button type="submit" disabled={isSubmitting} className='mt-5 sm:mt-10 xl:mt-16 uppercase font-mono py-5 xl:py-6 bg-bg-light text-black flex-1'>
          {isSubmitting ? 'Envoi en cours...' : 'Transmettre'}
        </button>
      </div>

      {submitStatus === 'success' && (
        <p role="status">Message envoye avec succes !</p>
      )}

      {submitStatus === 'error' && (
        <p role="alert">Une erreur est survenue. Veuillez reessayer.</p>
      )}
    </form>
  );
}
