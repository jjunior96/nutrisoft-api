interface IRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

export { IRequest };
