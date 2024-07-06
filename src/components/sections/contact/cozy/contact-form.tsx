'use client';

import { cn } from '@/utility/tailwind-utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { LoaderCircleIcon } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { generateCompany, generateGoodbye, generateGreeting, generateName } from '@/utility/name-generator';
import { contactSubmit } from '@/actions/email';
import { toast } from '@/components/ui/use-toast';
import { sleep } from '@/utility/extended-js';
import { TyperCategory, Typer } from '@/utility/typer';

interface ValidationErrors {
  success: boolean;
  message: string;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    message?: string[] | undefined;
  };
}

interface IContactMock {
  name: string;
  email: string;
  message: string;
}

interface IFormTyper {
  text: string;
  type: ContactFormField;
}

enum ContactFormField {
  name,
  email,
  message
}

const contactMock : IContactMock = {
  name: 'Deff Jones',
  email: 'macjens@example.com',
  message: 'Hi,\n\nHow are you? :)'
}

const generateData = () : IContactMock => {
  const names = generateName();
  const company = generateCompany();

  return {
    name: names,
    email: names.charAt(0).toLowerCase() + names.split(' ')[1].toLowerCase() + "@"+company.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()+".com",
    message:
      `${generateGreeting()}!\n\nThis is ${names}, from ${company}. ${generateGoodbye()}`
  };
}

const initialState: ValidationErrors = {
  success: false,
  errors: {},
  message: ''
};

export default function ContactForm() {
  const [ regenerate, setRegenerate ] = useState<boolean>(true);

  const [ mockName, setMockName ] = useState<string>(contactMock.name);
  const [ mockEmail, setMockEmail ] = useState<string>(contactMock.email);
  const [ mockMessage, setMockMessage ] = useState<string>(contactMock.message);

  const ref = useRef(null);
  const isInView = useInView(ref);

  const modifyPlaceholders = async (typerConfig: IFormTyper[], type: TyperCategory) => {
    const callbacks = {
      [ContactFormField.name]: setMockName,
      [ContactFormField.email]: setMockEmail,
      [ContactFormField.message]: setMockMessage,
    };
    
    for (const typer of typerConfig) {
      let factory = Typer(type);
      let typed = factory(typer.text, callbacks[typer.type]);
      await typed.run();
    }
  }

  // current state, generator, finally cb and modify cb
  const regenerateTexts = async () => {
    await new Promise(async (resolve) => {
      const typerConfig: IFormTyper[] = [
        {text: mockMessage, type: ContactFormField.message},
        {text: mockEmail, type: ContactFormField.email},
        {text: mockName, type: ContactFormField.name},
      ];
      await modifyPlaceholders(typerConfig, TyperCategory.eraser);
      resolve(sleep(1250));
    }).then(async () => {
      const seedData = generateData();
      const typerConfig: IFormTyper[] = [
        {text: seedData.name, type: ContactFormField.name},
        {text: seedData.email, type: ContactFormField.email},
        {text: seedData.message, type: ContactFormField.message},
      ];
      await modifyPlaceholders(typerConfig, TyperCategory.writer);
    }).finally(() => setRegenerate(true));
  }

  useEffect(() => {
    if (isInView && regenerate) {
      setRegenerate(false);
      setTimeout(regenerateTexts, 2500);
    }
  }, [isInView, regenerate]);


  const [isFocused, setIsFocused] = useState(0);
  const handleOnFocus = () => {
    setIsFocused(isFocused+1);
  }; 

  const handleBlur = () => { 
    setIsFocused(0);
  };

  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(contactSubmit, initialState);

  useEffect(() => {
    if (state?.message === '') return;

    toast({
      title: state?.message
    });
  }, [state]);

  return (
    <form action={formAction} onFocus={handleOnFocus} onBlur={handleBlur} className="grid gap-4">
        <div ref={ref} className="grid gap-3">
        <Label
          htmlFor="name"
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            state?.errors?.name && 'text-red-500 dark:text-red-900'
          )}
        >
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder={mockName}
          required
          disabled={pending}
        />
        <p className="text-sm font-medium text-red-500 dark:text-red-900">
          {state?.errors?.name}
        </p>
      </div>
      <div className="grid gap-3">
        <Label
          htmlFor="email"
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            state?.errors?.email && 'text-red-500 dark:text-red-900'
          )}
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder={mockEmail}
          required
          type="email"
          disabled={pending}
        />
        <p className="text-sm font-medium text-red-500 dark:text-red-900">
          {state?.errors?.email}
        </p>
      </div>
      <div className="grid gap-3">
        <Label
          htmlFor="message"
          className={cn(
            'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            state?.errors?.message && 'text-red-500 dark:text-red-900'
          )}
        >
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder={mockMessage}
          required
          disabled={pending}
        />
        <p className="text-sm font-medium text-red-500 dark:text-red-900">
          {state?.errors?.message}
        </p>
      </div>

      <Button type="submit" disabled={pending}>
        {pending && <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
}
