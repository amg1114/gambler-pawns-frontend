import { User } from "@/app/lib/interfaces/models/user.interface";
import { UpdateUserResponse } from "@/app/lib/interfaces/responses/updateUser-res.interface";
import axios from "@/app/lib/_axios";
import { Session } from "next-auth";
import { z, ZodObject } from "zod";
import { PasswordForm } from "@/app/lib/interfaces/models/password-form.interface";
import { UpdatePasswordRes } from "@/app/lib/interfaces/responses/updatePassword-res.interface";

/**
 * Hook to edit user details.
 *
 * @param data - The user data to be updated.
 * @param session - The current session containing user ID and token.
 * @returns A promise that resolves to a boolean indicating the success of the update operation.
 *
 * @throws Will log an error message to the console if the update operation fails.
 */
export const useEditDetails = async (
  data: Partial<User>,
  session: Session,
): Promise<{ success: boolean; changes?: Partial<User> }> => {
  try {
    const res = await axios.patch<UpdateUserResponse>(
      `/user/${session!.data.userId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session!.data.token}`,
        },
      },
    );

    return { success: res.data.status, changes: data };
  } catch (error) {
    console.error("Error updating user details: ", error);
    return { success: false };
  }
};

export const useEditPassword = async (
  data: PasswordForm,
  session: Session,
): Promise<{ success: boolean; message: string }> => {
  try {
    const res = await axios.patch<UpdatePasswordRes>(
      `/auth/update-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${session!.data.token}`,
        },
      },
    );

    if (!res.data.status) {
      if (res.data.statusCode === 500) throw new Error(res.data.data.message);
      return {
        success: false,
        message:
          res.data.data.message ||
          "An error occurred while updating the password",
      };
    }

    return {
      success: res.data.status,
      message: "Password updated successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error,
    };
  }
};

/**
 * Compares the provided user data with the session data and returns an object containing only the changes.
 *
 * @param data - The user data to compare.
 * @param session - The current session data.
 * @returns An object containing the changes between the provided user data and the session data.
 */
export const useGetEditedUserChanges = (
  data: User,
  session: Session,
): Partial<User> | null => {
  const changes: Partial<User> = {};

  for (const key in data) {
    if (data[key as keyof User] !== session.data[key as keyof User]) {
      if (data[key as keyof User] !== undefined) {
        changes[key as keyof User] = data[key as keyof User] as any;
      }
    }
  }

  if (Object.keys(changes).length === 0) {
    return null;
  }

  return changes;
};

/**
 * Checks if the user data has any errors.
 *
 * This function takes a partial `User` object and checks if any of its values
 * are `undefined`, an empty string, or `null`. If any such values are found,
 * the function returns `true`, indicating that the user data has errors.
 *
 * @param data - A partial `User` object containing user data to be validated.
 * @returns `true` if any value in the user data is `undefined`, an empty string, or `null`; otherwise, `false`.
 */
export const userDataHasErrors = <T extends z.ZodRawShape>(
  data: Partial<User | PasswordForm>,
  schema: ZodObject<T> | null,
) => {
  let val = Object.values(data).some(
    (val) => val === undefined || val === "" || val === null,
  );

  if (schema) {
    try {
      schema.parse(data);
    } catch (err) {
      val = true;
    }
  }

  return val;
};

/**
 * Updates the current session with new user data and calls the update function.
 *
 * @param newData - Partial user data to be merged into the current session data.
 * @param session - The current session object.
 * @param update - A function that takes a session object and returns a promise to update the session.
 * @returns A promise that resolves when the session has been updated.
 */
export const updateSession = async (
  newData: Partial<User>,
  session: Session,
  update: (s: Session) => Promise<Session | null>,
) => {
  const newSession = {
    ...session,
    data: {
      ...session!.data,
      ...newData,
    },
  };
  await update(newSession);
};
