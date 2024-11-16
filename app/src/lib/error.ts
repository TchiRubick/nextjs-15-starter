class InternalError extends Error {
  constructor(
    message: string | Error | unknown,
    public code: string,
    public status: number = 400
  ) {
    if (message instanceof Error) {
      message = message.message;
    }
    console.info('----------------------');
    console.warn('INTERNAL ERROR EXCEPTION');
    console.error(code, message);
    console.info('----------------------');
    super(message as string);
    this.name = 'InternalError';
  }
}

export default InternalError;
