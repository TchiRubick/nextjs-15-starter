class InternalError extends Error {
  constructor(
    message: string | Error | unknown,
    public code: string,
    public status: number = 400
  ) {
    if (message instanceof Error) {
      message = message.message;
    }

    super(message as string);
    this.name = 'InternalError';
  }
}

export default InternalError;
