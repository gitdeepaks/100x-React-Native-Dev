import { createContext, PropsWithChildren, useContext, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

export const PersonalInfoSchema = z.object({
  fullName: z
    .string({ message: "Full name is required!" })
    .min(1, { message: "Full name must be longer than 1" }),
  address: z.string().min(1, { message: "Please provide your address!" }),
  city: z.string().min(1, { message: "City is required!" }),
  postcode: z.string().min(1, { message: "Postal code is required!" }),
  country: z.string().length(2, { message: "Country is required!" }),
  phone: z.string().min(1, { message: "Phone is required!" }),
  birthDate: z
    .string()
    .min(1, { message: "Birth date is required!" })
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
      message: "Invalid format. Use MM/YY",
    })
    .refine(
      (value) => {
        if (!value) return false;
        const [month, year] = value.split("/");
        const birthDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date(2024, 11); // December 2024
        return birthDate < today;
      },
      { message: "You must be at least 18 years old" }
    ),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const PaymentInfoSchema = z.object({
  cardNumber: z
    .string()
    .min(1, { message: "Card number is required!" })
    .refine(
      (val) => {
        const digitsOnly = val.replace(/\s/g, "");
        return /^\d{16}$/.test(digitsOnly);
      },
      { message: "Card number must be 16 digits" }
    ),
  cardHolder: z.string().min(1, { message: "Card holder is required!" }),
  expiryDate: z
    .string()
    .min(1, { message: "Expiry date is required!" })
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, {
      message: "Invalid format. Use MM/YY",
    })
    .refine(
      (value) => {
        if (!value) return false;
        const [month, year] = value.split("/");
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const today = new Date(2024, 11); // December 2024
        return expiry > today;
      },
      { message: "Card has expired" }
    ),
  cvv: z.coerce
    .number()
    .min(1, { message: "CVV is required!" })
    .max(999, { message: "CVV must be 3 digits" }),
  saveCard: z.boolean().optional(),
  switchValue: z.boolean().optional(),
});

export type PaymentInfo = z.infer<typeof PaymentInfoSchema>;

type CheckoutFormContext = {
  personalInfo: PersonalInfo | undefined;
  paymentInfo: PaymentInfo | undefined;
  setPersonalInfo: (info: PersonalInfo | undefined) => void;
  setPaymentInfo: (info: PaymentInfo | undefined) => void;
  onSubmit: () => void;
};

const CheckoutFormContext = createContext<CheckoutFormContext>({
  personalInfo: undefined,
  paymentInfo: undefined,
  setPersonalInfo: () => {},
  setPaymentInfo: () => {},
  onSubmit: () => {},
});

export default function CheckoutFormProvider({ children }: PropsWithChildren) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | undefined>();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | undefined>();

  const onSubmit = () => {
    // send it to the server

    if (!personalInfo || !paymentInfo) {
      console.log("The form is incomplete");
      return;
    }

    setPersonalInfo(undefined);
    setPaymentInfo(undefined);

    router.dismissAll();
    router.back();
  };

  return (
    <CheckoutFormContext.Provider
      value={{
        personalInfo,
        paymentInfo,
        setPersonalInfo,
        setPaymentInfo,
        onSubmit,
      }}
    >
      {children}
    </CheckoutFormContext.Provider>
  );
}

export const useCheckoutForm = () => useContext(CheckoutFormContext);
