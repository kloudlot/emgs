import { Button, ButtonProps } from "@chakra-ui/react";


interface CustomButtonProps extends ButtonProps {
  text: string;
  onClick?: () => void;
}
const CustomButton = ({ text, onClick, ...props }: CustomButtonProps) => {
  return (
    <Button
      colorScheme="brand"
      height={"40px"}
      px={"12"}
      borderRadius={"full"}
      fontSize={"md"}
      fontWeight={"bold"}
      _hover={{
        bg: "brand.600",
        transform: "translateY(-2px)",
        boxShadow: "xl",
      }}
      transition={"all 0.3s"}
      onClick={onClick}
      {...props}
    >
      {text}
    </Button>
  );
};

CustomButton.displayName = "CustomButton";
export default CustomButton;
