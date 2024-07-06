import { Typed } from 'typed.ts';

enum TyperCategory {
  eraser,
  writer
}

const typerErase = (data: string, callback: FunctionStringCallback): Typed => {
  let messageComplete = false;
  const typed = new Typed({
    callback: (text: string) => {
      if (!messageComplete) {
        messageComplete = text == data;
        return;
      }
      callback(text);
    }
  });
  typed.fastForward();
  typed.type(data, { perLetterDelay: 0 });
  typed.backspace(data.length, { eraseDelay: { min: 40, max: 80 } });
  return typed;
};

const typerWrite = (data: string, callback: FunctionStringCallback): Typed => {
  const typed = new Typed({ callback: callback });
  typed.type(data, {
    eraseDelay: { min: 40, max: 80 },
    perLetterDelay: { min: 50, max: 85 },
    noSpecialCharErrors: true,
    errorMultiplier: 0.15
  });
  return typed;
};

const Typer = (type: TyperCategory): Function =>
  ({
    [TyperCategory.writer]: typerWrite,
    [TyperCategory.eraser]: typerErase
  })[type];

export { TyperCategory, Typer };
