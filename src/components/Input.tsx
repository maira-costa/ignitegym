import { ComponentProps } from "react";
import { Input as GluestackInput, InputField } from "@gluestack-ui/themed";

type Props = ComponentProps<typeof InputField> & {
  isReadOnly?: boolean;
}; // Necessário para acessar as propriedades do GluestackInput pelo componente customizado Input

export function Input({ isReadOnly = false, ...rest }: Props) {
  return (
    <GluestackInput
      h="$14"
      borderWidth="$0"
      borderRadius="$md"
      $focus={{
        borderWidth: 1,
        borderColor: "$green500",
      }}
      isReadOnly={isReadOnly}
      opacity={isReadOnly ? 0.3 : 1}
    >
      <InputField
        px="$4"
        bg="$gray700"
        color="$white"
        fontFamily="$body"
        placeholder="$gray300"
        {...rest}
      />
    </GluestackInput>
  );
}
