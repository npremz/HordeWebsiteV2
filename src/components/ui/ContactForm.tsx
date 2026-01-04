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
    besoin: 'audit-performance',
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
    <form className="mt-16 sm:mt-24 md:mt-32 lg:mt-40 flex flex-col gap-12 sm:gap-20" onSubmit={handleSubmit} noValidate>
      <fieldset className='flex flex-col gap-8'>
        <div className='relative flex flex-col md:flex-row gap-8 md:gap-16 md:items-start w-full'>
          <legend className='section-label block md:w-36 md:shrink-0 md:pt-6'>
            J'ai besoin de<span aria-hidden="true">*</span>
          </legend>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-b pb-12 sm:pb-20 border-lines-dark">
            {besoinOptions.map((option) => (
              <label 
                key={option.value} 
                className={`uppercase font-mono text-sm leading-none p-6 border transition-all duration-500 ease-in-out cursor-pointer flex items-center justify-between group ${
                  formData.besoin === option.value 
                    ? 'bg-bg-light text-black border-bg-light' 
                    : 'border-lines-dark hover:border-lines text-bg-light/60 hover:text-bg-light'
                }`}
              >
                <input
                  type="radio"
                  name="besoin"
                  value={option.value}
                  checked={formData.besoin === option.value}
                  onChange={(e) => handleChange('besoin', e.target.value)}
                  className="sr-only"
                  aria-describedby={errors.besoin ? 'besoin-error' : undefined}
                />
                <span>{option.label}</span>
                <span className={`text-lg transition-transform duration-500 ${formData.besoin === option.value ? 'rotate-45' : 'group-hover:translate-x-1'}`}>
                  {formData.besoin === option.value ? '×' : '→'}
                </span>
              </label>
            ))}
          </div>
          {errors.besoin && (
            <span id="besoin-error" role="alert" className='section-label text-err absolute right-0 top-0'>
              {errors.besoin}
            </span>
          )}
        </div>
      </fieldset>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-4'>
        <label htmlFor="objectif" className='section-label block md:w-36 md:shrink-0'>
          Objectif<span aria-hidden="true">*</span>
        </label>
        <div className="relative flex-1 group">
          <input
            type="text"
            id="objectif"
            name="objectif"
            className={`py-6 xl:py-10 w-full text-2xl sm:text-4xl lg:text-5xl xl:text-6xl border-b bg-transparent focus:outline-none focus-visible:outline-none transition-all duration-500 ${
              errors.objectif
                ? 'border-b-err placeholder:text-err text-err'
                : 'border-lines-dark focus:border-b-bg-light text-bg-light placeholder:text-lines-dark focus:placeholder:text-lines'
            }`}
            placeholder='Ce que vous avez en tête...'
            value={formData.objectif}
            onChange={(e) => handleChange('objectif', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.objectif}
            aria-describedby={errors.objectif ? 'objectif-error' : undefined}
          />
          {errors.objectif && (
            <span id="objectif-error" role="alert" className="section-label text-err block mt-2 absolute right-0 bottom-full mb-2">
              {errors.objectif}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-4'>
        <label htmlFor="societe" className='section-label block md:w-36 md:shrink-0'>Société</label>
        <input
          type="text"
          id="societe"
          name="societe"
          className='py-6 xl:py-10 flex-1 text-2xl sm:text-4xl lg:text-5xl xl:text-6xl border-lines-dark border-b bg-transparent text-bg-light placeholder:text-lines-dark focus:outline-none focus:border-b-bg-light transition-all duration-500'
          placeholder='Nom de société'
          value={formData.societe}
          onChange={(e) => handleChange('societe', e.target.value)}
        />
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-4'>
        <label htmlFor="nom" className='section-label block md:w-36 md:shrink-0'>
          Nom<span aria-hidden="true">*</span>
        </label>
        <div className="relative flex-1">
          <input
            type="text"
            id="nom"
            name="nom"
            className={`py-6 xl:py-10 w-full text-2xl sm:text-4xl lg:text-5xl xl:text-6xl border-b bg-transparent transition-all duration-500 ${
              errors.nom
                ? 'border-b-err placeholder:text-err text-err'
                : 'border-lines-dark focus:border-b-bg-light text-bg-light placeholder:text-lines-dark'
            }`}
            placeholder="Un autographe, s'il vous plaît"
            value={formData.nom}
            onChange={(e) => handleChange('nom', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? 'nom-error' : undefined}
          />
          {errors.nom && (
            <span id="nom-error" role="alert" className="section-label text-err block mt-2 absolute right-0 bottom-full mb-2">
              {errors.nom}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:items-center md:gap-16 gap-4'>
        <label htmlFor="email" className='section-label block md:w-36 md:shrink-0'>
          Email<span aria-hidden="true">*</span>
        </label>
        <div className="relative flex-1">
          <input
            type="email"
            id="email"
            name="email"
            className={`py-6 xl:py-10 w-full text-2xl sm:text-4xl lg:text-5xl xl:text-6xl border-b bg-transparent transition-all duration-500 ${
              errors.email
                ? 'border-b-err placeholder:text-err text-err'
                : 'border-lines-dark focus:border-b-bg-light text-bg-light placeholder:text-lines-dark'
            }`}
            placeholder="@"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" role="alert" className="section-label text-err block mt-2 absolute right-0 bottom-full mb-2">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className='flex flex-col md:flex-row md:gap-16 mt-8 sm:mt-12'>
        <div className="hidden md:block md:w-36 md:shrink-0"></div>
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className='group relative flex-1 bg-bg-light text-black uppercase font-mono py-8 px-12 text-xl overflow-hidden transition-all duration-500 hover:bg-white active:scale-[0.98]'
        >
          <span className="relative z-10">{isSubmitting ? 'Envoi en cours...' : 'Transmettre le projet'}</span>
          <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>

      {submitStatus === 'success' && (
        <div className="md:ml-52 p-6 bg-white/10 border border-bg-light/20 backdrop-blur-sm">
          <p role="status" className="font-mono uppercase text-bg-light">
            Message envoyé avec succès ! On revient vers vous très vite.
          </p>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="md:ml-52 p-6 bg-err/10 border border-err/20 backdrop-blur-sm">
          <p role="alert" className="font-mono uppercase text-err">
            Une erreur est survenue. N'hésitez pas à nous contacter directement par email.
          </p>
        </div>
      )}
    </form>

      {submitStatus === 'success' && (
        <p role="status">Message envoye avec succes !</p>
      )}

      {submitStatus === 'error' && (
        <p role="alert">Une erreur est survenue. Veuillez reessayer.</p>
      )}
    </form>
  );
}
