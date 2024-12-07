import { StyleSheet, View } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "../../components/CustomButton";
import { router } from "expo-router";
import CustomTextInput from "../../components/CustomTextInput";
import KeyBoardAwareScrollView from "../../components/KeyBoardAwareScrollView";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import {
  PersonalInfo,
  PersonalInfoSchema,
  useCheckoutForm,
} from "../../contexts/CheckoutFormProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import RNPickerSelect from "react-native-picker-select";
import countries from "../../../assets/countries.json";
import CustomPicker from "../../components/CustomPicker";
import CustomDateTimePicker from "../../components/CustomDateTimePicker";

export default function PersonalDetailsForm() {
  const { personalInfo, setPersonalInfo } = useCheckoutForm();
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: personalInfo,
  });

  const onNext: SubmitHandler<PersonalInfo> = (data) => {
    // redirect Next
    setPersonalInfo(data);

    router.push("/checkout/payment");
  };

  return (
    <KeyBoardAwareScrollView>
      <FormProvider {...form}>
        {/* <Controller
          control={control}
          name="fullname"
          rules={{ required: "Name is required" }}
          render={({ field: { value, onChange, onBlur } }) => {
            return (
              <CustomTextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="FullName"
                placeholder="john"
              />
            );
          }}
        /> */}
        <CustomTextInput name="fullName" label="FullName" placeholder="john" />
        <CustomTextInput name="address" label="Address" placeholder="Address" />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <CustomTextInput
            name="city"
            label="City"
            placeholder="City"
            containerStyle={{ flex: 1 }}
          />
          <CustomTextInput
            name="postcode"
            label="Postal Code"
            placeholder="1234"
            containerStyle={{ flex: 1 }}
          />
        </View>
        <CustomPicker
          name="country"
          placeholder={{ label: "Select Country" }}
          items={countries.map((country) => ({
            label: country.name,
            value: country.code,
          }))}
        />
        <CustomTextInput
          name="phone"
          label="Phone Number"
          placeholder="123456789"
          inputMode="tel"
        />
        <CustomDateTimePicker name="dob" />
        <CustomButton
          onPress={form.handleSubmit(onNext)}
          title="Next"
          style={styles.button}
        />
      </FormProvider>
    </KeyBoardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "white", flexGrow: 1, padding: 10, gap: 10 },
  button: { marginTop: "auto", marginBottom: 25 },
  viewContainer: {
    marginTop: 4,
    marginBottom: 2,
  },
  inputIOS: {
    borderColor: "gainsboro",
    borderWidth: 1,
    width: "100%",
    padding: 10,
    borderRadius: 5,
  },
});
