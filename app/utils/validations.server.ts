type InputFormErrors = {
    title: FormDataEntryValue | null;
    amount: FormDataEntryValue | null;
    date: FormDataEntryValue | null;
}

export type ResponseFormErrors = {
    title?:string;
    amount?: string;
    date?: string;
}

export type AuthFormErrors = {
    email?: string; 
    password?:string
}

function isValidTitle(value: FormDataEntryValue | null) {
    if(typeof value !== 'string') return false;
    return value && value.trim().length > 0 && value.trim().length <= 30;
}
  
function isValidAmount(value:FormDataEntryValue | null) {
    if(typeof value !== 'string') return false;
    const amount = parseFloat(value);
    return !isNaN(amount) && amount > 0;
}
  
function isValidDate(value:FormDataEntryValue | null) {
    if(typeof value !== 'string') return false;
    return value && new Date(value).getTime() < new Date().getTime();
}
  
export function validateExpenseInput(input: InputFormErrors) {
    let validationErrors:ResponseFormErrors = {}

    if (!isValidTitle(input.title)) {
        validationErrors.title = 'Invalid expense title. Must be at most 30 characters long.'
    }

    if (!isValidAmount(input.amount)) {
        validationErrors.amount = 'Invalid amount. Must be a number greater than zero.'
    }

    if (!isValidDate(input.date)) {
        validationErrors.date = 'Invalid date. Must be a date before today.'
    }

    if (Object.keys(validationErrors).length > 0) {
        throw validationErrors;
    }
}

function isValidEmail(value:string) {
    return value && value.includes('@');
  }
  
  function isValidPassword(value:string) {
    return value && value.trim().length >= 7;
  }
  
  export function validateCredentials(input:{email:string; password: string}) {
    let validationErrors:AuthFormErrors = {};
  
    if (!isValidEmail(input.email)) {
      validationErrors.email = 'Invalid email address.'
    }
  
    if (!isValidPassword(input.password)) {
      validationErrors.password = 'Invalid password. Must be at least 7 characters long.'
    }
  
    if (Object.keys(validationErrors).length > 0) {
      throw validationErrors;
    }
  }