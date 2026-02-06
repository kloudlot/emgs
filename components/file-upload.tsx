import { Button, Text } from "@chakra-ui/react";
import { CloudUpload } from "lucide-react";

interface FileUploadProps {
  handleSectionImageUpload: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  index: number;
}
const FileUpload = ({ handleSectionImageUpload, index }: FileUploadProps) => {
  return (
    <>
      <CloudUpload size={32} color="#A0AEC0" />
      <Text fontSize="12px" color="gray.500" mt={2}>
        Upload your media here
      </Text>
      <Text fontSize="11px" color="gray.400">
        jpeg,png
      </Text>
      <Button
        size="sm"
        mt={3}
        bg="#A70B1C"
        color="white"
        _hover={{ bg: "#8A0916" }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";
          input.onchange = (e: any) => handleSectionImageUpload(index, e);
          input.click();
        }}
      >
        Browse
      </Button>
    </>
  );
};

export default FileUpload;
