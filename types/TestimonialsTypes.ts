export interface TestimonialClient {
  fullName: string;
  phoneNumber: string;
  image?: string;
}

export interface TestimonialTypes {
  _id: string;
  client: TestimonialClient;
  description: string;
  createdAt: string;
  updatedAt: string;
}
