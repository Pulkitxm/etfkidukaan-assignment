import { z } from "zod";

export enum RBAC_ROLES {
  ADMIN = "admin",
  USER = "user",
}

export enum OPERATIONS {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
}

export const RBAC: Record<RBAC_ROLES, Record<OPERATIONS, boolean>> = {
  [RBAC_ROLES.ADMIN]: {
    [OPERATIONS.READ]: true,
    [OPERATIONS.WRITE]: true,
    [OPERATIONS.DELETE]: true,
  },
  [RBAC_ROLES.USER]: {
    [OPERATIONS.READ]: true,
    [OPERATIONS.WRITE]: false,
    [OPERATIONS.DELETE]: false,
  },
};

export const validateUser = z.object({
  email: z.string().email(),
  password: z.string().min(3),
  role: z.nativeEnum(RBAC_ROLES),
});
export type USER = z.infer<typeof validateUser>;
