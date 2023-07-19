export interface UserSeed {
  email: string;
  password: string;
}

export const userSeedData: UserSeed[] = [
  {
    email: 'admin@bookstore.com',
    password: '$2a$10$a2V8Wi38hBfab4Mc5HcNiOQj/njOHHyOy5JLzsyEMcL5qdQ7/RwIG',
  },
];
