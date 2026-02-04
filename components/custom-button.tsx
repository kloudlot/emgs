import { Button, ButtonProps } from "@chakra-ui/react";


interface CustomButtonProps extends ButtonProps {
  text: string;
  onClick: () => void;
}
const CustomButton = ({ text, onClick, ...props }: CustomButtonProps) => {
  return (
    <Button
      bg={"#B30E14"}
      color={"#ffffff"}
      height={"60px"}
      px={"12"}
      borderRadius={"full"}
      fontSize={"lg"}
      fontWeight={"bold"}
      _hover={{
        bg: "#930c10",
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
