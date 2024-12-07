import { StyleSheet, Text, View, GestureResponderEvent } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import KeyBoardAwareScrollView from "../../components/KeyBoardAwareScrollView";
import CustomTextInput from "../../components/CustomTextInput";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  PaymentInfo,
  PaymentInfoSchema,
  useCheckoutForm,
} from "../../contexts/CheckoutFormProvider";
import CustomCheckbox from "../../components/CustomCheckbox";
import CustomSwitch from "../../components/CustomSwitch";

export default function PaymentDetailsForm() {
  const { paymentInfo, setPaymentInfo } = useCheckoutForm();
  const form = useForm<PaymentInfo>({
    resolver: zodResolver(PaymentInfoSchema),
    defaultValues: paymentInfo,
  });

  const submitHandler: SubmitHandler<PaymentInfo> = (data) => {
    // validate from
    // redirect Next
    setPaymentInfo(data);
    router.push("/checkout/confirm");
  };

  const onNext = (event: GestureResponderEvent) => {
    event.preventDefault();

    const formData = {
      cardNumber: form.getValues("cardNumber"),
      cardHolder: form.getValues("cardHolder"),
      expiryDate: form.getValues("expiryDate"),
      cvv: form.getValues("cvv"),
    };

    submitHandler(formData); // Call your submit handler with the form data
  };

  return (
    <KeyBoardAwareScrollView>
      <FormProvider {...form}>
        <View style={styles.formContainer}>
          <CustomTextInput
            name="cardNumber"
            label="Card Number"
            placeholder="1234 1234 1234 1234"
            containerStyle={styles.inputContainer}
            onChangeText={(text) => {
              // Format card number with spaces
              const formatted =
                text
                  .replace(/\s/g, "") // Remove existing spaces
                  .match(/.{1,4}/g)
                  ?.join(" ") || text; // Add space after every 4 digits
              form.setValue("cardNumber", formatted);
            }}
            maxLength={19} // 16 digits + 3 spaces
            keyboardType="numeric"
          />
          <CustomTextInput
            name="cardHolder"
            label="Card Holder"
            placeholder="John Doe"
            containerStyle={styles.inputContainer}
          />
          <View style={styles.rowContainer}>
            <CustomTextInput
              name="expiryDate"
              label="Expiry Date"
              placeholder="MM/YY"
              containerStyle={{ flex: 1 }}
            />
            <CustomTextInput
              name="cvv"
              label="CVV"
              placeholder="123"
              inputMode="numeric"
              containerStyle={{ flex: 1 }}
            />
          </View>
          <CustomCheckbox
            name="saveCard"
            label="Save card for future payments"
          />
          <CustomButton
            onPress={onNext}
            title="Continue"
            style={styles.button}
          />
          <CustomSwitch name="saveCard" label="Save card for future payments" />
        </View>
      </FormProvider>
    </KeyBoardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  formContainer: {
    gap: 16,
    padding: 16,
  },
  inputContainer: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
