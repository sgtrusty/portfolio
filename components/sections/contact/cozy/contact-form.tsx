'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { Typed } from 'typed.ts';
import { useInView } from 'framer-motion';
import { generateCompany, generateGoodbye, generateGreeting, generateName } from '@/components/utility/name-generator';
import { contactSubmit } from '@/app/actions';
import { toast } from '@/components/ui/use-toast';

interface ValidationErrors {
  success: boolean;
  message: string;
  errors?: {
    name?: string[] | undefined;
    email?: string[] | undefined;
    message?: string[] | undefined;
  };
}

interface ContactFormProps extends React.HTMLAttributes<HTMLDivElement> {
  state: ValidationErrors;
}

interface IContactMock {
  name: string;
  email: string;
  message: string;
}

const contactMock : IContactMock = {
  name: 'Deff Jones',
  email: 'macjens@example.com',
  message: 'Hi,\n\nHow are you? :)'
}

const generateTyped = (data: string, cb : (str: string) => void) : Typed => {
  const typed = new Typed({ callback: cb });
  typed
    .type(data, {
      eraseDelay: { min: 40, max: 80 },
      perLetterDelay: { min: 50, max: 125 },
      noSpecialCharErrors: true,
      errorMultiplier: 0.25
    });
  return typed;
}

const generateEraser = (data: string, cb : FunctionStringCallback) : Typed => {
  let messageComplete = false;
  const typed = new Typed({ callback: (text: string) => {
    if (!messageComplete) {
      messageComplete = text == data;
      return;
    }
    cb(text);
  }});
  typed.fastForward();
  typed.type(data, {perLetterDelay: 0});
  typed.backspace(data.length, {eraseDelay: { min: 40, max: 80 }});
  return typed;
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

  const regenerateTexts = async () => {
    const typedList : Typed[] = [];
    let typed: Typed;
    
    typed = generateEraser(mockMessage, (text: string) => {
      setMockMessage(text);
    })
    typedList.push(typed);

    typed = generateEraser(mockEmail, (text: string) => {
      setMockEmail(text);
    });
    typedList.push(typed);

    typed = generateEraser(mockName, (text: string) => {
      setMockName(text);
    });
    typedList.push(typed);

    const seedData = generateData();
    typed = generateTyped(seedData.name, setMockName);
    typedList.push(typed);
    
    typed = generateTyped(seedData.email, setMockEmail);
    typedList.push(typed);
    
    typed = generateTyped(seedData.message, setMockMessage);
    typedList.push(typed);

    // TODO: stop typing if focused, function to set data immediately (probs updateText)

    for (const index in typedList) {
      await typedList[index].run();
    }

    setRegenerate(true);
  }

  useEffect(() => {
    if (isInView && regenerate) {
      setRegenerate(false);
      setTimeout(regenerateTexts, 2500);
    }
  }, [isInView, regenerate]);

  const { pending } = useFormStatus();

  const [isFocused, setIsFocused] = useState(0);
  const handleOnFocus = () => {
    setIsFocused(isFocused+1);
  }; 

  const handleBlur = () => { 
    const original = isFocused;
    setTimeout(()=> {
      if (isFocused == original) {
        console.log(isFocused, original);
        setIsFocused(0);
      }
    }, 500)
  };

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
